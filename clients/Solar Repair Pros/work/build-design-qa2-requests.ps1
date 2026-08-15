$ErrorActionPreference='Stop'
$outDir=$PSScriptRoot
function Op($id,$settings){@{element_id=$id;settings=$settings}}
function SaveReq($name,$rid,$post,$ops){$r=@{jsonrpc='2.0';id=$rid;method='tools/call';params=@{name='elementor-mcp-batch-update';arguments=@{post_id=$post;operations=$ops}}};[IO.File]::WriteAllText((Join-Path $outDir $name),($r|ConvertTo-Json -Depth 30 -Compress),[Text.UTF8Encoding]::new($false))}
$hero=@{id=6604;url='https://dev2.mynewwebsite.co.za/wp-content/uploads/2026/06/solar-repair-pros-solar-repair-dallas-fort-worth-hero-ai-01.webp';alt='Solar repair technician testing rooftop solar panel connections in Dallas-Fort Worth';source='library';size='full'}
$tabletBg=@{id=6679;url='https://dev2.mynewwebsite.co.za/wp-content/uploads/2026/06/solar-repair-pros-technician-tablet-dfw-ai-01.png';alt='Solar technician reviewing system data at a Dallas-Fort Worth home';source='library';size='full'}
$dallasSquare=@{id=6708;url='https://dev2.mynewwebsite.co.za/wp-content/uploads/2026/06/solar-repair-pros-dallas-coverage-square-1000.jpg';alt='Dallas skyline within the Solar Repair Pros service area';source='library';size='full'}
$tabletSquare=@{id=6709;url='https://dev2.mynewwebsite.co.za/wp-content/uploads/2026/06/solar-repair-pros-technician-tablet-square-1000.jpg';alt='Solar technician reviewing system data at a Dallas-Fort Worth home';source='library';size='full'}
$batterySquare=@{id=6707;url='https://dev2.mynewwebsite.co.za/wp-content/uploads/2026/06/solar-repair-pros-battery-electrical-square-1000.jpg';alt='Electrical technician inspecting panel and battery equipment in Dallas-Fort Worth';source='library';size='full'}
$phone=@{url='tel:+18049282768';is_external='';nofollow='';custom_attributes=''}

$homeOps=@(
 (Op 'aa69916' @{background_background='classic';background_color='#15325E';background_image=$tabletBg;background_position='center center';background_repeat='no-repeat';background_size='cover';background_attachment='scroll';background_overlay_background='classic';background_overlay_color='#15325E';background_overlay_opacity=@{unit='px';size=0.82;sizes=@()};background_video_link=''}),
 (Op '8c6cd38' @{title='SERVICE STANDARDS';typography_font_weight='700'}),
 (Op '780caa5' @{ekit_heading_extra_title='<p>Customers receive clear explanations, practical options and careful checks before a repair or upgrade path is recommended.</p>'}),
 (Op '68b1cf1' @{title_text='Local Focus';description_text='Service planning is shaped around Dallas-Fort Worth homes and businesses, common system layouts and practical property access conditions.';selected_icon=@{value='fas fa-map-marker-alt';library='fa-solid'}}),
 (Op '84bec0c' @{title_text='Clear Options';description_text='Findings are explained in plain language, with realistic repair or upgrade paths and any remaining checks identified before work begins.';selected_icon=@{value='fas fa-list-alt';library='fa-solid'}}),
 (Op '7b4adf7' @{title_text='Careful Checks';description_text='Solar output, visible components, electrical capacity and equipment compatibility are reviewed before a recommendation is made.';selected_icon=@{value='fas fa-search';library='fa-solid'}})
)
SaveReq 'design-qa2-home-request.json' 700 2747 $homeOps

$areas=@((Op '596a3e2' @{image=$dallasSquare;image_size='full';width=@{unit='%';size=100;sizes=@()}}))
SaveReq 'design-qa2-areas-request.json' 701 6414 $areas

$servicePosts=@(
 @{key='repairs';post=6637;image=$null},
 @{key='servicing';post=6638;image=$tabletSquare},
 @{key='battery';post=6639;image=$null},
 @{key='panel';post=6640;image=$batterySquare},
 @{key='ev';post=6641;image=$tabletSquare}
)
foreach($s in $servicePosts){$ops=@(
 (Op '8e00699' @{text='804-928-2768';link=$phone;__dynamic__=@{}}),
 (Op '1a3ce4c' @{text='804-928-2768';link=$phone;__dynamic__=@{}})
);if($s.image){$ops+=(Op 'dc27b4e' @{image=$s.image;image_size='full'})};SaveReq "design-qa2-service-$($s.key)-request.json" (710+$s.post) $s.post $ops}

$blog=@(
 (Op '982a57c' @{background_background='classic';background_color='#15325E';background_image=$hero;background_position='center center';background_repeat='no-repeat';background_size='cover';background_attachment='scroll';background_overlay_background='classic';background_overlay_color='#15325E';background_overlay_opacity=@{unit='px';size=0.72;sizes=@()};background_video_link=''}),
 (Op '3b3cb57' @{typography_font_weight='700'})
)
SaveReq 'design-qa2-blog-request.json' 720 6425 $blog
$single=@(
 (Op '1a1ebb2' @{background_background='classic';background_color='#15325E';background_image=$hero;background_position='center center';background_repeat='no-repeat';background_size='cover';background_attachment='scroll';background_overlay_background='classic';background_overlay_color='#15325E';background_overlay_opacity=@{unit='px';size=0.72;sizes=@()};background_video_link=''}),
 (Op '524e3ef' @{typography_font_weight='700'}),
 (Op 'feb456d' @{title='More Solar Advice'})
)
SaveReq 'design-qa2-single-request.json' 721 6432 $single
$archive=@(
 (Op '0d2ff2c' @{background_background='classic';background_color='#15325E';background_image=$hero;background_position='center center';background_repeat='no-repeat';background_size='cover';background_attachment='scroll';background_overlay_background='classic';background_overlay_color='#15325E';background_overlay_opacity=@{unit='px';size=0.72;sizes=@()};background_video_link=''}),
 (Op '75540a2' @{typography_font_weight='700'})
)
SaveReq 'design-qa2-archive-request.json' 722 6434 $archive
$header=@(
 (Op '1e33fb7' @{text='804-928-2768';link=$phone;__dynamic__=@{}}),
 (Op '8d2ccd4' @{text='CONTACT US';link=$phone;__dynamic__=@{}})
)
SaveReq 'design-qa2-header-request.json' 723 2785 $header
$footer=@((Op '806ea58' @{description_text='804-928-2768';link=$phone;title_link=$phone;link_to='custom';__dynamic__=@{}}))
SaveReq 'design-qa2-footer-request.json' 724 2805 $footer
$globalPhone=@((Op 'b0b52f3' @{text='804-928-2768';link=$phone;__dynamic__=@{}}))
SaveReq 'design-qa2-global-phone-request.json' 725 6587 $globalPhone
