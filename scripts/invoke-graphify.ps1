param(
    [Parameter(ValueFromRemainingArguments = $true)]
    [string[]]$GraphifyArguments
)

$ErrorActionPreference = 'Stop'
$runtime = & (Join-Path $PSScriptRoot 'ensure-graphify-runtime.ps1')
& $runtime.GraphifyCommand @GraphifyArguments
exit $LASTEXITCODE
