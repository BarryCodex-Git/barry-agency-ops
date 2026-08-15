$ErrorActionPreference = 'Stop'

$base = 'https://dev7.mynewwebsite.co.za'
$user = 'barry'
$pass = 'zfLc i3Fn yZqq IsJU pICd ZAr1'
$auth = 'Basic ' + [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes(('{0}:{1}' -f $user, $pass)))
$headers = @{ Authorization = $auth; 'Content-Type' = 'application/json' }

$media = Get-Content -LiteralPath 'C:\Users\USER\Documents\Codex\Barry\clients\Emerald Cleaning of Sioux Falls\assets\AI Images\uploaded-dev7.json' | ConvertFrom-Json
function MediaByName($pattern) { $media | Where-Object { $_.name -like $pattern } | Select-Object -First 1 }

$img = @{
  logo = MediaByName '*logo.jpg'
  hero = MediaByName '*hero-cleaning-team*'
  deep = MediaByName '*deep-clean*'
  movein = MediaByName '*move-in-clean*'
  moveout = MediaByName '*move-out-clean*'
  office = MediaByName '*office-cleaning*'
  standard = MediaByName '*standard-cleaning*'
  post = MediaByName '*post-construction*'
  housekeeping = MediaByName '*housekeeping*'
  janitorial = MediaByName '*janitorial*'
}

function Find-Node($nodes, $id) {
  foreach ($n in $nodes) {
    if ($n.id -eq $id) { return $n }
    if ($n.elements) {
      $r = Find-Node $n.elements $id
      if ($r) { return $r }
    }
  }
}
function SetHeading($data, $id, $text) { $n = Find-Node $data $id; if ($n) { $n.settings.title = $text } }
function SetEditor($data, $id, $html) { $n = Find-Node $data $id; if ($n) { $n.settings.editor = $html } }
function SetButton($data, $id, $text, $url) {
  $n = Find-Node $data $id
  if (-not $n) { return }
  if ($n.settings.PSObject.Properties.Name -contains 'text') { $n.settings.text = $text }
  if ($n.settings.PSObject.Properties.Name -contains 'link') {
    if (-not $n.settings.link) { $n.settings.link = [pscustomobject]@{} }
    $n.settings.link.url = $url
    $n.settings.link.is_external = ''
    $n.settings.link.nofollow = ''
    $n.settings.link.custom_attributes = ''
  }
}
function SetImage($data, $id, $m) {
  $n = Find-Node $data $id
  if (-not $n -or -not $m) { return }
  $n.settings.image = [pscustomobject]@{ id = [int]$m.id; url = $m.url }
}
function SetIconBox($data, $id, $title, $desc) {
  $n = Find-Node $data $id
  if (-not $n) { return }
  $n.settings.title_text = $title
  $n.settings.description_text = $desc
}
function SetIconList($data, $id, $items) {
  $n = Find-Node $data $id
  if (-not $n -or -not ($n.settings.PSObject.Properties.Name -contains 'icon_list')) { return }
  $new = @()
  for ($i = 0; $i -lt $items.Count; $i++) {
    $old = $null
    if ($n.settings.icon_list.Count -gt $i) { $old = $n.settings.icon_list[$i] }
    $new += [pscustomobject]@{ text = $items[$i]; _id = if ($old -and $old._id) { $old._id } else { "item$i" } }
  }
  $n.settings.icon_list = $new
}
function SetFaq($data, $id, $items) {
  $n = Find-Node $data $id
  if (-not $n -or -not ($n.settings.PSObject.Properties.Name -contains 'items')) { return }
  for ($i = 0; $i -lt [Math]::Min($n.settings.items.Count, $items.Count); $i++) {
    $n.settings.items[$i].item_title = $items[$i][0]
  }
}
function P($text) { '<p>' + [System.Web.HttpUtility]::HtmlEncode($text) + '</p>' }

$page = Invoke-RestMethod -Uri "$base/wp-json/wp/v2/pages/2747?context=edit&_fields=id,meta" -Headers @{ Authorization = $auth }
$data = $page.meta._elementor_data | ConvertFrom-Json

