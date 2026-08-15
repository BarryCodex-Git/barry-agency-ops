param(
    [Parameter(Mandatory = $true)]
    [string] $RequestPathList,

    [Parameter(Mandatory = $true)]
    [string] $OutputPathList
)

$ErrorActionPreference = 'Stop'

$RequestPath = $RequestPathList -split '\|'
$OutputPath = $OutputPathList -split '\|'

if ($RequestPath.Count -ne $OutputPath.Count) {
    throw 'RequestPath and OutputPath must contain the same number of entries.'
}

$barryRoot = Split-Path -Parent $PSScriptRoot
$secretPath = Join-Path $barryRoot 'secrets\development-2-elementor-mcp.json'
$secret = Get-Content -Raw -LiteralPath $secretPath | ConvertFrom-Json
$securePassword = ConvertTo-SecureString $secret.application_password_dpapi
$passwordPointer = [Runtime.InteropServices.Marshal]::SecureStringToBSTR($securePassword)

try {
    $password = [Runtime.InteropServices.Marshal]::PtrToStringBSTR($passwordPointer)
    $endpoint = $secret.endpoint
    $username = $secret.username
    $initRequest = Join-Path $barryRoot 'work\mcp-initialize.json'
    $initHeaders = Join-Path $barryRoot 'work\dev2-mcp-session-headers.txt'
    $initResponse = Join-Path $barryRoot 'work\dev2-mcp-session-response.txt'

    & curl.exe -sS --max-time 45 -D $initHeaders -o $initResponse `
        -u "$username`:$password" `
        -H 'Accept: application/json, text/event-stream' `
        -H 'Content-Type: application/json' `
        --data-binary "@$initRequest" $endpoint

    if ($LASTEXITCODE -ne 0) {
        throw "MCP initialize transport failed with exit code $LASTEXITCODE."
    }

    $sessionHeader = Get-Content $initHeaders |
        Where-Object { $_ -match '(?i)^Mcp-Session-Id:' } |
        Select-Object -Last 1
    $sessionId = ([string]($sessionHeader -replace '(?i)^Mcp-Session-Id:\s*', '')).Trim()

    if (-not $sessionId) {
        throw "MCP initialize did not return a session ID. Response: $(Get-Content -Raw $initResponse)"
    }

    for ($i = 0; $i -lt $RequestPath.Count; $i++) {
        $request = (Resolve-Path -LiteralPath $RequestPath[$i]).Path
        $output = $ExecutionContext.SessionState.Path.GetUnresolvedProviderPathFromPSPath($OutputPath[$i])

        & curl.exe -sS --max-time 120 -o $output `
            -u "$username`:$password" `
            -H 'Accept: application/json, text/event-stream' `
            -H 'Content-Type: application/json' `
            -H "Mcp-Session-Id: $sessionId" `
            --data-binary "@$request" $endpoint

        if ($LASTEXITCODE -ne 0) {
            throw "MCP request failed with exit code $LASTEXITCODE for $request."
        }
    }
}
finally {
    if ($passwordPointer -ne [IntPtr]::Zero) {
        [Runtime.InteropServices.Marshal]::ZeroFreeBSTR($passwordPointer)
    }
}
