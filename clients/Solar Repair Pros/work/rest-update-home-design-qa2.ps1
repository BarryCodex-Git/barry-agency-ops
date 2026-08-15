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
 $url='https://dev2.mynewwebsite.co.za/wp-json/wp/v2/pages/2747?context=edit'
 $page=Invoke-RestMethod $url -Headers $headers
 $data=$page.meta._elementor_data|ConvertFrom-Json
 function FindNode($nodes,$id){foreach($n in $nodes){if($n.id -eq $id){return $n};if($n.elements){$r=FindNode $n.elements $id;if($r){return $r}}}}
 $section=FindNode $data 'aa69916'
 $section.settings.background_background='classic'
 $section.settings.background_color='#15325E'
 $section.settings.background_image=[pscustomobject]@{id=6679;url='https://dev2.mynewwebsite.co.za/wp-content/uploads/2026/06/solar-repair-pros-technician-tablet-dfw-ai-01.png';alt='Solar technician reviewing system data at a Dallas-Fort Worth home';source='library';size='full'}
 $section.settings.background_position='center center'
 $section.settings.background_repeat='no-repeat'
 $section.settings.background_size='cover'
 $section.settings.background_attachment='scroll'
 $section.settings.background_overlay_background='classic'
 $section.settings.background_overlay_color='#15325E'
 $section.settings.background_overlay_opacity=[pscustomobject]@{unit='px';size=0.82;sizes=@()}
 $section.settings.background_video_link=''
 (FindNode $data '8c6cd38').settings.typography_font_weight='700'
 (FindNode $data '780caa5').settings.ekit_heading_extra_title='<p>Customers receive clear explanations, practical options and careful checks before a repair or upgrade path is recommended.</p>'
 $local=FindNode $data '68b1cf1';$local.settings.description_text='Service planning is shaped around Dallas-Fort Worth homes and businesses, common system layouts and practical property access conditions.';$local.settings.selected_icon=[pscustomobject]@{value='fas fa-map-marker-alt';library='fa-solid'}
 $clear=FindNode $data '84bec0c';$clear.settings.description_text='Findings are explained in plain language, with realistic repair or upgrade paths and any remaining checks identified before work begins.';$clear.settings.selected_icon=[pscustomobject]@{value='fas fa-list-alt';library='fa-solid'}
 $checks=FindNode $data '7b4adf7';$checks.settings.description_text='Solar output, visible components, electrical capacity and equipment compatibility are reviewed before a recommendation is made.';$checks.settings.selected_icon=[pscustomobject]@{value='fas fa-search';library='fa-solid'}
 $elementorJson=$data|ConvertTo-Json -Depth 100 -Compress
 $body=@{meta=@{_elementor_data=$elementorJson}}|ConvertTo-Json -Depth 6
 $saved=Invoke-RestMethod $url -Method Post -Headers $headers -ContentType 'application/json' -Body ([Text.Encoding]::UTF8.GetBytes($body))
 Write-Output "UPDATED $($saved.id)"
}
finally {if($ptr -ne [IntPtr]::Zero){[Runtime.InteropServices.Marshal]::ZeroFreeBSTR($ptr)}}
