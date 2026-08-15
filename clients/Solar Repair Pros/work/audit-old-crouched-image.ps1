$ErrorActionPreference = 'Stop'
$work = 'C:\Users\USER\Documents\Codex\Barry\clients\Solar Repair Pros\work'
$pages = @(
  @{ id = 2747; name = 'home' },
  @{ id = 6217; name = 'services' },
  @{ id = 6414; name = 'service-areas' },
  @{ id = 6637; name = 'repairs' },
  @{ id = 6638; name = 'servicing' },
  @{ id = 6639; name = 'battery' },
  @{ id = 6640; name = 'panel' },
  @{ id = 6641; name = 'ev' }
)

$results = foreach ($p in $pages) {
  $argsPath = Join-Path $work "args-export-live-$($p.name).json"
  @{ post_id = $p.id } | ConvertTo-Json -Compress | Set-Content -LiteralPath $argsPath -Encoding UTF8
  $outPath = Join-Path $work "export-live-$($p.name)-postfix.json"
  powershell -NoProfile -ExecutionPolicy Bypass -File (Join-Path $work 'call-mcp-tool.ps1') elementor-mcp-export-page -ArgsPath $argsPath |
    Set-Content -LiteralPath $outPath -Encoding UTF8

  $txt = Get-Content -Raw -LiteralPath $outPath
  [pscustomobject]@{
    page = $p.name
    post_id = $p.id
    old_image_or_old_process_matches = ([regex]::Matches($txt, '6605|solar-panel-diagnostics-dfw-support-ai-01|Share The Issue|Diagnose The Cause|Repair And Verify|A Practical Path From Solar Problem')).Count
    export = $outPath
  }
}

$report = Join-Path $work 'old-crouched-image-audit-report.json'
$results | ConvertTo-Json -Depth 4 | Set-Content -LiteralPath $report -Encoding UTF8
$results | ConvertTo-Json -Compress
