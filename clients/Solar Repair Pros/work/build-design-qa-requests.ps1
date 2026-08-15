$ErrorActionPreference='Stop'
$outDir=$PSScriptRoot
$orange='#ed5e22'
$navy='#15325E'
$whiteLogo=@{id=6677;url='https://dev2.mynewwebsite.co.za/wp-content/uploads/2026/06/solar-repair-pros-logo-white-form-final.png';alt='Solar Repair Pros Dallas Fort Worth white logo';source='library';size='full'}
$emailLink=@{url='mailto:info@solarrepairdfw.com';is_external='';nofollow='';custom_attributes=''}
$phoneLink=@{url='tel:+18049282768';is_external='';nofollow='';custom_attributes=''}
$serviceUrls=@(
 'https://dev2.mynewwebsite.co.za/services/solar-panel-repairs-dallas-fort-worth/',
 'https://dev2.mynewwebsite.co.za/services/solar-panel-servicing-dallas-fort-worth/',
 'https://dev2.mynewwebsite.co.za/services/solar-battery-add-ons-dallas-fort-worth/',
 'https://dev2.mynewwebsite.co.za/services/electrical-panel-upgrades-dallas-fort-worth/',
 'https://dev2.mynewwebsite.co.za/services/ev-charger-installs-dallas-fort-worth/'
)
function Save-Request($name,$id,$post,$ops){
 $r=@{jsonrpc='2.0';id=$id;method='tools/call';params=@{name='elementor-mcp-batch-update';arguments=@{post_id=$post;operations=$ops}}}
 [IO.File]::WriteAllText((Join-Path $outDir $name),($r|ConvertTo-Json -Depth 30 -Compress),[Text.UTF8Encoding]::new($false))
}
function Op($id,$settings){@{element_id=$id;settings=$settings}}

$header=@(
 (Op '7cd3aa7' @{width=@{unit='px';size=145;sizes=@()};width_tablet=@{unit='px';size=135;sizes=@()};width_mobile=@{unit='px';size=115;sizes=@()}})
)
Save-Request 'design-qa-header-request.json' 520 2785 $header

$homeOps=@(
 (Op '243d0ce' @{editor='<p>Need Solar Help?</p>';typography_font_size=@{unit='px';size=24;sizes=@()};typography_font_size_mobile=@{unit='px';size=20;sizes=@()}}),
 (Op '03c3c21' @{image=$whiteLogo;width=@{unit='px';size=220;sizes=@()};width_tablet=@{unit='px';size=180;sizes=@()};width_mobile=@{unit='px';size=160;sizes=@()};link=@{url='';is_external='';nofollow='';custom_attributes=''}}),
 (Op 'c3f8626' @{text='Email Us';link=$emailLink}),
 (Op '25409cb' @{text='804-928-2768';link=$phoneLink}),
 (Op 'fc21e8d' @{text='Email Us';link=$emailLink}),
 (Op '3fcabc2' @{text='Email Us';link=$emailLink}),
 (Op 'dca6f61' @{text='804-928-2768';link=$phoneLink})
)
$buttonIds=@('628c228','ca08deb','651e4c3','eb092d5','02dd18c')
for($i=0;$i-lt5;$i++){$homeOps+=(Op $buttonIds[$i] @{text='View Service';link=@{url=$serviceUrls[$i];is_external='';nofollow='';custom_attributes=''}})}
$areaButtonIds=@('93ac44f','ea47b59','70458e2','61068aa','db116d2')
foreach($id in $areaButtonIds){$homeOps+=(Op $id @{link=@{url='https://dev2.mynewwebsite.co.za/service-areas/';is_external='';nofollow='';custom_attributes=''}})}
Save-Request 'design-qa-home-request.json' 521 2747 $homeOps

$services=@(
 (Op '243d0ce' @{editor='<p>Need Solar Help?</p>';typography_font_size=@{unit='px';size=24;sizes=@()};typography_font_size_mobile=@{unit='px';size=20;sizes=@()}}),
 (Op '03c3c21' @{image=$whiteLogo;width=@{unit='px';size=220;sizes=@()};width_tablet=@{unit='px';size=180;sizes=@()};width_mobile=@{unit='px';size=160;sizes=@()};link=@{url='';is_external='';nofollow='';custom_attributes=''}}),
 (Op 'da151b2' @{text='Email Us';link=$emailLink}),
 (Op 'c70d198' @{text='804-928-2768';link=$phoneLink}),
 (Op 'cf26d49' @{text='Email Us';link=$emailLink})
)
for($i=0;$i-lt5;$i++){$services+=(Op $buttonIds[$i] @{text='View Service';link=@{url=$serviceUrls[$i];is_external='';nofollow='';custom_attributes=''}})}
Save-Request 'design-qa-services-request.json' 522 6217 $services

