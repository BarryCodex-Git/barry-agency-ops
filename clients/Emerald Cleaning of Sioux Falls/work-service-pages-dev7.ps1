$ErrorActionPreference = 'Stop'

$base = 'https://dev7.mynewwebsite.co.za'
$user = 'barry'
$pass = 'zfLc i3Fn yZqq IsJU pICd ZAr1'
$auth = 'Basic ' + [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes(('{0}:{1}' -f $user, $pass)))
$headers = @{ Authorization = $auth; 'Content-Type' = 'application/json' }
$parentId = 6217

$media = Get-Content -LiteralPath 'C:\Users\USER\Documents\Codex\Barry\clients\Emerald Cleaning of Sioux Falls\assets\AI Images\uploaded-dev7.json' | ConvertFrom-Json
function M($pattern) { $media | Where-Object { $_.name -like $pattern } | Select-Object -First 1 }
$img = @{
  hero = M '*hero-cleaning-team*'
  deep = M '*deep-clean*'
  movein = M '*move-in-clean*'
  moveout = M '*move-out-clean*'
  office = M '*office-cleaning*'
  standard = M '*standard-cleaning*'
  post = M '*post-construction*'
  housekeeping = M '*housekeeping*'
  janitorial = M '*janitorial*'
}

function Find-Node($nodes, $id) {
  foreach ($n in $nodes) {
    if ($n.id -eq $id) { return $n }
    if ($n.elements) { $r = Find-Node $n.elements $id; if ($r) { return $r } }
  }
}
function H($data, $id, $text) { $n = Find-Node $data $id; if ($n) { $n.settings.title = $text } }
function E($data, $id, $html) { $n = Find-Node $data $id; if ($n) { $n.settings.editor = $html } }
function B($data, $id, $text, $url) {
  $n = Find-Node $data $id
  if (-not $n) { return }
  if ($n.settings.PSObject.Properties.Name -contains 'text') { $n.settings.text = $text }
  if ($n.settings.PSObject.Properties.Name -contains 'link') {
    if (-not $n.settings.link) { $n.settings | Add-Member -NotePropertyName 'link' -NotePropertyValue ([pscustomobject]@{}) -Force }
    $n.settings.link.url = $url; $n.settings.link.is_external = ''; $n.settings.link.nofollow = ''; $n.settings.link.custom_attributes = ''
  }
}
function Img($data, $id, $m) { $n = Find-Node $data $id; if ($n -and $m) { $n.settings.image = [pscustomobject]@{ id = [int]$m.id; url = $m.url } } }
function Box($data, $id, $title, $desc, $url = $null) {
  $n = Find-Node $data $id
  if (-not $n) { return }
  $n.settings.title_text = $title
  $n.settings.description_text = $desc
  if ($url) { $n.settings | Add-Member -NotePropertyName 'link' -NotePropertyValue ([pscustomobject]@{ url = $url; is_external = ''; nofollow = ''; custom_attributes = '' }) -Force }
}
function List($data, $id, $items) {
  $n = Find-Node $data $id
  if (-not $n -or -not ($n.settings.PSObject.Properties.Name -contains 'icon_list')) { return }
  $new = @()
  for ($i = 0; $i -lt $items.Count; $i++) {
    $old = $null; if ($n.settings.icon_list.Count -gt $i) { $old = $n.settings.icon_list[$i] }
    $new += [pscustomobject]@{ text = $items[$i]; _id = if ($old -and $old._id) { $old._id } else { "item$i" } }
  }
  $n.settings.icon_list = $new
}
function Faq($data, $questions) {
  $n = Find-Node $data '9b703bb'
  if ($n -and ($n.settings.PSObject.Properties.Name -contains 'items')) {
    for ($i = 0; $i -lt [Math]::Min($n.settings.items.Count, $questions.Count); $i++) { $n.settings.items[$i].item_title = $questions[$i] }
  }
}
function P($text) { '<p>' + [System.Web.HttpUtility]::HtmlEncode($text) + '</p>' }
function Card($title, $text) { '<h3>' + [System.Web.HttpUtility]::HtmlEncode($title) + '</h3><p>' + [System.Web.HttpUtility]::HtmlEncode($text) + '</p>' }