# Hero and form prompt
SetHeading $data 'cd5afd7' 'Cleaning Services in Sioux Falls, South Dakota'
SetEditor $data 'a028392' (P 'Keeping a home, office, or rental clean is easier when the work is planned around the space. Emerald Cleaning of Sioux Falls helps with routine cleaning, deep cleaning, turnovers, office care, and post-construction cleanup across Sioux Falls.')
SetIconList $data '3d49090' @('Neat Work')
SetIconList $data 'd686603' @('Clear Plans')
SetEditor $data '243d0ce' '<p>Need Cleaning?</p>'
SetHeading $data 'fb30028' 'Contact Us Now!'
SetImage $data '03c3c21' $img.logo

# Service cards
SetHeading $data '3f319af' 'OUR SERVICES'
SetHeading $data '82ac492' 'Cleaning Help for Homes, Offices, and Turnovers'
SetButton $data 'cf26d49' 'View Services' '/services/'
$cards = @(
  @('76a6001','0d7fdcc','2b5782a','628c228',$img.deep,'Deep Clean','When dust, grime, and buildup have gone past a normal tidy-up, a deep clean helps reset the space. We focus on kitchens, bathrooms, floors, surfaces, corners, and the details that make a room feel fresh again.','/services/deep-clean-sioux-falls/'),
  @('ef1b9bd','a97eb9f','fa787d7','ca08deb',$img.movein,'Move-In Clean','Moving into a new place feels better when the space has been cleaned before boxes arrive. We help prepare kitchens, bathrooms, bedrooms, closets, and common areas so the home feels ready from day one.','/services/move-in-clean-sioux-falls/'),
  @('4dc0823','16b393a','1b0fce8','651e4c3',$img.moveout,'Move-Out Clean','Move-out cleaning is about leaving the property in better shape for the next person. We help with the dust, surfaces, appliance areas, bathrooms, and overlooked spots that often show up during final walkthroughs.','/services/move-out-clean-sioux-falls/'),
  @('e4135fd','28e3e7a','e72db25','eb092d5',$img.office,'Office Cleaning','A clean office helps staff, clients, and visitors feel comfortable in the space. Emerald Cleaning can help with desks, shared areas, restrooms, break rooms, floors, and recurring cleaning needs for Sioux Falls workplaces.','/services/office-cleaning-sioux-falls/'),
  @('35a0be0','18b4101','b1f4573','02dd18c',$img.standard,'Standard Cleaning','Standard cleaning helps keep regular mess from turning into a bigger job. We handle practical weekly or scheduled cleaning tasks such as surfaces, floors, bathrooms, kitchens, dusting, and general upkeep.','/services/standard-cleaning-sioux-falls/')
)
foreach ($c in $cards) {
  SetImage $data $c[0] $c[4]
  SetHeading $data $c[1] $c[5]
  SetEditor $data $c[2] (P $c[6])
  SetButton $data $c[3] 'View Service' $c[7]
}

# Common problems
SetHeading $data '46f2058' 'COMMON CLEANING NEEDS'
SetIconBox $data 'e78bae5' 'Built-Up Grime' 'Some spaces need more than a quick wipe-down, especially kitchens, bathrooms, floors, baseboards, and high-touch areas.'
SetIconBox $data 'e5bc063' 'Moving Pressure' 'Packing, keys, walkthroughs, and deadlines can make move-in or move-out cleaning hard to manage alone.'
SetIconBox $data 'c277e45' 'Busy Workspaces' 'Offices and shared spaces need regular care so desks, restrooms, break rooms, and floors do not fall behind.'
SetIconBox $data '920f545' 'Construction Dust' 'Fine dust after remodeling or construction settles into edges, counters, floors, and fixtures long after the tools leave.'

