param(
    [switch]$ApprovedPaidExtraction
)

$ErrorActionPreference = "Stop"

if (-not $ApprovedPaidExtraction) {
    throw "This Graphify build can use paid OpenAI API tokens. Re-run with -ApprovedPaidExtraction only after explicit user approval."
}

$graphify = Join-Path $env:APPDATA "Python\Python312\Scripts\graphify.exe"
if (-not (Test-Path $graphify)) {
    throw "Graphify executable not found at $graphify"
}

if (-not $env:OPENAI_API_KEY) {
    throw "OPENAI_API_KEY is not set. Run scripts\set-graphify-openai-key.ps1 first, or configure the key as a secure environment secret."
}

& $graphify extract . --backend openai --out .
& $graphify cluster-only .
& $graphify . --wiki

Write-Host "Barry Graphify graph built in graphify-out/."