$landscapes=@(
 @{id=6621;url='https://dev2.mynewwebsite.co.za/wp-content/uploads/2026/06/czNmcy1wcml2YXRlL3Jhd3BpeGVsX2ltYWdlcy93ZWJzaXRlX2NvbnRlbnQvbHIvZnJkYWxsYXNfc2t5bGluZV9jaXR5X3RleGFzLWltYWdlLWt5Y2hnMmM4LmpwZw.webp';alt='Dallas skyline in the Solar Repair Pros service area';source='library';size='full'},
 @{id=6681;url='https://dev2.mynewwebsite.co.za/wp-content/uploads/2026/06/solar-repair-pros-fort-worth-landscape-ai-01.png';alt='Fort Worth city landscape in the Solar Repair Pros service area';source='library';size='full'},
 @{id=6683;url='https://dev2.mynewwebsite.co.za/wp-content/uploads/2026/06/solar-repair-pros-plano-frisco-landscape-ai-01.png';alt='North Texas suburban landscape in the Solar Repair Pros service area';source='library';size='full'},
 @{id=6682;url='https://dev2.mynewwebsite.co.za/wp-content/uploads/2026/06/solar-repair-pros-grapevine-southlake-landscape-ai-01.png';alt='North Texas lakeside landscape in the Solar Repair Pros service area';source='library';size='full'}
)
$areas=@(
 (Op '243d0ce' @{editor='<p>Need Solar Help?</p>';typography_font_size=@{unit='px';size=24;sizes=@()};typography_font_size_mobile=@{unit='px';size=20;sizes=@()}}),
 (Op '03c3c21' @{image=$whiteLogo;width=@{unit='px';size=220;sizes=@()};width_tablet=@{unit='px';size=180;sizes=@()};width_mobile=@{unit='px';size=160;sizes=@()};link=@{url='';is_external='';nofollow='';custom_attributes=''}}),
 (Op '4dc1563' @{text='Email Us';link=$emailLink}),
 (Op '9061a5a' @{text='804-928-2768';link=$phoneLink}),
 (Op 'ce5bb16' @{text='804-928-2768';link=$phoneLink})
)
$areaImgIds=@('86bf2a1','74ed7e0','5513c73','f1c0467','b95eeec','1b0cc4d','c390abc','bd93093','f96dd8d','64e32fd','3b051b3','ef8d96f')
for($i=0;$i-lt12;$i++){$areas+=(Op $areaImgIds[$i] @{image=$landscapes[$i%4]})}
$areaCtaIds=@('a134343','97f2e3f','1d6fe76','5a78f19','5c6f0c3','da8b082','14e57ed','a46ed3f','0a764df','c784c77','6d55d63','ecc589b')
foreach($id in $areaCtaIds){$areas+=(Op $id @{link=@{url='#contact';is_external='';nofollow='';custom_attributes=''}})}
Save-Request 'design-qa-areas-request.json' 523 6414 $areas

