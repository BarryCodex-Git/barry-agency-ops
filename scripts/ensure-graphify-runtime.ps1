param(
    [string]$ProjectRoot = (Split-Path -Parent $PSScriptRoot)
)

$ErrorActionPreference = 'Stop'

$projectRootPath = [System.IO.Path]::GetFullPath($ProjectRoot)
$graphOutputPath = Join-Path $projectRootPath 'graphify-out'
$savedPythonPath = Join-Path $graphOutputPath '.graphify_python'

$pythonCandidates = [System.Collections.Generic.List[string]]::new()
if (Test-Path -LiteralPath $savedPythonPath) {
    $savedPython = (Get-Content -Raw -LiteralPath $savedPythonPath).Trim()
    if ($savedPython) { $pythonCandidates.Add($savedPython) }
}

$bundledPython = Join-Path $env:USERPROFILE '.cache\codex-runtimes\codex-primary-runtime\dependencies\python\python.exe'
$pythonCandidates.Add($bundledPython)

foreach ($commandName in @('python', 'python3')) {
    $command = Get-Command $commandName -ErrorAction SilentlyContinue
    if ($command -and $command.Source) { $pythonCandidates.Add($command.Source) }
}

$pythonPath = $null
foreach ($candidate in $pythonCandidates | Select-Object -Unique) {
    if (-not (Test-Path -LiteralPath $candidate)) { continue }
    & $candidate -c 'import graphify' 2>$null
    if ($LASTEXITCODE -eq 0) {
        $pythonPath = $candidate
        break
    }
}

if (-not $pythonPath) {
    throw 'Graphify is not importable from the saved, bundled, or system Python runtimes.'
}

$graphifyCandidates = [System.Collections.Generic.List[string]]::new()
$command = Get-Command graphify -ErrorAction SilentlyContinue
if ($command -and $command.Source) { $graphifyCandidates.Add($command.Source) }
$graphifyCandidates.Add((Join-Path $env:APPDATA 'Python\Python312\Scripts\graphify.exe'))
$graphifyCandidates.Add((Join-Path (Split-Path $pythonPath) 'Scripts\graphify.exe'))

$graphifyCommand = $graphifyCandidates |
    Select-Object -Unique |
    Where-Object { Test-Path -LiteralPath $_ } |
    Select-Object -First 1

if (-not $graphifyCommand) {
    throw 'Graphify imports successfully, but its command wrapper could not be located.'
}

New-Item -ItemType Directory -Force -Path $graphOutputPath | Out-Null
Set-Content -LiteralPath $savedPythonPath -Value $pythonPath -NoNewline
Set-Content -LiteralPath (Join-Path $graphOutputPath '.graphify_root') -Value '.' -NoNewline

[pscustomobject]@{
    ProjectRoot = $projectRootPath
    PythonPath = $pythonPath
    GraphifyCommand = $graphifyCommand
    GraphPath = (Join-Path $graphOutputPath 'graph.json')
}