# Process
SetHeading $data '386797f' 'OUR PROCESS'
SetIconBox $data '5ce4f31' 'Share The Space' 'Tell us what needs cleaning, the property type, timing, access details, and any areas that need extra attention.'
SetIconBox $data 'ade04b8' 'Plan The Clean' 'We match the cleaning plan to the space, whether it is a standard visit, deep clean, office schedule, turnover, or post-construction job.'
SetIconBox $data '7d7f2f1' 'Clean And Check' 'The work stays focused on useful cleaning details, tidy finishes, and clear communication if something needs a different approach.'
SetImage $data '28e4d06' $img.housekeeping
SetButton $data 'c3f8626' 'Request Cleaning' 'mailto:info@emeraldcelaning.co'

# Why choose / trust
SetHeading $data 'e00c453' 'WHY CHOOSE US'
SetHeading $data 'aa059ce' 'Cleaning That Fits the Way the Space Is Used'
SetEditor $data 'ce88c0f' (P 'Homes, rentals, offices, and job sites all need a different kind of clean. Emerald Cleaning keeps the work practical by looking at the space, the timing, and the areas that matter most before starting the job.')
SetIconList $data '1a6d842' @('Cleaning plans are shaped around the property type and deadline.', 'High-touch areas, floors, bathrooms, and kitchens get clear attention.', 'Move-in and move-out cleans are planned around walkthrough pressure.', 'Office and janitorial work focuses on consistency and usable spaces.')
SetButton $data 'dde1812' 'Email Us' 'mailto:info@emeraldcelaning.co'
SetButton $data '3b9a1d6' '605-800-6841' 'tel:+16058006841'
SetImage $data '63c3393' $img.office

SetHeading $data '71106a0' 'WHY TRUST US'
SetHeading $data 'f73077f' 'A Clearer Cleaning Plan for Sioux Falls Properties'
SetHeading $data '3a85d6e' 'Practical cleaning without overpromising'
SetIconList $data 'ab95a5e' @('You can send the cleaning list and timing before the visit.', 'We keep the language simple so expectations are clear.', 'We do not invent guarantees, ratings, or claims that have not been supplied.', 'If a job needs special handling, the next step can be discussed first.')
SetButton $data '59a32b2' 'Request Cleaning' 'mailto:info@emeraldcelaning.co'
SetButton $data '5bffc87' '605-800-6841' 'tel:+16058006841'
SetImage $data 'da981c3' $img.janitorial

# Testimonials pending state
SetHeading $data 'dad2408' 'CUSTOMER FEEDBACK'
SetHeading $data 'd3267a8' 'Verified Reviews'
SetEditor $data '6968c98' '<p>Customer review content will be added only from an approved, verified source. No ratings or testimonials are being invented for this new brand.</p>'
SetHeading $data '45c72f6' 'Real Feedback'
SetEditor $data 'c78390a' '<p>When Emerald Cleaning has approved customer feedback ready for the website, this section can show the exact wording from those real reviews.</p>'
SetHeading $data '9e64e2b' 'Review Source'
SetEditor $data 'b146dae' '<p>Until a review source is confirmed, the site relies on clear service copy, direct contact details, and honest expectations.</p>'

# Service standards
SetHeading $data '8c6cd38' 'WHAT TO EXPECT'
SetHeading $data 'b60c29d' 'Cleaning Standards Built Around the Job'
SetEditor $data 'fe9e0d7' (P 'Emerald Cleaning is a new brand, so the site should stay honest and practical. These are service expectations customers can understand before booking.')
SetIconBox $data '68b1cf1' 'Local Focus' 'Cleaning support for Sioux Falls homes, rentals, offices, and properties that need reliable scheduling and clear communication.'
SetIconBox $data '84bec0c' 'Clear Scope' 'The cleaning list, access, timing, and areas of focus should be discussed before the work starts.'
SetIconBox $data '7b4adf7' 'Tidy Finish' 'The goal is a cleaner, easier-to-use space with attention to the visible details that matter day to day.'