$serviceUrls = @{
  deep = '/services/deep-clean-sioux-falls/'
  movein = '/services/move-in-clean-sioux-falls/'
  moveout = '/services/move-out-clean-sioux-falls/'
  office = '/services/office-cleaning-sioux-falls/'
  standard = '/services/standard-cleaning-sioux-falls/'
  post = '/services/post-construction-cleaning-sioux-falls/'
  housekeeping = '/services/general-housekeeping-sioux-falls/'
  janitorial = '/services/janitorial-services-sioux-falls/'
}
function Rel($key, $title, $desc) { [pscustomobject]@{ url = $serviceUrls[$key]; title = $title; desc = $desc } }

$services = @(
  [pscustomobject]@{ key='deep'; slug='deep-clean-sioux-falls'; title='Deep Clean'; h1='Deep Cleaning in Sioux Falls'; image=$img.deep; intro='When a space needs more than regular upkeep, deep cleaning helps reset the rooms people use every day. Emerald Cleaning of Sioux Falls focuses on buildup, high-touch areas, floors, kitchens, bathrooms, corners, and surfaces that need extra attention.'; problemH='When a Deep Clean Makes Sense'; problems=@(@('Built-Up Dust','Dust gathers on baseboards, vents, shelves, light fixtures, and edges that regular cleaning may miss.'),@('Kitchen Buildup','Grease, crumbs, cabinet fronts, appliance areas, and sink zones often need a more focused clean.'),@('Bathroom Detail','Showers, tubs, toilets, vanities, mirrors, and floor edges can need deeper attention.'),@('Reset Before Routine','A deep clean can make future standard cleaning easier and more consistent.')); approach=@('Review the rooms, priority areas, timing, and any surfaces needing careful handling.','Work through high-touch areas, visible buildup, floors, kitchens, bathrooms, and overlooked edges.','Use a practical cleaning order so finished areas are not tracked through again.','Discuss anything that needs special products, access, or a different service scope.'); trust=@('Deep cleaning is planned around the actual condition of the space.','The work focuses on useful detail, not vague promises about perfection.','Kitchens, bathrooms, floors, and dust-prone areas receive clear attention.','If a surface needs special care, expectations can be discussed before cleaning.'); examples=@(@('Kitchen Reset','A deep clean is often useful when cabinet fronts, counters, appliance edges, and sink areas need more than a quick wipe.'),@('Bathroom Refresh','Soap residue, mirrors, floors, and fixture areas can make a bathroom feel tired even when it is used carefully.'),@('Dusty Living Areas','Baseboards, vents, shelves, and corners can collect dust that stands out once sunlight hits the room.'),@('Before Regular Service','Many customers start with a deep clean so future standard cleaning visits have a cleaner baseline.')); related=@((Rel 'standard' 'Standard Cleaning' 'Ongoing cleaning after a deeper reset.'),(Rel 'movein' 'Move-In Clean' 'Cleaning before furniture and boxes arrive.'),(Rel 'moveout' 'Move-Out Clean' 'Cleaning before a walkthrough or handover.'),(Rel 'housekeeping' 'General Housekeeping' 'Practical support for routine home upkeep.')); faq=@('What is included in a deep clean?','Is deep cleaning the same as standard cleaning?','Can I choose the rooms that need the most work?','Do you clean kitchens and bathrooms in detail?','When should I book a deep clean?') },
  [pscustomobject]@{ key='movein'; slug='move-in-clean-sioux-falls'; title='Move-In Clean'; h1='Move-In Cleaning in Sioux Falls'; image=$img.movein; intro='Moving into a new home or apartment is easier when the space feels clean before boxes arrive. Emerald Cleaning helps prepare kitchens, bathrooms, floors, closets, and common areas so you can settle in with less leftover mess from the previous occupant.'; problemH='Before You Bring the Boxes In'; problems=@(@('Unknown History','Cabinets, drawers, appliances, and bathrooms may need attention before you start unpacking.'),@('Empty Rooms','An empty space makes it easier to clean floors, baseboards, shelves, and corners properly.'),@('Tight Timing','Move-in dates can move quickly, so cleaning needs to fit around keys, movers, and access.'),@('First Impression','A cleaner start helps the home feel more comfortable on the first day.')); approach=@('Confirm access, timing, room count, and the areas that matter most before move-in.','Clean empty-room surfaces such as floors, shelves, counters, cabinets, closets, and bathrooms.','Pay attention to kitchen and bathroom areas that affect comfort right away.','Leave the space ready for furniture, boxes, and everyday use.'); trust=@('Move-in cleaning is planned around access and timing.','Empty rooms allow more practical attention to floors, edges, cabinets, and closets.','The work focuses on areas you will touch and use immediately.','Any unusual condition can be discussed before expectations are set.'); examples=@(@('Before Furniture Arrives','Floors, corners, shelves, and closets are easier to clean before beds, boxes, and furniture fill the rooms.'),@('Kitchen Check-In','Cabinets, counters, sinks, and appliance areas often need attention before food and dishes are unpacked.'),@('Bathroom Start Fresh','A move-in bathroom clean helps the space feel ready before daily routines begin.'),@('Apartment Handover','Apartments and rentals can benefit from a focused clean between access, lease start, and move-in day.')); related=@((Rel 'moveout' 'Move-Out Clean' 'Cleaning when leaving a property.'),(Rel 'deep' 'Deep Clean' 'A stronger reset for spaces with visible buildup.'),(Rel 'standard' 'Standard Cleaning' 'Routine cleaning after the move is complete.'),(Rel 'housekeeping' 'General Housekeeping' 'Home upkeep once you are settled.')); faq=@('Should move-in cleaning happen before furniture arrives?','Can you clean cabinets and closets?','Do you help with apartments and rentals?','What if the previous occupant left the space dusty?','How do I prepare for a move-in clean?') },
  [pscustomobject]@{ key='moveout'; slug='move-out-clean-sioux-falls'; title='Move-Out Clean'; h1='Move-Out Cleaning in Sioux Falls'; image=$img.moveout; intro='Move-out cleaning helps close the gap between packing up and handing over the property. Emerald Cleaning can help with the rooms, surfaces, floors, bathrooms, and kitchen areas that often matter during final walkthroughs.'; problemH='Cleaning Before the Final Walkthrough'; problems=@(@('Empty But Dusty','Once furniture is gone, dust, marks, and debris become much easier to see.'),@('Kitchen Details','Counters, sinks, cabinet fronts, and appliance areas often need focused cleaning after packing.'),@('Bathroom Use','Bathrooms need careful cleaning before a landlord, buyer, or next occupant sees the space.'),@('Deadline Pressure','Move-out cleaning often has to fit around keys, movers, and inspection timing.')); approach=@('Review the move-out deadline, access, rooms, and priority areas.','Focus on visible surfaces, floors, kitchens, bathrooms, closets, and high-touch spots.','Work around the empty-space condition so final details are easier to reach.','Flag any issue that looks outside normal cleaning scope.'); trust=@('The cleaning plan is shaped around the handover deadline.','Empty rooms are handled with attention to floors, edges, and visible surfaces.','Kitchen and bathroom areas are treated as high-priority spaces.','The goal is a cleaner handover, not invented deposit guarantees.'); examples=@(@('After Packing','Once boxes are gone, baseboards, floors, shelves, and wall-adjacent dust often become visible.'),@('Kitchen Exit Clean','Move-out kitchens often need counters, sinks, cabinet fronts, and appliance-area attention.'),@('Bathroom Handover','Bathrooms can stand out during walkthroughs, especially mirrors, fixtures, floors, and vanities.'),@('Rental Turnover','A clean empty unit helps the next step move forward, whether that is photos, showing, or handover.')); related=@((Rel 'movein' 'Move-In Clean' 'Cleaning before settling into a new space.'),(Rel 'deep' 'Deep Clean' 'Extra attention where buildup is obvious.'),(Rel 'post' 'Post Construction Cleaning' 'Dust cleanup after work on the property.'),(Rel 'standard' 'Standard Cleaning' 'Routine cleaning for occupied homes.')); faq=@('What areas matter most for move-out cleaning?','Can you clean after the furniture is removed?','Do you guarantee a deposit return?','Can move-out cleaning include appliances?','How far ahead should I book?') },
  [pscustomobject]@{ key='office'; slug='office-cleaning-sioux-falls'; title='Office Cleaning'; h1='Office Cleaning in Sioux Falls'; image=$img.office; intro='A workplace feels better when desks, shared spaces, restrooms, floors, and entry areas stay under control. Emerald Cleaning helps Sioux Falls offices plan practical cleaning around staff, visitors, and the way the space is used.'; problemH='When Office Cleaning Starts to Show'; problems=@(@('Shared Areas','Break rooms, restrooms, entries, and conference areas can get messy quickly.'),@('Daily Traffic','Floors, doors, desks, and touch points show regular staff and visitor use.'),@('Client Visits','A cleaner office supports a better first impression without distracting from the workday.'),@('Inconsistent Upkeep','Small cleaning tasks can fall behind when no one owns the routine.')); approach=@('Discuss the office layout, timing, access, and cleaning frequency that makes sense.','Prioritise restrooms, break rooms, entry areas, floors, surfaces, and high-touch spots.','Work around staff use where possible so cleaning supports the workday.','Adjust the cleaning list when the space or schedule changes.'); trust=@('Office cleaning is planned around staff, visitors, and shared spaces.','High-touch and shared-use areas receive practical attention.','Cleaning expectations stay clear so the routine is easier to manage.','No fake commercial credentials are claimed without verified details.'); examples=@(@('Break Room Care','Counters, sinks, tables, appliance areas, and floors can make a big difference to staff comfort.'),@('Restroom Upkeep','Office restrooms need regular attention because they influence both staff and visitor impressions.'),@('Entry and Lobby Areas','Doors, floors, glass, and waiting areas are often the first things visitors notice.'),@('Desk and Common Surfaces','Dust and high-touch areas can build up around workstations, meeting rooms, and shared equipment.')); related=@((Rel 'janitorial' 'Janitorial Services' 'Recurring support for workplaces and facilities.'),(Rel 'standard' 'Standard Cleaning' 'Routine cleaning for smaller spaces.'),(Rel 'deep' 'Deep Clean' 'A stronger reset when the office has fallen behind.'),(Rel 'post' 'Post Construction Cleaning' 'Cleaning after office remodeling or build-outs.')); faq=@('What office areas can be cleaned?','Can cleaning happen outside normal work hours?','Do you clean break rooms and restrooms?','Can you support small offices?','How do I request recurring office cleaning?') },
  [pscustomobject]@{ key='standard'; slug='standard-cleaning-sioux-falls'; title='Standard Cleaning'; h1='Standard Cleaning in Sioux Falls'; image=$img.standard; intro='Regular cleaning keeps everyday mess from turning into a bigger job. Emerald Cleaning helps with routine home and small-space cleaning tasks such as floors, surfaces, bathrooms, kitchens, dusting, and general upkeep.'; problemH='When Regular Cleaning Falls Behind'; problems=@(@('Busy Weeks','Normal dust, dishes, floors, and surfaces can pile up when schedules get full.'),@('High-Touch Areas','Counters, handles, tables, bathrooms, and kitchens need regular attention.'),@('Floor Care','Foot traffic, crumbs, dust, and tracked-in dirt can make rooms feel untidy quickly.'),@('Recurring Upkeep','A steady routine helps the space stay easier to manage between deeper cleans.')); approach=@('Confirm the rooms, timing, access, and recurring cleaning priorities.','Clean practical everyday areas such as surfaces, floors, bathrooms, kitchens, and dust-prone spots.','Keep the visit focused on the tasks that make the biggest daily difference.','Recommend deep cleaning when buildup needs more than a standard visit.'); trust=@('Standard cleaning is built around routine upkeep, not inflated promises.','The cleaning list can focus on the rooms and tasks that matter most.','Kitchens, bathrooms, floors, and surfaces stay central to the plan.','If deeper work is needed, that can be discussed separately.'); examples=@(@('Weekly Home Upkeep','Surfaces, floors, bathrooms, and kitchens often need steady attention to keep the home comfortable.'),@('Apartment Cleaning','Smaller spaces still need consistent dusting, floor care, bathroom cleaning, and kitchen upkeep.'),@('Between Deep Cleans','Standard cleaning helps maintain the result after a deep clean has reset the space.'),@('Busy Household Support','Regular cleaning can reduce the pressure when work, school, and life leave less time for upkeep.')); related=@((Rel 'deep' 'Deep Clean' 'Extra detail when buildup needs a reset.'),(Rel 'housekeeping' 'General Housekeeping' 'Practical help with regular home upkeep.'),(Rel 'movein' 'Move-In Clean' 'Cleaning before settling into a property.'),(Rel 'moveout' 'Move-Out Clean' 'Cleaning before leaving a property.')); faq=@('What is included in standard cleaning?','How is standard cleaning different from deep cleaning?','Can I choose priority rooms?','Can standard cleaning be recurring?','What should I do before the cleaner arrives?') },
  [pscustomobject]@{ key='post'; slug='post-construction-cleaning-sioux-falls'; title='Post Construction Cleaning'; h1='Post-Construction Cleaning in Sioux Falls'; image=$img.post; intro='Construction and remodeling work can leave fine dust long after the tools are gone. Emerald Cleaning helps with post-construction cleaning for finished spaces that need counters, floors, fixtures, trim, cabinets, and surfaces cleaned before use.'; problemH='After the Work Crew Leaves'; problems=@(@('Fine Dust','Construction dust settles on counters, floors, trim, vents, cabinets, and fixtures.'),@('New Surface Care','Freshly finished spaces need careful cleaning around new materials and edges.'),@('Move-In Timing','Cleaning may need to happen before furniture, staff, tenants, or customers arrive.'),@('Leftover Debris','Light non-hazardous debris and dust can delay the final handover.')); approach=@('Review the project condition, access, surfaces, dust level, and timing.','Focus on visible dust, counters, fixtures, floors, cabinets, trim, and cleaned pathways.','Work carefully around new finishes and areas that may still be settling.','Discuss any heavy debris, hazardous material, or specialist cleanup before scheduling.'); trust=@('Post-construction cleaning is planned around dust, surfaces, and handover timing.','New finishes and fixtures are treated with practical care.','The work focuses on cleaning-ready spaces, not active construction zones.','Anything outside normal cleaning scope is discussed before work starts.'); examples=@(@('Remodel Dust Cleanup','Fine dust can settle on counters, cabinets, fixtures, and floor edges after remodeling.'),@('New Space Preparation','A finished space often needs cleaning before furniture, staff, tenants, or clients arrive.'),@('Trim and Surface Detail','Baseboards, windowsills, door frames, and cabinet faces can hold dust after work is complete.'),@('Final Presentation','Post-construction cleaning helps the finished work feel usable, not just technically complete.')); related=@((Rel 'deep' 'Deep Clean' 'A full-space reset after dust and buildup.'),(Rel 'office' 'Office Cleaning' 'Cleaning after office improvements or build-outs.'),(Rel 'movein' 'Move-In Clean' 'Cleaning before occupying a newly updated space.'),(Rel 'standard' 'Standard Cleaning' 'Ongoing upkeep after the construction clean.')); faq=@('What is post-construction cleaning?','Can you clean fine construction dust?','Do you remove heavy construction debris?','Should cleaning happen before furniture arrives?','Can you clean after a remodel?') },
  [pscustomobject]@{ key='housekeeping'; slug='general-housekeeping-sioux-falls'; title='General Housekeeping'; h1='General Housekeeping in Sioux Falls'; image=$img.housekeeping; intro='General housekeeping helps keep everyday home tasks from piling up. Emerald Cleaning can support practical upkeep around living areas, kitchens, bathrooms, floors, dusting, and the regular details that make a home easier to use.'; problemH='When Housekeeping Help Is Useful'; problems=@(@('Everyday Clutter','Busy routines can leave surfaces, rooms, and floors needing regular attention.'),@('Kitchen Use','Counters, sinks, tables, and appliance areas often need steady upkeep.'),@('Bathroom Routines','Bathrooms feel better when mirrors, vanities, toilets, tubs, showers, and floors are maintained.'),@('Home Rhythm','Housekeeping support can make the week feel more manageable.')); approach=@('Discuss the rooms, routine tasks, and areas that need the most help.','Focus on practical home upkeep such as dusting, surfaces, floors, kitchens, and bathrooms.','Keep the cleaning plan realistic for the time and space available.','Separate normal housekeeping from deeper cleaning when needed.'); trust=@('Housekeeping work is shaped around everyday home use.','The cleaning list can focus on the spaces that affect daily comfort.','Clear expectations help avoid confusion about what is included.','Deep-cleaning needs can be discussed separately when normal upkeep is not enough.'); examples=@(@('Kitchen Upkeep','Counters, sinks, tables, and high-use kitchen areas can need steady attention during a busy week.'),@('Living Area Care','Dusting, floors, and surface cleaning help shared rooms feel more comfortable.'),@('Bathroom Maintenance','Regular bathroom cleaning keeps mirrors, vanities, toilets, showers, tubs, and floors easier to manage.'),@('Routine Home Support','Housekeeping can help when work, family, and errands leave less time for cleaning.')); related=@((Rel 'standard' 'Standard Cleaning' 'Routine cleaning for homes and apartments.'),(Rel 'deep' 'Deep Clean' 'A stronger reset for buildup and detail work.'),(Rel 'movein' 'Move-In Clean' 'Cleaning before settling into a home.'),(Rel 'moveout' 'Move-Out Clean' 'Cleaning before handing over a property.')); faq=@('What is general housekeeping?','Can housekeeping include kitchens and bathrooms?','Is housekeeping the same as deep cleaning?','Can I choose the areas that matter most?','Do you help apartments and homes?') },
  [pscustomobject]@{ key='janitorial'; slug='janitorial-services-sioux-falls'; title='Janitorial Services'; h1='Janitorial Services in Sioux Falls'; image=$img.janitorial; intro='Janitorial work keeps shared facilities cleaner, more usable, and easier to manage. Emerald Cleaning helps Sioux Falls workplaces think through restrooms, floors, common areas, break rooms, entry spaces, trash areas, and recurring cleaning routines.'; problemH='When a Facility Needs Janitorial Support'; problems=@(@('Shared Restrooms','Restrooms need consistent attention because many people use them throughout the week.'),@('Common Areas','Entries, hallways, break rooms, and shared rooms can show traffic quickly.'),@('Recurring Needs','Facilities often need routine cleaning instead of one-off visits.'),@('Staff Time','Cleaning tasks can pull staff away from their actual work.')); approach=@('Review the facility type, schedule, access, high-traffic areas, and cleaning expectations.','Plan recurring tasks around restrooms, floors, common areas, break rooms, entries, and touch points.','Keep the routine clear so the facility stays easier to manage.','Discuss changes when occupancy, weather, or use patterns shift.'); trust=@('Janitorial planning starts with how the facility is actually used.','Restrooms, floors, entries, and shared areas stay central to the scope.','Clear routines help reduce confusion around recurring cleaning.','Claims about certifications or guarantees are left out unless verified.'); examples=@(@('Restroom Routine','Shared restrooms need steady cleaning because they affect staff, guests, and everyday facility comfort.'),@('Entry and Hallway Traffic','Floors, doors, and entry areas often show the first signs of weather and foot traffic.'),@('Break Room Cleaning','Tables, counters, sinks, appliance areas, and floors can get messy in busy workplace break rooms.'),@('Recurring Facility Care','Janitorial support helps workplaces keep cleaning tasks from becoming a staff distraction.')); related=@((Rel 'office' 'Office Cleaning' 'Cleaning for desks, shared areas, and workspaces.'),(Rel 'standard' 'Standard Cleaning' 'Routine cleaning for smaller spaces.'),(Rel 'deep' 'Deep Clean' 'Detail cleaning when a facility needs a stronger reset.'),(Rel 'post' 'Post Construction Cleaning' 'Cleanup after facility improvements or build-outs.')); faq=@('What janitorial services can you help with?','Can janitorial cleaning be recurring?','Do you clean restrooms and break rooms?','Can you support small facilities?','How do we set the cleaning scope?') }
)

