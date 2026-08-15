$ErrorActionPreference = 'Stop'

$barryRoot = 'C:\Users\USER\Documents\Codex\Barry'
$workRoot = Join-Path $barryRoot 'work'
$targetSecretPath = Join-Path $barryRoot 'secrets\my-new-website-elementor-mcp.json'

function Get-SiteAuth([string] $secretPath) {
    $secret = Get-Content -Raw -LiteralPath $secretPath | ConvertFrom-Json
    $securePassword = ConvertTo-SecureString $secret.application_password_dpapi
    $pointer = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($securePassword)
    try {
        $password = [Runtime.InteropServices.Marshal]::PtrToStringBSTR($pointer)
        $pair = [Convert]::ToBase64String([Text.Encoding]::UTF8.GetBytes("$($secret.username):$password"))
        return [pscustomobject]@{
            Endpoint = $secret.endpoint
            Domain = $secret.domain
            Username = $secret.username
            Authorization = "Basic $pair"
        }
    }
    finally {
        if ($pointer -ne [IntPtr]::Zero) {
            [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($pointer)
        }
    }
}

function Start-McpSession($site) {
    $body = @{
        jsonrpc = '2.0'
        id = 1
        method = 'initialize'
        params = @{
            protocolVersion = '2024-11-05'
            capabilities = @{}
            clientInfo = @{ name = 'Barry Codex'; version = '1.0' }
        }
    } | ConvertTo-Json -Depth 10 -Compress
    $headers = @{ Authorization = $site.Authorization; Accept = 'application/json, text/event-stream' }
    $response = Invoke-WebRequest -UseBasicParsing -Method Post -Uri $site.Endpoint -Headers $headers -ContentType 'application/json' -Body $body -TimeoutSec 45
    $session = [string]$response.Headers['Mcp-Session-Id']
    if (-not $session) { throw "MCP initialize did not return a session for $($site.Domain)." }
    return $session
}

function Invoke-McpTool($site, [string] $session, [int] $id, [string] $tool, $arguments, [int] $timeout = 180) {
    $body = @{
        jsonrpc = '2.0'
        id = $id
        method = 'tools/call'
        params = @{ name = $tool; arguments = $arguments }
    } | ConvertTo-Json -Depth 100 -Compress
    $headers = @{
        Authorization = $site.Authorization
        Accept = 'application/json, text/event-stream'
        'Mcp-Session-Id' = $session
    }
    $response = Invoke-RestMethod -Method Post -Uri $site.Endpoint -Headers $headers -ContentType 'application/json' -Body $body -TimeoutSec $timeout
    if ($response.error) { throw ($response.error | ConvertTo-Json -Depth 10) }
    if ($response.result.isError) { throw ($response.result.content | ConvertTo-Json -Depth 10) }
    if ($response.result.structuredContent) { return $response.result.structuredContent }
    if ($response.result.content[0].text) { return ($response.result.content[0].text | ConvertFrom-Json) }
    return $response.result
}

function Get-RestHeaders($site) {
    return @{ Authorization = $site.Authorization }
}

function Update-ElementSettings($nodes, [string] $elementId, $newSettings) {
    foreach ($node in @($nodes)) {
        if ([string]$node.id -eq $elementId) {
            foreach ($property in $newSettings.PSObject.Properties) {
                $node.settings | Add-Member -NotePropertyName $property.Name -NotePropertyValue $property.Value -Force
            }
            return $true
        }
        if ($node.elements -and (Update-ElementSettings $node.elements $elementId $newSettings)) {
            return $true
        }
    }
    return $false
}

$target = Get-SiteAuth $targetSecretPath
$targetSession = Start-McpSession $target

$existing = Invoke-RestMethod -Uri 'https://mynewwebsite.co.za/wp-json/wp/v2/pages?slug=about-us&context=edit' -Headers (Get-RestHeaders $target) -TimeoutSec 30
if (@($existing).Count -gt 0) {
    throw "A master page with slug about-us already exists (ID $($existing[0].id))."
}

$elements = Get-Content -Raw -LiteralPath (Join-Path $workRoot 'about-us-current-elementor.json') | ConvertFrom-Json
if (-not $elements -or @($elements).Count -lt 1) { throw 'Saved DEV1 About Us Elementor export was empty.' }

$correctionFiles = @(
    'about-us-hero-copy-fix.json',
    'about-us-section-one-fix.json',
    'about-us-section-two-fix.json',
    'about-us-process-copy-fix.json',
    'about-us-process-image-square-fix.json',
    'about-us-service-standards-unique-fix.json',
    'about-us-work-ethic-label-fix.json'
)
foreach ($correctionFile in $correctionFiles) {
    $correction = Get-Content -Raw -LiteralPath (Join-Path $workRoot $correctionFile) | ConvertFrom-Json
    foreach ($operation in $correction.operations) {
        if (-not (Update-ElementSettings $elements ([string]$operation.element_id) $operation.settings)) {
            throw "Saved correction target $($operation.element_id) was not found in the DEV1 export."
        }
    }
}

$assetRoot = Join-Path $barryRoot 'clients\H2O Plumbers\assets\AI Images\about-us'
$assets = @(
    @{ OldId = 6612; File = 'h2o-plumbers-about-us-garden-route-team-hero.webp'; Alt = 'H2O Plumbers Garden Route team with a branded service vehicle outside a local home' },
    @{ OldId = 6613; File = 'h2o-plumbers-about-local-plumbing-team-george.webp'; Alt = 'H2O Plumbers team member explaining a plumbing issue to a homeowner in George' },
    @{ OldId = 6614; File = 'h2o-plumbers-about-process-garden-route-background.webp'; Alt = 'H2O Plumbers team preparing drain and pipe equipment for Garden Route plumbing work' },
    @{ OldId = 6615; File = 'h2o-plumbers-qualified-plumbing-team-garden-route.webp'; Alt = 'H2O Plumbers qualified team loading organised plumbing tools for Garden Route service calls' },
    @{ OldId = 6622; File = 'h2o-plumbers-about-process-square-garden-route.webp'; Alt = 'H2O Plumbers team preparing practical plumbing equipment for a Garden Route service call' }
)

$serialized = $elements | ConvertTo-Json -Depth 100 -Compress
$mediaMap = @()
foreach ($asset in $assets) {
    $path = Join-Path $assetRoot $asset.File
    if (-not (Test-Path -LiteralPath $path)) { throw "Missing prepared image: $path" }
    $slug = [IO.Path]::GetFileNameWithoutExtension($asset.File)
    $found = Invoke-RestMethod -Uri "https://mynewwebsite.co.za/wp-json/wp/v2/media?slug=$slug&context=edit" -Headers (Get-RestHeaders $target) -TimeoutSec 30
    if (@($found).Count -gt 0) {
        $media = $found[0]
    }
    else {
        $uploadHeaders = Get-RestHeaders $target
        $uploadHeaders['Content-Disposition'] = "attachment; filename=`"$($asset.File)`""
        $media = Invoke-RestMethod -Method Post -Uri 'https://mynewwebsite.co.za/wp-json/wp/v2/media' -Headers $uploadHeaders -ContentType 'image/webp' -InFile $path -TimeoutSec 120
    }
    $updateBody = @{ alt_text = $asset.Alt } | ConvertTo-Json -Compress
    $media = Invoke-RestMethod -Method Post -Uri "https://mynewwebsite.co.za/wp-json/wp/v2/media/$($media.id)" -Headers (Get-RestHeaders $target) -ContentType 'application/json' -Body $updateBody -TimeoutSec 30
    $oldUrl = "https://dev1.mynewwebsite.co.za/wp-content/uploads/2026/07/$($asset.File)"
    $serialized = $serialized.Replace($oldUrl, [string]$media.source_url)
    $replacement = '${1}' + [string]$media.id
    $serialized = [regex]::Replace($serialized, '("id"\s*:\s*)' + $asset.OldId + '(?=\s*[,}])', $replacement)
    $mediaMap += [pscustomobject]@{ old_id = $asset.OldId; new_id = $media.id; file = $asset.File; url = $media.source_url }
}

$remappedElements = $serialized | ConvertFrom-Json
$created = Invoke-McpTool $target $targetSession 3 'elementor-mcp-create-page' @{ title = 'About Us'; status = 'publish'; post_type = 'page' } 120
$newPageId = [int]$created.post_id
if (-not $newPageId) { throw 'Master About Us page creation did not return a post ID.' }

try {
    $imported = Invoke-McpTool $target $targetSession 4 'elementor-mcp-import-template' @{ post_id = $newPageId; template_json = @($remappedElements); position = -1 } 300
    $pageBody = @{ slug = 'about-us'; status = 'publish' } | ConvertTo-Json -Compress
    $page = Invoke-RestMethod -Method Post -Uri "https://mynewwebsite.co.za/wp-json/wp/v2/pages/$newPageId" -Headers (Get-RestHeaders $target) -ContentType 'application/json' -Body $pageBody -TimeoutSec 60
    try {
        Invoke-RestMethod -Method Delete -Uri 'https://mynewwebsite.co.za/wp-json/elementor/v1/cache' -Headers (Get-RestHeaders $target) -TimeoutSec 60 | Out-Null
    }
    catch {
        Write-Host 'Elementor cache endpoint did not accept the clear request; public verification will trigger regeneration.'
    }
    $readback = Invoke-McpTool $target $targetSession 5 'elementor-mcp-export-page' @{ post_id = $newPageId } 180
    [pscustomobject]@{
        post_id = $newPageId
        slug = $page.slug
        status = $page.status
        link = $page.link
        source_top_level_elements = @($elements).Count
        imported_elements = $imported.elements_count
        target_top_level_elements = @($readback.json).Count
        media_items = $mediaMap.Count
    } | ConvertTo-Json -Depth 10
}
catch {
    try {
        Invoke-RestMethod -Method Delete -Uri "https://mynewwebsite.co.za/wp-json/wp/v2/pages/$newPageId?force=true" -Headers (Get-RestHeaders $target) -TimeoutSec 30 | Out-Null
    }
    catch {}
    throw
}
