param(
    [switch]$UserScope
)

$secret = Read-Host "Paste the OpenAI API key for Barry Graphify" -AsSecureString
$plain = [Runtime.InteropServices.Marshal]::PtrToStringAuto(
    [Runtime.InteropServices.Marshal]::SecureStringToBSTR($secret)
)

if ([string]::IsNullOrWhiteSpace($plain)) {
    Write-Error "No key entered. Nothing was changed."
    exit 1
}

if ($UserScope) {
    [Environment]::SetEnvironmentVariable("OPENAI_API_KEY", $plain, "User")
    Write-Host "OPENAI_API_KEY saved to the Windows user environment."
    Write-Host "Open a new terminal/session before running Graphify."
} else {
    $env:OPENAI_API_KEY = $plain
    Write-Host "OPENAI_API_KEY set for this PowerShell session only."
    Write-Host "Run Graphify from this same session."
}