$template = Invoke-RestMethod -Uri "$base/wp-json/wp/v2/pages/6077?context=edit&_fields=id,meta,title,slug,status,parent" -Headers @{ Authorization = $auth }
$templateDataString = [string]$template.meta._elementor_data

function EnsurePage($svc) {
  $found = Invoke-RestMethod -Uri "$base/wp-json/wp/v2/pages?slug=$($svc.slug)&context=edit&_fields=id,slug,title,status,parent" -Headers @{ Authorization = $auth }
  if ($found.Count -gt 0) { return [int]$found[0].id }
  if ($svc.key -eq 'deep') {
    Invoke-RestMethod -Method Post -Uri "$base/wp-json/wp/v2/pages/6077" -Headers $headers -Body (@{ title = $svc.title; slug = $svc.slug; parent = $parentId; status = 'publish' } | ConvertTo-Json) | Out-Null
    return 6077
  }
  $body = @{
    title = $svc.title
    slug = $svc.slug
    parent = $parentId
    status = 'publish'
    meta = @{ _elementor_edit_mode = 'builder'; _elementor_template_type = 'wp-page'; _elementor_data = $templateDataString }
  } | ConvertTo-Json -Depth 100
  $new = Invoke-RestMethod -Method Post -Uri "$base/wp-json/wp/v2/pages" -Headers $headers -Body $body
  return [int]$new.id
}

