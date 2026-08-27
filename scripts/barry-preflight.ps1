param(
    [string]$ClientFolderName
)

$ErrorActionPreference = 'Stop'

$expectedRoot = [System.IO.Path]::GetFullPath('C:\Users\USER\Documents\Codex\Barry').TrimEnd('\')
$gitRootRaw = (& git rev-parse --show-toplevel 2>$null)
if ($LASTEXITCODE -ne 0 -or -not $gitRootRaw) {
    throw 'Barry preflight failed: the active directory is not inside the Barry Git repository.'
}

$actualRoot = [System.IO.Path]::GetFullPath(($gitRootRaw | Select-Object -First 1)).TrimEnd('\')
if (-not $actualRoot.Equals($expectedRoot, [System.StringComparison]::OrdinalIgnoreCase)) {
    throw "Barry preflight failed: expected project root '$expectedRoot' but found '$actualRoot'."
}

$requiredFiles = @(
    'AGENTS.md',
    'graphify-out\graph.json',
    'scripts\ensure-graphify-runtime.ps1',
    'scripts\invoke-graphify.ps1',
    'elementor\SOPs\always-read-elementor-rules.md',
    'elementor\SOPs\template-content-replacement-guardrails.md',
    'content\SOPs\local-service-seo-copywriting.md'
)

$missing = @($requiredFiles | Where-Object { -not (Test-Path -LiteralPath (Join-Path $actualRoot $_)) })
if ($missing.Count -gt 0) {
    throw "Barry preflight failed: missing required file(s): $($missing -join ', ')."
}

$agentsBytes = (Get-Item -LiteralPath (Join-Path $actualRoot 'AGENTS.md')).Length
$codexConfig = Join-Path $env:USERPROFILE '.codex\config.toml'
$instructionBudget = 32768
if (Test-Path -LiteralPath $codexConfig) {
    $budgetMatch = Select-String -LiteralPath $codexConfig -Pattern '^\s*project_doc_max_bytes\s*=\s*(\d+)\s*$' | Select-Object -First 1
    if ($budgetMatch) {
        $instructionBudget = [int64]$budgetMatch.Matches[0].Groups[1].Value
    }
}

if ($agentsBytes -gt $instructionBudget) {
    throw "Barry preflight failed: AGENTS.md is $agentsBytes bytes but the configured instruction budget is $instructionBudget bytes."
}

$clientFolder = $null
if ($ClientFolderName) {
    $clientFolder = Join-Path (Join-Path $actualRoot 'clients') $ClientFolderName
    if (-not (Test-Path -LiteralPath $clientFolder -PathType Container)) {
        throw "Barry preflight failed: client folder not found: '$clientFolder'."
    }
}

[pscustomobject]@{
    Status = 'PASS'
    BarryRoot = $actualRoot
    AgentsBytes = $agentsBytes
    InstructionBudgetBytes = $instructionBudget
    Graph = (Join-Path $actualRoot 'graphify-out\graph.json')
    ClientFolder = $clientFolder
}