$configs=@(
 @{key='repairs';post=6637;approach='REPAIR APPROACH';why='WHY DIAGNOSIS MATTERS';icons=@('fas fa-chart-line','fas fa-solar-panel','fas fa-exclamation-triangle','fas fa-plug');relatedTitles=@('Solar Panel Servicing','Solar Battery Add-ons','Electrical Panel Upgrades','EV Charger Installs');relatedUrls=@($serviceUrls[1],$serviceUrls[2],$serviceUrls[3],$serviceUrls[4]);image=$null},
 @{key='servicing';post=6638;approach='SERVICE APPROACH';why='WHY CHECKS HELP';icons=@('fas fa-chart-line','fas fa-solar-panel','fas fa-plug','fas fa-clipboard-list');relatedTitles=@('Solar Panel Repairs','Solar Battery Add-ons','Electrical Panel Upgrades','EV Charger Installs');relatedUrls=@($serviceUrls[0],$serviceUrls[2],$serviceUrls[3],$serviceUrls[4]);image=@{id=6679;url='https://dev2.mynewwebsite.co.za/wp-content/uploads/2026/06/solar-repair-pros-technician-tablet-dfw-ai-01.png';alt='Solar technician reviewing system data at a Dallas-Fort Worth home';source='library';size='full'}},
 @{key='battery';post=6639;approach='BATTERY PLANNING';why='WHY SIZING MATTERS';icons=@('fas fa-battery-full','fas fa-link','fas fa-map-marker-alt','fas fa-bolt');relatedTitles=@('Solar Panel Repairs','Solar Panel Servicing','Electrical Panel Upgrades','EV Charger Installs');relatedUrls=@($serviceUrls[0],$serviceUrls[1],$serviceUrls[3],$serviceUrls[4]);image=$null},
 @{key='panel';post=6640;approach='PANEL PLANNING';why='WHY PLANNING MATTERS';icons=@('fas fa-th-large','fas fa-tachometer-alt','fas fa-exclamation-triangle','fas fa-bolt');relatedTitles=@('Solar Panel Repairs','Solar Battery Add-ons','EV Charger Installs','Solar Panel Servicing');relatedUrls=@($serviceUrls[0],$serviceUrls[2],$serviceUrls[4],$serviceUrls[1]);image=@{id=6680;url='https://dev2.mynewwebsite.co.za/wp-content/uploads/2026/06/solar-repair-pros-battery-electrical-inspection-dfw-ai-01.png';alt='Electrical technician inspecting panel and battery equipment in Dallas-Fort Worth';source='library';size='full'}},
 @{key='ev';post=6641;approach='CHARGER PLANNING';why='WHY SIZING MATTERS';icons=@('fas fa-car','fas fa-bolt','fas fa-route','fas fa-home');relatedTitles=@('Electrical Panel Upgrades','Solar Battery Add-ons','Solar Panel Repairs','Solar Panel Servicing');relatedUrls=@($serviceUrls[3],$serviceUrls[2],$serviceUrls[0],$serviceUrls[1]);image=@{id=6679;url='https://dev2.mynewwebsite.co.za/wp-content/uploads/2026/06/solar-repair-pros-technician-tablet-dfw-ai-01.png';alt='Solar technician reviewing system data at a Dallas-Fort Worth home';source='library';size='full'}}
)
$mainIconIds=@('e34d257','f67904a','02101ed','b544e88')
$relatedIds=@('2903b22','5c5a1f9','0544b6e','37b7e38')
$iconByTitle=@{'Solar Panel Repairs'='fas fa-tools';'Solar Panel Servicing'='fas fa-solar-panel';'Solar Battery Add-ons'='fas fa-battery-full';'Electrical Panel Upgrades'='fas fa-bolt';'EV Charger Installs'='fas fa-charging-station'}
foreach($c in $configs){
 $ops=@(
  (Op '426151a' @{background_overlay_opacity=@{unit='px';size=0.72}}),
  (Op '39fc31d' @{editor='<p>Need Solar Help?</p>';typography_font_size=@{unit='px';size=24;sizes=@()};typography_font_size_mobile=@{unit='px';size=20;sizes=@()}}),
  (Op '151ce4e' @{image=$whiteLogo;width=@{unit='px';size=220;sizes=@()};width_tablet=@{unit='px';size=180;sizes=@()};width_mobile=@{unit='px';size=160;sizes=@()};link=@{url='';is_external='';nofollow='';custom_attributes=''}}),
  (Op '49baa99' @{title=$c.approach}),
  (Op '8b2d19f' @{title=$c.why}),
  (Op 'd23f129' @{title='RECENT WORK';typography_font_weight='700'}),
  (Op 'e9213de' @{title='GOOD TO KNOW';typography_font_weight='700'}),
  (Op '97224d4' @{custom_css='selector a, selector a:visited, selector a:hover, selector a:focus { color: #ed5e22 !important; }'})
 )
 for($i=0;$i-lt4;$i++){$ops+=(Op $mainIconIds[$i] @{selected_icon=@{value=$c.icons[$i];library='fa-solid'}})}
 for($i=0;$i-lt4;$i++){$ops+=(Op $relatedIds[$i] @{selected_icon=@{value=$iconByTitle[$c.relatedTitles[$i]];library='fa-solid'};link=@{url=$c.relatedUrls[$i];is_external='';nofollow='';custom_attributes=''};title_link=@{url=$c.relatedUrls[$i];is_external='';nofollow='';custom_attributes=''};link_to='custom'})}
 if($c.image){$ops+=(Op 'dc27b4e' @{image=$c.image})}
 Save-Request "design-qa-service-$($c.key)-request.json" (530+$c.post) $c.post $ops
}