foreach ($svc in $services) {
  $pageId = EnsurePage $svc
  $p = Invoke-RestMethod -Uri "$base/wp-json/wp/v2/pages/$pageId?context=edit&_fields=id,meta" -Headers @{ Authorization = $auth }
  $data = ([string]$p.meta._elementor_data) | ConvertFrom-Json
  H $data 'cd5afd7' $svc.h1
  E $data 'a028392' (P $svc.intro)
  List $data '3d49090' @('Clear Scope')
  List $data 'd686603' @('Neat Work')
  E $data '243d0ce' '<p>Need Cleaning?</p>'
  H $data 'fb30028' 'Contact Us Now!'
  $hero = Find-Node $data '8c893f2'; if ($hero) { $hero.settings.background_image = [pscustomobject]@{ id = [int]$img.hero.id; url = $img.hero.url } }

  H $data '2390ad1' $svc.problemH
  E $data 'faacfd2' (P 'Cleaning needs usually start with a real pressure point: a move, a busy office, dust after work, or a space that no longer feels easy to manage. These are the signs this service may be the right fit.')
  $problemIds = @('05608d4','77587c1','b8496da','959054a')
  for ($i=0; $i -lt 4; $i++) { Box $data $problemIds[$i] $svc.problems[$i][0] $svc.problems[$i][1] }

  H $data 'e00c453' 'OUR APPROACH'
  H $data 'aa059ce' ("How Emerald Handles " + $svc.title)
  H $data 'ba594ed' 'A clear plan before the cleaning starts'
  List $data '1a6d842' $svc.approach
  Img $data '63c3393' $svc.image
  B $data 'dde1812' 'Email Us' 'mailto:info@emeraldcelaning.co'
  B $data '3b9a1d6' '605-800-6841' 'tel:+16058006841'

  H $data '9d6770f' 'WHY IT MATTERS'
  H $data 'cd61791' ($svc.title + ' With Practical Expectations')
  H $data '7dce8ee' 'Useful cleaning without fake promises'
  List $data 'a73192f' $svc.trust
  Img $data '9204026' $svc.image
  B $data '8631ebf' 'Request Cleaning' 'mailto:info@emeraldcelaning.co'
  B $data '1340429' '605-800-6841' 'tel:+16058006841'

  H $data '89cee13' 'COMMON SITUATIONS'
  H $data 'e0d87c0' ($svc.title + ' Situations Around Sioux Falls')
  E $data '2f37425' (P 'These examples describe common cleaning situations this service is meant to support. They are written as practical scenarios, not invented customer stories or fake completed jobs.')
  $storyIds = @('b570634','050dd12','bcd0631','a5aadff')
  for ($i=0; $i -lt 4; $i++) { E $data $storyIds[$i] (Card $svc.examples[$i][0] $svc.examples[$i][1]) }

  H $data '45e979d' 'RELATED SERVICES'
  H $data '3ca9b87' 'Related Cleaning Services'
  E $data '4e6cdc8' (P 'Cleaning needs often overlap. These related services can help if the job includes more than one type of space, deadline, or cleaning level.')
  $relIds = @('660de7c','b0f4bea','f9504d0','9b3ce5a')
  for ($i=0; $i -lt 4; $i++) { Box $data $relIds[$i] $svc.related[$i].title $svc.related[$i].desc $svc.related[$i].url }
  E $data 'cdc933f' '<p>Not sure which cleaning service fits? Send the space details and timing, and Emerald Cleaning can help you choose the next step.</p>'

  H $data 'b10d8c4' 'Cleaning Scope and Responsibility'
  E $data '3eb8050' (P 'Every cleaning job depends on access, surface condition, timing, and the level of buildup. Emerald Cleaning keeps the scope clear and avoids claims that have not been confirmed, so customers know what is being planned before work begins.')

  H $data 'bfe2683' 'SERVICE QUESTIONS'
  H $data '3501291' ($svc.title + ' FAQs')
  E $data 'f0e1fa0' (P 'These answers cover common questions people have before booking this service in Sioux Falls.')
  Faq $data $svc.faq
  $answerIds = @('77c725d','52b33c5','4b3d608','8de3531','09c3709')
  for ($i=0; $i -lt 5; $i++) { E $data $answerIds[$i] (P 'Send the property type, timing, access details, and any priority areas. Emerald Cleaning can help confirm what fits this service and what may need a different cleaning plan.') }

  $json = $data | ConvertTo-Json -Depth 100 -Compress
  $body = @{
    title = $svc.title
    slug = $svc.slug
    parent = $parentId
    status = 'publish'
    meta = @{ _elementor_edit_mode = 'builder'; _elementor_template_type = 'wp-page'; _elementor_data = [string]$json }
  } | ConvertTo-Json -Depth 100
  Invoke-RestMethod -Method Post -Uri "$base/wp-json/wp/v2/pages/$pageId" -Headers $headers -Body $body | Out-Null
  Write-Output "service-updated:${pageId}:$($svc.slug)"
}

try { Invoke-RestMethod -Method Delete -Uri "$base/wp-json/elementor/v1/cache" -Headers @{ Authorization = $auth } | Out-Null } catch {}
Write-Output 'service-pages-complete'
