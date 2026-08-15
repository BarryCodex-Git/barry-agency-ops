$ErrorActionPreference='Stop'
$root='C:\Users\USER\Documents\Codex\Barry'
$s=Get-Content -Raw (Join-Path $root 'secrets\development-2-elementor-mcp.json')|ConvertFrom-Json
$sec=ConvertTo-SecureString $s.application_password_dpapi
$ptr=[IntPtr]::Zero
try {
  $ptr=[Runtime.InteropServices.Marshal]::SecureStringToBSTR($sec)
  $pw=[Runtime.InteropServices.Marshal]::PtrToStringBSTR($ptr)
  $pair=[Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes("$($s.username):$pw"))
  $headers=@{Authorization="Basic $pair"}
  Invoke-RestMethod 'https://dev2.mynewwebsite.co.za/wp-json/wp/v2/categories/1' -Method Post -Headers $headers -ContentType 'application/json' -Body (@{name='Solar Advice';slug='solar-advice'}|ConvertTo-Json) | Out-Null
  $posts=@(
    @{id=6421;slug='solar-panel-maintenance-dallas-fort-worth';title='Solar Panel Maintenance: What Dallas-Fort Worth Owners Should Check';excerpt='A practical guide to monitoring changes, visible panel condition, debris, cable management and when a solar system deserves professional assessment.';media=6642;content=@'
<p>Solar panels are designed to work outdoors for years, but that does not mean every change in production points to the same cause. Weather, heat, seasonal shading, debris, monitoring gaps and electrical faults can all affect what a homeowner sees. A useful maintenance routine starts with observation and avoids unsafe rooftop or electrical work.</p>
<h2>Compare production in context</h2>
<p>Use the system monitoring app to look for repeatable patterns. Compare similar weather and seasons where possible instead of judging the system from one cloudy or unusually hot day. Note when a change began, whether it affects the whole array or only one section, and whether any alert appeared at the same time.</p>
<h2>Look safely from the ground</h2>
<p>Visible cracked glass, displaced frames, sagging cable runs, heavy debris or new shade from vegetation are worth recording. Clear photographs can help a technician prepare, but owners should not climb onto a roof or touch solar wiring to investigate. Solar equipment can remain electrically active even when other parts of the property are switched off.</p>
<h2>Cleaning is not the answer to every output change</h2>
<p>Dust and stubborn buildup can affect performance, but cleaning should suit the roof access, panel instructions and the type of contamination. Abrasive tools, unsuitable chemicals and walking near modules can create damage or safety risks. If the cause is uncertain, request a condition review before choosing a cleaning method.</p>
<h2>Prepare useful information for a service visit</h2>
<p>Gather recent production graphs, alert screenshots, inverter or monitoring model information and the approximate system age. Mention recent roofing work, storms, tree growth or electrical changes. This context helps separate maintenance needs from faults that require targeted testing or repair.</p>
<p>Solar Repair Pros provides solar panel servicing and fault-focused repair support across Dallas-Fort Worth. The goal is a clear next step based on the system history and the condition observed.</p>
'@},
    @{id=6420;slug='solar-panel-repair-warning-signs-dallas-fort-worth';title='Solar Panel Repair Warning Signs You Should Not Ignore';excerpt='Learn which production changes, alerts and visible conditions justify a closer solar assessment—and what information to gather before booking.';media=6604;content=@'
<p>A solar system can show warning signs before the cause is obvious. The most useful response is not to assume that one panel has failed, but to collect the pattern and arrange safe diagnosis when symptoms repeat or visible damage appears.</p>
<h2>A sudden or repeated production drop</h2>
<p>One low day may reflect clouds, heat or temporary shade. A clear change that continues under similar conditions deserves closer attention. Monitoring data that identifies a particular string, optimizer or section can help narrow the fault, although the result still depends on the system design.</p>
<h2>Recurring inverter or monitoring alerts</h2>
<p>Save the exact alert, date and time instead of repeatedly clearing it. Some alerts are temporary, while others point to connection, isolation, grid or equipment issues. The history gives a technician a better starting point than a general description that the system “stopped working.”</p>
<h2>Cracked glass or impact marks</h2>
<p>Visible damage after severe weather or nearby work should be assessed promptly. Do not touch the panel, wiring or mounting. A technician may need to review the affected module, nearby connectors and whether the monitoring shows a related change before recommending isolation or replacement.</p>
<h2>Loose or exposed cable management</h2>
<p>Cables that have dropped onto the roof, displaced clips and weathered connectors can create intermittent symptoms and long-term wear. Photograph the condition from a safe location and avoid trying to reconnect or secure live solar wiring yourself.</p>
<h2>What to send with a repair enquiry</h2>
<p>Share recent production graphs, alert screenshots, system age, equipment models and the date the symptom began. Mention storms, roof work, vegetation changes or other events around the same time. Better context supports a more targeted first assessment.</p>
<p>Solar Repair Pros helps Dallas-Fort Worth owners investigate panel damage, output changes and recurring system faults before a repair path is agreed.</p>
'@},
    @{id=6419;slug='planning-solar-battery-add-on-dallas-fort-worth';title='Planning a Solar Battery Add-on for an Existing Home System';excerpt='Five questions to answer before selecting solar storage: backup priorities, existing equipment, electrical capacity, installation location and future loads.';media=6643;content=@'
<p>Adding a battery to an existing solar system is not only a question of choosing a capacity. The battery must fit the owner’s backup goals, the existing inverter and monitoring equipment, the electrical panel and the available installation location.</p>
<h2>1. What do you want the battery to do?</h2>
<p>Backup during outages, increased use of daytime solar and time-of-use shifting are different objectives. List the circuits that matter and how long they should operate. Refrigeration, lighting and communications often lead to a different plan from whole-home backup or central air-conditioning expectations.</p>
<h2>2. Is the existing solar equipment compatible?</h2>
<p>Inverter type, system age, manufacturer guidance and warranties influence the integration method. Some systems support a direct storage option, while others need additional equipment or a different design. Compatibility should be checked before equipment is ordered.</p>
<h2>3. Can the electrical infrastructure support the plan?</h2>
<p>Panel space, service capacity, protective equipment and the proposed backed-up loads all matter. A future EV charger or electric appliance should also be mentioned so the battery project does not create avoidable constraints for the next upgrade.</p>
<h2>4. Where can the battery be installed?</h2>
<p>Temperature, ventilation, manufacturer clearances, weather exposure, impact protection and cable routing affect the location. A convenient garage wall is not automatically suitable, and the final position may change the installation scope.</p>
<h2>5. What information should you gather?</h2>
<p>Provide solar and inverter model details, monitoring screenshots, a recent electricity bill, a list of important backup loads and photographs of the electrical panel and possible battery locations taken without removing covers.</p>
<p>Solar Repair Pros helps Dallas-Fort Worth customers frame storage decisions around real loads and the existing system before the final equipment and installation path are selected.</p>
'@}
  )
  foreach($p in $posts){
    $safeTitle=$p.title -replace '[\u2018\u2019]',"'" -replace '[\u201C\u201D]','"' -replace '\u2014','-'
    $safeExcerpt=$p.excerpt -replace '[\u2018\u2019]',"'" -replace '[\u201C\u201D]','"' -replace '\u2014','-'
    $safeContent=$p.content -replace '[\u2018\u2019]',"'" -replace '[\u201C\u201D]','"' -replace '\u2014','-'
    $badApostrophe=([string][char]0x00E2)+([char]0x20AC)+([char]0x2122)
    $badOpenQuote=([string][char]0x00E2)+([char]0x20AC)+([char]0x0153)
    $badCloseQuote=([string][char]0x00E2)+([char]0x20AC)+([char]0x009D)
    $badDash=([string][char]0x00E2)+([char]0x20AC)+([char]0x201D)
    $safeExcerpt=$safeExcerpt.Replace($badApostrophe,"'").Replace($badOpenQuote,'"').Replace($badCloseQuote,'"').Replace($badDash,' - ')
    $safeContent=$safeContent.Replace($badApostrophe,"'").Replace($badOpenQuote,'"').Replace($badCloseQuote,'"').Replace($badDash,' - ')
    $body=@{title=$safeTitle;slug=$p.slug;content=$safeContent;excerpt=$safeExcerpt;featured_media=$p.media;categories=@(1);status='publish'}|ConvertTo-Json -Depth 8
    $r=Invoke-RestMethod "https://dev2.mynewwebsite.co.za/wp-json/wp/v2/posts/$($p.id)" -Method Post -Headers $headers -ContentType 'application/json' -Body ([Text.Encoding]::UTF8.GetBytes($body))
    Write-Output "$($p.id)`t$($r.link)"
  }
}
finally {if($ptr-ne[IntPtr]::Zero){[Runtime.InteropServices.Marshal]::ZeroFreeBSTR($ptr)}}
