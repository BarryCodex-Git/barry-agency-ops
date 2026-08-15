$ErrorActionPreference='Stop'
$s=Get-Content -Raw 'C:\Users\USER\Documents\Codex\Barry\secrets\development-2-elementor-mcp.json'|ConvertFrom-Json
$sec=ConvertTo-SecureString $s.application_password_dpapi
$ptr=[IntPtr]::Zero
try {
 $ptr=[Runtime.InteropServices.Marshal]::SecureStringToBSTR($sec)
 $pw=[Runtime.InteropServices.Marshal]::PtrToStringBSTR($ptr)
 $pair=[Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes("$($s.username):$pw"))
 $headers=@{Authorization="Basic $pair"}
 $alts=@{
  6707='Solar battery and electrical equipment at a Dallas-Fort Worth property'
  6708='Dallas skyline representing the Solar Repair Pros service area'
  6709='Solar technician reviewing system information at a Dallas-Fort Worth home'
 }
 foreach($id in $alts.Keys){
  $body=@{alt_text=$alts[$id]}|ConvertTo-Json -Compress
  Invoke-RestMethod "https://dev2.mynewwebsite.co.za/wp-json/wp/v2/media/$id" -Method Post -Headers $headers -ContentType 'application/json' -Body $body|Out-Null
 }
 $url='https://dev2.mynewwebsite.co.za/wp-json/wp/v2/elementor_library/6434?context=edit'
 $page=Invoke-RestMethod $url -Headers $headers
 $data=$page.meta._elementor_data|ConvertFrom-Json
 function FindNode($nodes,$id){foreach($n in $nodes){if($n.id -eq $id){return $n};if($n.elements){$r=FindNode $n.elements $id;if($r){return $r}}}}
 $node=FindNode $data '75540a2'
 $node.widgetType='heading'
 $node.settings | Add-Member -NotePropertyName title -NotePropertyValue 'Solar Advice' -Force
 $json=$data|ConvertTo-Json -Depth 100 -Compress
 $body=@{meta=@{_elementor_data=$json}}|ConvertTo-Json -Depth 6
 Invoke-RestMethod $url -Method Post -Headers $headers -ContentType 'application/json' -Body ([Text.Encoding]::UTF8.GetBytes($body))|Out-Null
 try {Invoke-RestMethod 'https://dev2.mynewwebsite.co.za/wp-json/elementor/v1/cache' -Method Delete -Headers $headers|Out-Null}catch{}
 Write-Output 'UPDATED media alt text and archive heading'
}
finally {if($ptr -ne [IntPtr]::Zero){[Runtime.InteropServices.Marshal]::ZeroFreeBSTR($ptr)}}