# FAQ
SetHeading $data 'bfe2683' 'GOT QUESTIONS?'
SetFaq $data '9b703bb' @(
  @('What cleaning services can I book?'),
  @('Can you help with move-in or move-out cleaning?'),
  @('Do you clean offices and commercial spaces?'),
  @('Can you help after construction or remodeling?'),
  @('Which areas do you serve?')
)
SetEditor $data '77c725d' (P 'You can ask about deep cleaning, move-in cleaning, move-out cleaning, office cleaning, standard cleaning, post-construction cleaning, general housekeeping, and janitorial cleaning.')
SetEditor $data '52b33c5' (P 'Yes. Move-related cleaning can help before boxes arrive, after furniture leaves, or before a walkthrough. Share the timing, access details, and rooms that need attention.')
SetEditor $data '4b3d608' (P 'Yes. Office cleaning and janitorial work can include shared areas, desks, floors, restrooms, break rooms, and other practical cleaning needs for Sioux Falls workplaces.')
SetEditor $data '3c037e4' (P 'Post-construction cleaning can help remove fine dust and leftover mess after remodeling or building work. The exact scope depends on the condition of the space.')
SetEditor $data '8c303b5' (P 'Emerald Cleaning serves Sioux Falls, South Dakota. If the property is nearby, send the location and cleaning details so coverage can be confirmed.')

# Service areas
SetHeading $data '97fa801' 'SERVICE AREAS'
SetHeading $data '09cb4b3' 'Sioux Falls'
SetEditor $data '31d1f8a' (P 'Cleaning services for Sioux Falls homes, apartments, offices, rentals, and small commercial spaces.')
SetHeading $data 'aff157d' 'Homes'
SetEditor $data 'd3236a3' (P 'Standard cleaning, deep cleaning, housekeeping, and move-related cleaning for everyday residential spaces.')
SetHeading $data '4972953' 'Apartments'
SetEditor $data 'a63d7d3' (P 'Move-in and move-out cleaning support for apartments, rentals, and property handovers.')
SetHeading $data 'c117667' 'Offices'
SetEditor $data '77d1277' (P 'Office cleaning and janitorial help for workspaces that need regular, practical upkeep.')
SetHeading $data 'd342891' 'New Builds'
SetEditor $data '17e30e4' (P 'Post-construction cleaning support after remodeling, build-outs, or property updates.')
SetImage $data '2cbee7d' $img.hero
SetImage $data '400d819' $img.standard
SetImage $data 'f8fe57c' $img.moveout
SetImage $data '02198d1' $img.office
SetImage $data '73decc2' $img.post
SetButton $data '43cf741' 'View Service Areas' '/service-areas/'

# Background hero image
$hero = Find-Node $data '8c893f2'
if ($hero) {
  if (-not $hero.settings.background_image) { $hero.settings | Add-Member -NotePropertyName 'background_image' -NotePropertyValue ([pscustomobject]@{}) -Force }
  $hero.settings.background_image = [pscustomobject]@{ id = [int]$img.hero.id; url = $img.hero.url }
}

$json = $data | ConvertTo-Json -Depth 100 -Compress
$body = @{ meta = @{ _elementor_data = [string]$json } } | ConvertTo-Json -Depth 100
Invoke-RestMethod -Method Post -Uri "$base/wp-json/wp/v2/pages/2747" -Headers $headers -Body $body | Out-Null

# Basic SEO via common Yoast meta keys when present.
$seoBody = @{
  title = 'Home'
  meta = @{
    _yoast_wpseo_focuskw = 'Cleaning Services in Sioux Falls, South Dakota'
    _yoast_wpseo_title = 'Cleaning Services in Sioux Falls, South Dakota | Emerald Cleaning'
    _yoast_wpseo_metadesc = 'Emerald Cleaning of Sioux Falls helps with deep cleaning, move-in and move-out cleans, office cleaning, standard cleaning, housekeeping, janitorial work and post-construction cleaning.'
  }
} | ConvertTo-Json -Depth 5
Invoke-RestMethod -Method Post -Uri "$base/wp-json/wp/v2/pages/2747" -Headers $headers -Body $seoBody | Out-Null

try { Invoke-RestMethod -Method Delete -Uri "$base/wp-json/elementor/v1/cache" -Headers @{ Authorization = $auth } | Out-Null } catch {}
Write-Output 'home-updated'
