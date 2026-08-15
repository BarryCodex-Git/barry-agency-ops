$ErrorActionPreference='Stop'
$root='C:\Users\USER\Documents\Codex\Barry'
$client=Join-Path $root 'clients\Solar Repair Pros'
$source='C:\Users\USER\.codex\generated_images\019ee140-5d6d-70a3-8efb-27d1cc811043\exec-9d29a2c9-9d94-4bbc-8af4-7eff912dd33a.png'
$dest=Join-Path $client 'assets\AI Images\solar-repair-pros-social-sharing-final.png'
Copy-Item -LiteralPath $source -Destination $dest -Force
$s=Get-Content -Raw (Join-Path $root 'secrets\development-2-elementor-mcp.json')|ConvertFrom-Json
$sec=ConvertTo-SecureString $s.application_password_dpapi
$ptr=[IntPtr]::Zero
try{
 $ptr=[Runtime.InteropServices.Marshal]::SecureStringToBSTR($sec)
 $pw=[Runtime.InteropServices.Marshal]::PtrToStringBSTR($ptr)
 $pair=[Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes("$($s.username):$pw"))
 $h=@{Authorization="Basic $pair"}
 Invoke-RestMethod 'https://dev2.mynewwebsite.co.za/wp-json/wp/v2/settings' -Method Post -Headers $h -ContentType 'application/json' -Body (@{timezone='America/Chicago'}|ConvertTo-Json -Compress)|Out-Null
 Invoke-RestMethod 'https://dev2.mynewwebsite.co.za/wp-json/wp/v2/users/6' -Method Post -Headers $h -ContentType 'application/json' -Body (@{name='Solar Repair Pros';description='Practical solar repair and connected electrical guidance for Dallas-Fort Worth property owners.'}|ConvertTo-Json -Compress)|Out-Null
 foreach($id in 21,18,17,2,19,16,20){try{Invoke-RestMethod "https://dev2.mynewwebsite.co.za/wp-json/wp/v2/categories/$id?force=true" -Method Delete -Headers $h|Out-Null}catch{}}
 $bytes=[IO.File]::ReadAllBytes($dest)
 $mh=@{Authorization="Basic $pair";'Content-Disposition'='attachment; filename="solar-repair-pros-social-sharing-final.png"'}
 $media=Invoke-RestMethod 'https://dev2.mynewwebsite.co.za/wp-json/wp/v2/media' -Method Post -Headers $mh -ContentType 'image/png' -Body $bytes
 $mb=@{title='Solar Repair Pros social sharing image';alt_text='Solar Repair Pros logo and Solar Repair in Dallas-Fort Worth';caption='Solar Repair Pros | Solar Repair in Dallas-Fort Worth'}|ConvertTo-Json -Compress
 Invoke-RestMethod "https://dev2.mynewwebsite.co.za/wp-json/wp/v2/media/$($media.id)" -Method Post -Headers $h -ContentType 'application/json' -Body $mb|Out-Null
 $siteRep=@{company_or_person='company';company_name='Solar Repair Pros';company_logo='https://dev2.mynewwebsite.co.za/wp-content/uploads/2026/06/Solar-Repair-Pros-Logo-small.png';company_logo_id=6602;description='Solar repair, panel servicing, battery add-ons, electrical panel upgrades and EV charger installs across Dallas-Fort Worth.'}|ConvertTo-Json -Compress
 Invoke-RestMethod 'https://dev2.mynewwebsite.co.za/wp-json/yoast/v1/configuration/site_representation' -Method Post -Headers $h -ContentType 'application/json' -Body $siteRep|Out-Null
 $social=@{facebook_site='';twitter_site='';other_social_urls=@()}|ConvertTo-Json -Compress
 Invoke-RestMethod 'https://dev2.mynewwebsite.co.za/wp-json/yoast/v1/configuration/social_profiles' -Method Post -Headers $h -ContentType 'application/json' -Body $social|Out-Null
 [pscustomobject]@{media_id=$media.id;media_url=$media.source_url;local_path=$dest}|ConvertTo-Json -Compress
}finally{if($ptr-ne[IntPtr]::Zero){[Runtime.InteropServices.Marshal]::ZeroFreeBSTR($ptr)}}
