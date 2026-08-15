param(
  [ValidateSet('home','hub','batch1','batch2','batch3','all')]
  [string]$PageSet = 'all'
)
$ErrorActionPreference = 'Stop'
$site = 'https://dev8.mynewwebsite.co.za'
$plain = $env:DEV8_APP_PASSWORD
if ([string]::IsNullOrWhiteSpace($plain)) { throw 'DEV8_APP_PASSWORD is required.' }
$auth = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes(("barry:{0}" -f $plain)))
$headers = @{ Authorization = "Basic $auth"; 'Content-Type' = 'application/json' }

function HtmlP([string]$s) { return '<p>' + $s + '</p>' }
function HtmlPs([string[]]$arr) { return (($arr | ForEach-Object { HtmlP $_ }) -join '') }
function CleanJson($o) { return ($o | ConvertTo-Json -Depth 100 -Compress) }
function FindNode($nodes, [string]$id) {
  foreach($n in @($nodes)) {
    if($n.id -eq $id) { return $n }
    if($n.elements) { $f = FindNode $n.elements $id; if($f) { return $f } }
  }
  return $null
}
function SetTitle($data, $id, $text) {
  $n = FindNode $data $id
  if($n -and $n.settings) {
    if($n.settings.PSObject.Properties.Name -contains 'title') { $n.settings.title = $text }
    elseif($n.settings.PSObject.Properties.Name -contains 'title_text') { $n.settings.title_text = $text }
    elseif($n.settings.PSObject.Properties.Name -contains 'text') { $n.settings.text = $text }
    else { Add-Member -InputObject $n.settings -NotePropertyName title -NotePropertyValue $text -Force }
  }
}
function SetEditor($data, $id, $html) { $n = FindNode $data $id; if($n -and $n.settings) { $n.settings.editor = $html } }
function SetIconList($data, $id, [string[]]$items) {
  $n = FindNode $data $id
  if($n -and $n.settings -and ($n.settings.PSObject.Properties.Name -contains 'icon_list')) {
    $old = @($n.settings.icon_list)
    $new = @()
    for($i=0; $i -lt $items.Count; $i++) {
      $base = if($i -lt $old.Count) { $old[$i].PSObject.Copy() } else { [pscustomobject]@{ text=''; _id=('item'+$i) } }
      $base.text = $items[$i]
      $new += $base
    }
    $n.settings.icon_list = $new
  }
}
function SetFaq($data, $id, $faqs) {
  $n = FindNode $data $id
  if($n -and $n.settings) {
    foreach($prop in @('tabs','faq_list','accordion_items')) {
      if($n.settings.PSObject.Properties.Name -contains $prop) {
        $old = @($n.settings.$prop)
        $new = @()
        for($i=0; $i -lt $faqs.Count; $i++) {
          $base = if($i -lt $old.Count) { $old[$i].PSObject.Copy() } else { [pscustomobject]@{ _id=('faq'+$i) } }
          if($base.PSObject.Properties.Name -contains 'tab_title') { $base.tab_title = $faqs[$i].q }
          elseif($base.PSObject.Properties.Name -contains 'title') { $base.title = $faqs[$i].q }
          else { Add-Member -InputObject $base -NotePropertyName tab_title -NotePropertyValue $faqs[$i].q -Force }
          $answer = HtmlP $faqs[$i].a
          if($base.PSObject.Properties.Name -contains 'tab_content') { $base.tab_content = $answer }
          elseif($base.PSObject.Properties.Name -contains 'content') { $base.content = $answer }
          else { Add-Member -InputObject $base -NotePropertyName tab_content -NotePropertyValue $answer -Force }
          $new += $base
        }
        $n.settings.$prop = $new
      }
    }
  }
}
function UpdatePage($id, [scriptblock]$mutate) {
  $p = Invoke-RestMethod -Headers @{ Authorization = "Basic $auth" } -Uri "$site/wp-json/wp/v2/pages/$($id)?context=edit&_fields=id,title,content,meta" -Method Get
  $data = $p.meta._elementor_data | ConvertFrom-Json
  & $mutate $data
  $body = @{ meta = @{ _elementor_data = (CleanJson $data) } } | ConvertTo-Json -Depth 100 -Compress
  Invoke-RestMethod -Headers $headers -Uri "$site/wp-json/wp/v2/pages/$($id)" -Method Post -Body $body | Out-Null
}

function UpdateRenderedContent($id, [hashtable]$replacements) {
  $p = Invoke-RestMethod -Headers @{ Authorization = "Basic $auth" } -Uri "$site/wp-json/wp/v2/pages/$($id)?context=edit&_fields=content" -Method Get
  $content = $p.content.raw
  foreach($key in $replacements.Keys) {
    $content = $content.Replace($key, $replacements[$key])
  }
  $body = @{ content = $content } | ConvertTo-Json -Depth 10 -Compress
  Invoke-RestMethod -Headers $headers -Uri "$site/wp-json/wp/v2/pages/$($id)" -Method Post -Body $body | Out-Null
}

function RenderShell([string]$h1, [string[]]$intro, [string]$body) {
  $introHtml = ($intro | ForEach-Object { "<p>$_</p>" }) -join ''
  return @"
<style>
.zach-copy{font-family:Arial,sans-serif;line-height:1.65;color:#222;max-width:1120px;margin:0 auto;padding:48px 20px}
.zach-copy h1{font-size:clamp(34px,5vw,58px);line-height:1.08;margin:0 0 18px;color:#111}
.zach-copy h2{font-size:clamp(26px,3vw,36px);margin:42px 0 14px;color:#111}
.zach-copy h3{font-size:20px;margin:0 0 8px;color:#111}
.zach-copy p{font-size:18px;margin:0 0 14px}
.zach-copy ul{margin:0;padding-left:22px}
.zach-copy li{font-size:17px;margin:0 0 8px}
.zach-copy .hero{background:#f6f3ef;border-left:6px solid #ff8617;padding:34px;margin:0 0 34px}
.zach-copy .grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:18px}
.zach-copy .card{border:1px solid #e6e1da;border-radius:8px;padding:20px;background:#fff}
.zach-copy .cta{background:#171717;color:#fff;border-radius:8px;padding:28px;margin-top:42px}
.zach-copy .cta a{color:#fff;font-weight:700}
</style>
<main class="zach-copy">
  <section class="hero"><h1>$h1</h1>$introHtml<p><strong>Call <a href="tel:+14062240416">406-224-0416</a></strong> or send your repair list to <a href="mailto:info@handymanofbozeman.com">info@handymanofbozeman.com</a>.</p></section>
  $body
</main>
"@
}

function RenderServicePage($pinfo) {
  $jobs = ($pinfo.jobs | ForEach-Object { "<li>$_</li>" }) -join ''
  $when = ($pinfo.when | ForEach-Object { "<li>$_</li>" }) -join ''
  $process = ($pinfo.process | ForEach-Object { "<li>$_</li>" }) -join ''
  $why = ($pinfo.why | ForEach-Object { "<div class='card'><p>$_</p></div>" }) -join ''
  $audience = ($pinfo.audience | ForEach-Object { "<p>$_</p>" }) -join ''
  $faq = ($pinfo.faq | ForEach-Object { "<div class='card'><h3>$($_.q)</h3><p>$($_.a)</p></div>" }) -join ''
  $body = @"
<h2>What We Can Help With</h2>
<p>Most handyman calls start with a list. Some jobs are quick fixes, and others need a little sorting before work begins.</p>
<ul>$jobs</ul>
<h2>When It Makes Sense to Call a Handyman</h2>
<ul>$when</ul>
<h2>How Zach's Handyman Handles the Work</h2>
<ul>$process</ul>
<h2>Why Bozeman Property Owners Call Zach's</h2>
<div class="grid">$why</div>
<h2>For Homes, Rentals, and Small Businesses</h2>
$audience
<h2>What May Need a Specialist</h2>
<p>$($pinfo.specialist)</p>
<h2>Service Areas</h2>
<p>We serve Bozeman, Belgrade, Four Corners, Gallatin Gateway, Livingston, and nearby Gallatin Valley areas where scheduling allows.</p>
<h2>FAQs</h2>
<div class="grid">$faq</div>
<section class="cta"><h2>Send Your Repair List</h2><p>Not sure if it is a handyman job? Send a message with the jobs you need handled, and we will help you plan the next step.</p></section>
"@
  return RenderShell $pinfo.h1 $pinfo.hero $body
}

function SetRenderedHtml($id, [string]$html) {
  $body = @{ content = $html } | ConvertTo-Json -Depth 20 -Compress
  Invoke-RestMethod -Headers $headers -Uri "$site/wp-json/wp/v2/pages/$($id)" -Method Post -Body $body | Out-Null
}

if($PageSet -in @('home','all')) {
UpdatePage 2747 {
  param($d)
  SetTitle $d 'cd5afd7' 'Handyman Services in Bozeman for Repairs, Maintenance, and Small Projects'
  SetEditor $d 'a028392' (HtmlPs @(
    'Small repairs have a way of piling up. If your home, rental, or office needs practical fixes, Zach''s Handyman can help you sort the list and get the next step moving.',
    'We help with handyman services in Bozeman, Belgrade, Four Corners, Gallatin Gateway, Livingston, and nearby Gallatin Valley areas where scheduling allows. Call 406-224-0416 or send your repair list and we''ll help you plan the next step.'
  ))
  SetEditor $d '243d0ce' (HtmlP 'Need Repairs?')
  SetTitle $d 'fb30028' 'Send Your Repair List'
  SetTitle $d '0d7fdcc' 'Maintenance Contracting'
  SetEditor $d '2b5782a' (HtmlP 'A steady repair list can slow down a rental, office, or busy home. We help with routine property maintenance, small fixes, and the kind of follow-up work that keeps things from slipping.')
  SetTitle $d 'a97eb9f' 'Unit Turnovers'
  SetEditor $d 'fa787d7' (HtmlP 'Turnovers move faster when the punch list is clear. We help with rental turnover repairs, touch-ups, loose hardware, damaged trim, cleanup tasks, and practical fixes before the next tenant arrives.')
  SetTitle $d '16b393a' 'Siding and Deck Repairs'
  SetEditor $d '1b0fce8' (HtmlP 'Bozeman weather can be hard on exterior surfaces. We help with siding repairs, deck repairs, loose boards, worn trim, and other visible wear that needs attention before it gets worse.')
  SetTitle $d '28e3e7a' 'Painting and Power Washing'
  SetEditor $d 'e72db25' (HtmlP 'Fresh paint and clean exterior surfaces can make a property feel cared for again. We help with interior painting, exterior touch-ups, power washing, and prep work where the surface allows.')
  SetTitle $d '18b4101' 'Junk Removal and Cleanup'
  SetEditor $d 'b1f4573' (HtmlP 'Repair work often starts with clearing the space. We help remove leftover junk from cleanouts, turnovers, small projects, and maintenance jobs so the next step is easier to handle.')
  SetIconList $d '1a6d842' @(
    'Clear communication before work starts',
    'Practical repair advice without pressure',
    'Tidy work habits around your property',
    'Help sorting what can be handled now',
    'Honest guidance when a specialist is needed'
  )
  SetIconList $d 'ab95a5e' @(
    'Homes with growing repair lists',
    'Rental properties between tenants',
    'Small businesses with nagging maintenance items',
    'Seasonal exterior wear from wind, snow, and moisture',
    'Punch-list jobs after inspections or move-outs'
  )
  SetFaq $d '9b703bb' @(
    @{q='What kinds of handyman jobs do you handle?';a='We help with practical home repairs, property maintenance, rental turnover repairs, siding repairs, deck repairs, painting, power washing, junk removal, and related small repair jobs.'},
    @{q='Do you work outside Bozeman?';a='Yes. We serve Bozeman, Belgrade, Four Corners, Gallatin Gateway, Livingston, and nearby Gallatin Valley areas where scheduling allows.'},
    @{q='Can I send a list of several small jobs?';a='Yes. Sending the full list helps us group the work, confirm priorities, and explain what can be handled efficiently.'},
    @{q='Do you help landlords and property managers?';a='Yes. We can help with turnover punch lists, repair follow-up, cleanup, and maintenance items that hold up a rental.'},
    @{q='What work may need a licensed specialist?';a='Major electrical, plumbing, structural, gas, roofing, or permitted work may need a licensed specialist. We will tell you if a job falls outside normal handyman scope.'}
  )
}
UpdateRenderedContent 2747 @{
  'Handyman Services in Bozeman, MT' = 'Handyman Services in Bozeman for Repairs, Maintenance, and Small Projects'
  'Zach’s Handyman of Bozeman helps homeowners, landlords, property managers and small businesses keep repairs moving, from maintenance contracts and unit turnovers to siding, decks, painting, power washing and cleanup work across the Bozeman area.' = 'Small repairs have a way of piling up. If your home, rental, or office needs practical fixes, Zach''s Handyman can help you sort the list and get the next step moving. We help with handyman services in Bozeman, Belgrade, Four Corners, Gallatin Gateway, Livingston, and nearby Gallatin Valley areas where scheduling allows. Call 406-224-0416 or send your repair list and we''ll help you plan the next step.'
  'Contact Us Now!' = 'Send Your Repair List'
  'A steady maintenance plan keeps rental properties, homes and business spaces moving. We help with recurring repair lists, routine checks and practical fixes before small issues turn into bigger interruptions.' = 'A steady repair list can slow down a rental, office, or busy home. We help with routine property maintenance, small fixes, and the kind of follow-up work that keeps things from slipping.'
  'Turnover work often comes with a deadline. Zach''s Handyman helps with move-out punch lists, minor repairs, touch-ups and cleanup items so units are easier to prepare for the next tenant.' = 'Turnovers move faster when the punch list is clear. We help with rental turnover repairs, touch-ups, loose hardware, damaged trim, cleanup tasks, and practical fixes before the next tenant arrives.'
  'Bozeman weather can be hard on exterior surfaces. We repair damaged siding areas, worn trim, loose deck boards and practical outdoor issues that affect comfort, safety and curb appeal.' = 'Bozeman weather can be hard on exterior surfaces. We help with siding repairs, deck repairs, loose boards, worn trim, and other visible wear that needs attention before it gets worse.'
  'Fresh surfaces can make a property feel cared for again. We help with interior and exterior painting needs, surface prep, touch-ups and power washing for siding, decks, walkways and work areas.' = 'Fresh paint and clean exterior surfaces can make a property feel cared for again. We help with interior painting, exterior touch-ups, power washing, and prep work where the surface allows.'
  'Cleanup often comes before repair work can start. We remove unwanted items, leftover debris and clutter from cleanouts, turnovers and small projects so the space is easier to use again.' = 'Repair work often starts with clearing the space. We help remove leftover junk from cleanouts, turnovers, small projects, and maintenance jobs so the next step is easier to handle.'
}
$homeBody = @"
<h2>Common Handyman Jobs We Help With</h2>
<div class="grid">
<div class="card"><h3>Maintenance Contracting</h3><p>A steady repair list can slow down a rental, office, or busy home. We help with routine property maintenance, small fixes, and the kind of follow-up work that keeps things from slipping.</p></div>
<div class="card"><h3>Unit Turnovers</h3><p>Turnovers move faster when the punch list is clear. We help with rental turnover repairs, touch-ups, loose hardware, damaged trim, cleanup tasks, and practical fixes before the next tenant arrives.</p></div>
<div class="card"><h3>Siding and Deck Repairs</h3><p>Bozeman weather can be hard on exterior surfaces. We help with siding repairs, deck repairs, loose boards, worn trim, and other visible wear that needs attention before it gets worse.</p></div>
<div class="card"><h3>Painting and Power Washing</h3><p>Fresh paint and clean exterior surfaces can make a property feel cared for again. We help with interior painting, exterior touch-ups, power washing, and prep work where the surface allows.</p></div>
<div class="card"><h3>Junk Removal and Cleanup</h3><p>Repair work often starts with clearing the space. We help remove leftover junk from cleanouts, turnovers, small projects, and maintenance jobs so the next step is easier to handle.</p></div>
</div>
<h2>When It Makes Sense to Call a Handyman</h2>
<ul><li>Your repair list is growing and you want help sorting it.</li><li>A rental turnover needs practical follow-through.</li><li>Seasonal weather has left exterior areas worn or loose.</li><li>A small business needs repairs handled without turning it into a remodel.</li></ul>
<h2>What May Need a Specialist</h2>
<p>Major electrical, plumbing, structural, gas, roofing, or permitted work may need a licensed specialist. We will tell you if a job falls outside normal handyman scope.</p>
<h2>Service Areas</h2>
<p>We serve Bozeman, Belgrade, Four Corners, Gallatin Gateway, Livingston, and nearby Gallatin Valley areas where scheduling allows.</p>
<section class="cta"><h2>Ready to Talk Through the List?</h2><p>Call Zach's Handyman to talk through your repair list, or send photos and details by email.</p></section>
"@
SetRenderedHtml 2747 (RenderShell 'Handyman Services in Bozeman for Repairs, Maintenance, and Small Projects' @('Small repairs have a way of piling up. If your home, rental, or office needs practical fixes, Zach''s Handyman can help you sort the list and get the next step moving.','We help with handyman services in Bozeman, Belgrade, Four Corners, Gallatin Gateway, Livingston, and nearby Gallatin Valley areas where scheduling allows.') $homeBody)
}

$svcPages = @(
  @{id=6077; h1='Handyman Services in Bozeman for Repairs, Maintenance, and Small Projects'; hero=@('Small repairs have a way of spreading across a property. A loose handrail, damaged trim, sticking door, or worn deck board may seem minor until it starts causing daily frustration.','Zach''s Handyman helps Bozeman homeowners, landlords, property managers, and small businesses sort the list and handle practical repairs. Call 406-224-0416 or send the jobs you need handled.'); jobs=@('Loose fixtures, doors, trim, shelving, hardware, and minor wall repairs.','Rental punch-list items, turnover repairs, cleanup tasks, and small property maintenance jobs.','Exterior wear such as deck boards, siding sections, railings, and visible trim damage.','Painting touch-ups, power washing, junk removal, and prep work connected to repairs.'); when=@('Your repair list is growing and you want one person to help sort it.','A tenant move-out left several small jobs that need attention.','Inspection notes point to practical fixes before a sale, lease, or handover.','Seasonal weather has left decks, siding, trim, or outdoor areas looking worn.'); process=@('Review the repair list and ask for photos or details where useful.','Confirm priorities, access, timing, and what should be handled first.','Take care of the jobs that fit handyman scope and explain the next step for anything else.','Keep the work area tidy and communicate if something changes.'); why=@('Clear communication before the job starts.','Practical repairs for homes, rentals, and small businesses.','Respect for your time, space, and repair priorities.','Straight answers when a specialist is the better choice.'); audience=@('Homeowners call when the small jobs have started to pile up.','Landlords and property managers call when a turnover or tenant request needs practical follow-through.','Small businesses call when a repair is disrupting the space or making the property look neglected.'); specialist='Major electrical, plumbing, structural, gas, roofing, or permitted work may need a licensed specialist. We can still help you identify the issue and decide what should happen next.'; faq=@(@{q='Can I book several small repair jobs at once?';a='Yes. A clear list helps us group the work and make better use of the visit.'},@{q='Do you help with rental turnover repairs?';a='Yes. We help with practical turnover repairs, punch-list items, cleanup tasks, and maintenance follow-up.'},@{q='What if one item needs a specialist?';a='We will say so clearly. Some work belongs with a licensed trade, and it is better to catch that early.'},@{q='Do you serve the wider Gallatin Valley?';a='We work in Bozeman and nearby areas such as Belgrade, Four Corners, Gallatin Gateway, and Livingston where scheduling allows.'},@{q='What should I send before you come out?';a='Send the repair list, photos if you have them, the property location, and any timing concerns.'}) },
  @{id=6626; h1='Maintenance Contracting in Bozeman for Properties That Need Regular Attention'; hero=@('Property maintenance is easier when small issues are handled before they become repeat problems. Loose hardware, damaged trim, worn exterior areas, and small repairs can all add up.','Zach''s Handyman helps Bozeman property owners, landlords, and small businesses keep maintenance lists moving. Send your list and we''ll help you decide what makes sense to handle first.'); jobs=@('Routine repair lists for homes, rentals, and small business spaces.','Loose fixtures, doors, trim, shelving, hardware, and minor surface repairs.','Seasonal maintenance after snow, wind, moisture, or heavy use.','Follow-up tasks from inspections, tenant reports, or property walks.'); when=@('You want maintenance handled before tenants or customers keep reporting it.','The same small issues keep showing up during property checks.','A busy home or business needs practical repairs without a major remodel.','Seasonal wear needs attention before it becomes more expensive.'); process=@('Review the maintenance list and group related tasks.','Confirm access, timing, materials, and the most urgent items.','Handle work that fits handyman scope and keep you updated.','Flag anything that needs a specialist or a bigger repair plan.'); why=@('Useful help for regular repair lists.','Clear notes on what was handled and what still needs attention.','Respect for tenants, customers, and occupied spaces.','Practical guidance when a repair should not be delayed.'); audience=@('Homeowners use maintenance help when the list is too long for a weekend.','Landlords use it to reduce repeat tenant calls and keep turnovers moving.','Small businesses use it to keep customer-facing spaces neat and functional.'); specialist='Electrical, plumbing, structural, gas, roofing, or permitted work may need a licensed specialist. We will not dress that up as a simple handyman task.'; faq=@(@{q='Can you help with recurring maintenance lists?';a='Yes. We can help with practical repair lists and maintenance follow-up where scheduling allows.'},@{q='Do you work with property managers?';a='Yes. Clear lists, access details, and priorities help us handle the right tasks first.'},@{q='Can maintenance work include exterior items?';a='Yes, when the work fits handyman scope. Deck boards, siding sections, trim, and weather-worn areas are common examples.'},@{q='What if the repair is bigger than expected?';a='We will explain what we find and recommend the next step instead of pushing through the wrong repair.'},@{q='Which areas do you cover?';a='We serve Bozeman, Belgrade, Four Corners, Gallatin Gateway, Livingston, and nearby Gallatin Valley areas where scheduling allows.'}) },
  @{id=6627; h1='Unit Turnover Repairs in Bozeman for Rentals, Apartments, and Offices'; hero=@('Turnovers can stall over small repairs. A sticking door, damaged trim, wall patch, loose fixture, or leftover junk can hold up cleaning, photos, or the next move-in.','Zach''s Handyman helps with unit turnover repairs in Bozeman and nearby Gallatin Valley areas. Send the punch list and we''ll help you plan the next step.'); jobs=@('Punch-list repairs after tenant move-out.','Door, trim, hardware, shelving, and small wall repair items.','Painting touch-ups, cleanup tasks, and junk removal connected to the turnover.','Exterior or entry-area fixes that affect first impressions.'); when=@('The unit is nearly ready, but a list of small issues remains.','A property manager needs practical repairs handled between tenants.','Inspection notes or tenant reports point to minor damage.','Cleanup and repair work need to happen before photos or showings.'); process=@('Review the turnover list and confirm what blocks the next step.','Group repairs by priority and access.','Handle the practical repair work that fits the schedule and scope.','Point out specialist items before they delay the handover.'); why=@('Turnover-focused repair support.','Clear communication around priorities and access.','Help with the small jobs that slow move-in readiness.','Respect for occupied buildings and neighbouring tenants.'); audience=@('Landlords call when a unit needs practical fixes before the next tenant.','Property managers call when a punch list needs steady follow-through.','Small offices call when move-out cleanup and repairs need coordination.'); specialist='Major electrical, plumbing, structural, gas, appliance, HVAC, or permitted work may need a licensed specialist. We can help separate handyman items from specialist items early.'; faq=@(@{q='Can you work from a turnover punch list?';a='Yes. A clear list with photos helps us understand priorities and what may block the next move-in.'},@{q='Do you help with junk removal during turnovers?';a='Yes, when it is part of a practical turnover cleanup or repair-prep job.'},@{q='Can you do painting touch-ups?';a='Yes, for touch-ups and painting tasks that fit the project scope and surface condition.'},@{q='What if the list includes specialist work?';a='We will separate those items out so the right trade can handle them.'},@{q='Do you help outside Bozeman?';a='Yes. We also serve nearby areas such as Belgrade, Four Corners, Gallatin Gateway, and Livingston where scheduling allows.'}) },
  @{id=6628; h1='Siding Repairs in Bozeman for Weather-Worn Exterior Areas'; hero=@('Siding damage is easy to ignore until moisture, wind, or daily wear makes it worse. Loose sections, damaged trim, and worn exterior details can leave a property looking neglected.','Zach''s Handyman helps with siding repairs in Bozeman and nearby Gallatin Valley areas when the work fits handyman scope. Send photos of the damaged area and we''ll help you decide the next step.'); jobs=@('Loose or damaged siding sections.','Exterior trim repairs and visible wear around affected areas.','Small repair work connected to decks, entries, and weather-exposed surfaces.','Prep or touch-up work after a minor exterior repair.'); when=@('Wind, snow, or moisture has opened up a small exterior problem.','A rental or business exterior needs visible repairs before it gets worse.','You see loose boards, damaged trim, or siding that no longer sits right.','You are not sure whether the issue is handyman work or a larger exterior repair.'); process=@('Review photos and the location of the damaged area.','Check whether the repair fits handyman scope.','Handle practical siding or trim repairs where appropriate.','Recommend a specialist if water intrusion, roofing, or structural work is involved.'); why=@('Practical exterior repair help without overpromising.','Clear advice when the repair needs a bigger trade.','Useful support for Bozeman homes, rentals, and business properties.','Attention to weather-worn areas before they spread.'); audience=@('Homeowners call when exterior damage starts to stand out.','Landlords call when siding or trim issues show up during turnovers.','Small businesses call when visible exterior wear affects the property front.'); specialist='Large siding replacement, structural damage, roofing leaks, hidden water damage, or permitted exterior work may need a specialist. We will say that clearly if it applies.'; faq=@(@{q='Can you repair a small damaged siding area?';a='Often, yes, if the work fits handyman scope and the surrounding material is in reasonable condition.'},@{q='Should I send photos first?';a='Yes. Photos help us see the size, height, material, and access before scheduling.'},@{q='What causes siding damage in Bozeman?';a='Wind, snow, moisture, sun exposure, impacts, and age can all contribute to visible exterior wear.'},@{q='What if there is water damage behind the siding?';a='That may need a specialist. We will point that out instead of covering over a bigger problem.'},@{q='Do you cover nearby towns?';a='We work in Bozeman, Belgrade, Four Corners, Gallatin Gateway, Livingston, and nearby Gallatin Valley areas where scheduling allows.'}) }
)

$svcPages += @(
  @{id=6629; h1='Deck Repairs in Bozeman for Loose Boards, Railings, and Outdoor Wear'; hero=@('Deck problems often start small. A loose board, worn step, tired railing, or weathered surface can make outdoor space feel less safe and less comfortable.','Zach''s Handyman helps with deck repairs in Bozeman and nearby areas where the work fits handyman scope. Call 406-224-0416 or send photos of the area you want checked.'); jobs=@('Loose deck boards, worn steps, and small surface repairs.','Railing, trim, and hardware issues that need practical attention.','Seasonal deck wear from snow, moisture, sun, and regular use.','Prep work before cleaning, staining, painting, or larger repairs.'); when=@('A board feels loose or a step no longer feels solid.','The deck looks worn after winter or heavy use.','A rental turnover or inspection noted deck repairs.','You want to know if a handyman repair is enough or if a larger deck contractor is needed.'); process=@('Review the deck issue and ask for photos where helpful.','Check access, materials, and whether the repair is appropriate for handyman work.','Handle practical repairs such as boards, hardware, trim, or small sections.','Flag safety, structural, or permit-related concerns early.'); why=@('Straight answers about what can be repaired.','Helpful repair support for homes, rentals, and small properties.','Attention to weather-worn areas before they spread.','Clear guidance when structural work needs a specialist.'); audience=@('Homeowners call when a deck needs small fixes before regular use.','Landlords call when deck issues appear during tenant changeover or inspection.','Small businesses call when outdoor areas need to look cared for and feel usable.'); specialist='Structural deck rebuilds, major support work, ledger issues, railing code work, or permitted construction may need a specialist. We will not treat those as simple repairs.'; faq=@(@{q='Can you replace loose deck boards?';a='Yes, when the surrounding structure is sound and the job fits handyman scope.'},@{q='Do deck repairs depend on weather?';a='Yes. Snow, moisture, and temperature can affect timing, materials, and finish work.'},@{q='Can you fix deck railings?';a='We can help with practical railing or hardware repairs. Structural or code-related railing work may need a specialist.'},@{q='Should I send photos of the deck?';a='Yes. Photos help us understand access, material, height, and the size of the repair.'},@{q='Do you serve the Gallatin Valley?';a='Yes, where scheduling allows, including Bozeman, Belgrade, Four Corners, Gallatin Gateway, and Livingston.'}) },
  @{id=6630; h1='Interior and Exterior Painting Help in Bozeman'; hero=@('Paint can change how a room or exterior area feels, but the prep matters. Scuffed trim, patched walls, worn siding, and weathered details need the right attention before fresh paint goes on.','Zach''s Handyman helps with painting work in Bozeman for homes, rentals, and small businesses when the project fits handyman scope. Send the area, surface, and photos so we can help you plan it.'); jobs=@('Interior touch-ups, trim, doors, and small wall areas.','Exterior touch-ups on trim, siding details, and weather-worn surfaces.','Prep work such as light patching, sanding, cleaning, and masking where appropriate.','Painting tasks connected to repairs, turnovers, and maintenance lists.'); when=@('A room needs touch-ups before guests, tenants, or customers see it.','A rental turnover needs small paint repairs after move-out.','Exterior trim or siding areas look worn after Bozeman weather.','You need help deciding whether the job is a small paint project or a full repaint.'); process=@('Review the surface, area size, finish expectations, and timing.','Confirm prep needs before paint is applied.','Handle painting work that fits the scope and conditions.','Point out surfaces or coatings that need a dedicated painter or specialist.'); why=@('Careful prep before fresh paint.','Useful support for repairs, turnovers, and maintenance lists.','Clear expectations around surfaces and finish quality.','Honest guidance when a larger paint crew is a better fit.'); audience=@('Homeowners call for touch-ups and smaller paint projects.','Landlords call when turnover repairs include scuffs, trim, or patched areas.','Small businesses call when customer-facing spaces need to look cleaner and more cared for.'); specialist='Large repaints, lead paint concerns, major exterior prep, specialty coatings, or work at difficult heights may need a dedicated painter or specialist.'; faq=@(@{q='Do you handle small painting jobs?';a='Yes, especially touch-ups, trim, doors, small wall areas, and painting tied to repair work.'},@{q='Can you paint exterior areas?';a='Yes, when the surface, access, weather, and project size fit handyman scope.'},@{q='Can painting be part of a turnover list?';a='Yes. Painting touch-ups often go together with wall patches, trim repairs, and cleanup.'},@{q='What affects the finish?';a='Surface condition, prep work, existing paint, weather, and lighting all affect how the final paint looks.'},@{q='When should I call a dedicated painter?';a='A large repaint, specialty finish, difficult access, or major prep work may be better handled by a painting contractor.'}) },
  @{id=6631; h1='Power Washing in Bozeman for Siding, Decks, and Walkways'; hero=@('Dirt, mildew, dust, and winter grime can make a property look more tired than it is. Power washing can help when the surface is suitable and the pressure is handled with care.','Zach''s Handyman offers power washing in Bozeman for practical cleaning around homes, rentals, and small business properties. Send photos of the area and we''ll help you decide if washing is the right step.'); jobs=@('Siding, decks, walkways, patios, and exterior surfaces where pressure washing is appropriate.','Seasonal cleaning after winter, dust, pollen, or heavy use.','Prep before painting, repairs, turnovers, or property photos.','Cleaning support for small business entries and visible exterior areas.'); when=@('A deck, walkway, or siding area looks stained or weathered.','A rental or business exterior needs to look cleaner before showings or customers arrive.','You want to clean before painting, repairs, or seasonal maintenance.','You are not sure whether pressure could damage the surface.'); process=@('Review the surface type, staining, access, and nearby areas.','Choose a practical cleaning approach for the material.','Wash suitable surfaces with care around edges, fixtures, and openings.','Stop and recommend another method if pressure could cause damage.'); why=@('Careful cleaning instead of blasting every surface the same way.','Helpful prep for repairs, painting, and maintenance work.','Practical service for homes, rentals, and small businesses.','Clear advice when washing is not the right answer.'); audience=@('Homeowners call when outdoor surfaces need seasonal cleaning.','Landlords call before showings, photos, or tenant move-in.','Small businesses call when entries, walkways, or exterior areas need a cleaner first impression.'); specialist='Fragile siding, failing paint, damaged surfaces, roof cleaning, high work, or environmental concerns may need a specialist method or different contractor.'; faq=@(@{q='What surfaces can be power washed?';a='Common surfaces include decks, walkways, patios, and some siding, depending on condition and material.'},@{q='Can pressure washing damage siding or wood?';a='Yes, if pressure is too high or the surface is weak. We check suitability before washing.'},@{q='Is power washing useful before painting?';a='Often, yes. Cleaning can help prep a surface, but paint work still depends on drying, scraping, sanding, and surface condition.'},@{q='Do you power wash rentals?';a='Yes, when the job fits the property, access, and scheduling.'},@{q='Which areas do you serve?';a='We serve Bozeman and nearby Gallatin Valley areas such as Belgrade, Four Corners, Gallatin Gateway, and Livingston where scheduling allows.'}) },
  @{id=6632; h1='Junk Removal in Bozeman for Turnovers, Cleanouts, and Repair Prep'; hero=@('Junk has a way of blocking the real work. Leftover items, project debris, old fixtures, and clutter can slow down repairs, cleaning, photos, and move-in schedules.','Zach''s Handyman helps with junk removal in Bozeman when it connects to turnovers, cleanouts, maintenance, and small project prep. Send what needs to go and we''ll help you plan the next step.'); jobs=@('Junk removal connected to rentals, turnovers, and small cleanouts.','Clearing leftover items before repairs, cleaning, painting, or photos.','Removing old fixtures, small debris, and non-hazardous clutter where appropriate.','Helping create access for maintenance or repair work.'); when=@('A tenant left items behind after move-out.','A repair or paint job cannot start until the space is cleared.','A garage, entry, office, or rental area needs practical cleanup.','You need help separating junk removal from specialist disposal needs.'); process=@('Review what needs to be removed and where it is located.','Confirm access, volume, item type, and disposal concerns.','Remove suitable items and keep the work area as tidy as possible.','Point out hazardous, oversized, or restricted items that need another solution.'); why=@('Practical cleanup tied to repair and maintenance work.','Useful help before turnovers, painting, or property photos.','Clear limits on what can and cannot be removed.','Respect for occupied properties and shared spaces.'); audience=@('Homeowners call when clutter blocks a repair or small project.','Landlords call when a turnover needs leftover items cleared.','Small businesses call when old items or debris are affecting usable space.'); specialist='Hazardous materials, large appliances, chemicals, heavy construction debris, or regulated disposal items may need a specialist hauler or approved disposal route.'; faq=@(@{q='What kinds of junk can you remove?';a='We help with non-hazardous items, small debris, leftover clutter, and cleanup connected to repairs, turnovers, and maintenance work.'},@{q='Can junk removal be part of a unit turnover?';a='Yes. It often helps clear the way for cleaning, repairs, photos, or the next tenant.'},@{q='Do you remove hazardous materials?';a='No. Hazardous or regulated materials need the correct disposal route or specialist hauler.'},@{q='Should I send photos first?';a='Yes. Photos help us understand volume, access, item type, and whether anything needs special handling.'},@{q='Do you work outside Bozeman?';a='Yes, in nearby Gallatin Valley areas where scheduling allows.'}) }
)

$selectedServiceIds = switch($PageSet) {
  'batch1' { @(6077,6626,6627) }
  'batch2' { @(6628,6629,6630) }
  'batch3' { @(6631,6632) }
  'all' { @($svcPages.id) }
  default { @() }
}

foreach($pinfo in ($svcPages | Where-Object { $selectedServiceIds -contains $_.id })) {
  UpdatePage $pinfo.id {
    param($d)
    SetTitle $d 'cd5afd7' $pinfo.h1
    SetEditor $d 'a028392' (HtmlPs $pinfo.hero)
    SetTitle $d '2390ad1' 'What We Can Help With'
    SetEditor $d 'faacfd2' (HtmlPs @(
      'Most handyman calls start with a list. Some jobs are quick fixes, and others need a little sorting before work begins.',
      'Here are common situations Zach''s Handyman can help with when the work fits normal handyman scope.'
    ))
    $icons = @('05608d4','77587c1','b8496da','959054a')
    for($i=0;$i -lt $icons.Count;$i++){ if($i -lt $pinfo.jobs.Count){ SetTitle $d $icons[$i] $pinfo.jobs[$i] } }
    SetTitle $d 'aa059ce' 'When It Makes Sense to Call a Handyman'
    SetTitle $d 'ba594ed' 'Call when the list is real, but the job does not need a full remodel.'
    SetIconList $d '1a6d842' $pinfo.when
    SetTitle $d 'cd61791' 'How Zach''s Handyman Handles the Work'
    SetTitle $d '7dce8ee' 'A clear list, a practical plan, and honest next steps.'
    SetIconList $d 'a73192f' $pinfo.process
    SetTitle $d 'e0d87c0' 'Why Bozeman Property Owners Call Zach''s'
    SetEditor $d '2f37425' (HtmlPs @(
      'People usually call because they need the work handled clearly, without a lot of back-and-forth. The goal is to understand the list, fix what makes sense, and keep the property moving.',
      'Bozeman weather, rental schedules, and busy homes can all create small repair pressure. Zach''s Handyman helps turn that pressure into a manageable plan.'
    ))
    $cards = @('b570634','050dd12','bcd0631','a5aadff')
    for($i=0;$i -lt $cards.Count;$i++){ if($i -lt $pinfo.why.Count){ SetEditor $d $cards[$i] (HtmlP $pinfo.why[$i]) } }
    SetTitle $d '3ca9b87' 'For Homes, Rentals, and Small Businesses'
    SetEditor $d '4e6cdc8' (HtmlPs $pinfo.audience)
    SetTitle $d '660de7c' 'Homes'
    SetTitle $d 'b0f4bea' 'Rentals'
    SetTitle $d 'f9504d0' 'Small Businesses'
    SetTitle $d '9b3ce5a' 'Service Areas'
    SetEditor $d 'cdc933f' (HtmlP 'We serve Bozeman, Belgrade, Four Corners, Gallatin Gateway, Livingston, and nearby Gallatin Valley areas where scheduling allows.')
    SetTitle $d 'b10d8c4' 'What May Need a Specialist'
    SetEditor $d '3eb8050' (HtmlP $pinfo.specialist)
    SetTitle $d 'bfe2683' 'FAQs'
    SetTitle $d '3501291' 'Questions People Ask Before Booking'
    SetEditor $d 'f0e1fa0' (HtmlP 'A few direct answers can save time before you call or send a repair list.')
    SetFaq $d '9b703bb' $pinfo.faq
  }
  SetRenderedHtml $pinfo.id (RenderServicePage $pinfo)
}

if($PageSet -in @('hub','all')) {
UpdatePage 6217 {
  param($d)
  SetTitle $d 'cd5afd7' 'Handyman Services in Bozeman'
  SetEditor $d 'a028392' (HtmlPs @(
    'Use this page to find the type of help you need, from small home repairs to rental turnover repairs, exterior wear, painting, power washing, and cleanup.',
    'Zach''s Handyman works in Bozeman and nearby Gallatin Valley areas where scheduling allows. If you are not sure which service fits, send the repair list and ask.'
  ))
  SetFaq $d '9b703bb' @(
    @{q='Which handyman service should I choose?';a='Start with the job that best matches your main problem. If the list covers several areas, send the full list and we will help sort it.'},
    @{q='Can one visit include more than one service?';a='Often, yes. Small repair jobs, turnover tasks, cleanup, and maintenance items can sometimes be grouped.'},
    @{q='Do you help with rentals and small businesses?';a='Yes. We help homeowners, landlords, property managers, and small business owners with practical repair and maintenance needs.'},
    @{q='What areas do you serve?';a='We serve Bozeman, Belgrade, Four Corners, Gallatin Gateway, Livingston, and nearby Gallatin Valley areas where scheduling allows.'},
    @{q='What if the job needs a specialist?';a='We will tell you. Major electrical, plumbing, structural, gas, roofing, or permitted work may need the right licensed trade.'}
  )
}
$hubBody = @"
<h2>Choose the Help That Fits the Job</h2>
<div class="grid">
<div class="card"><h3>Handyman Services</h3><p>For growing repair lists, loose fixtures, damaged trim, sticking doors, and practical home repairs.</p></div>
<div class="card"><h3>Maintenance Contracting</h3><p>For routine property maintenance and recurring repair lists around homes, rentals, and small businesses.</p></div>
<div class="card"><h3>Unit Turnovers</h3><p>For punch-list repairs, touch-ups, cleanup, and turnover tasks before the next tenant arrives.</p></div>
<div class="card"><h3>Siding Repairs</h3><p>For loose siding sections, worn trim, and exterior areas affected by wind, snow, moisture, or age.</p></div>
<div class="card"><h3>Deck Repairs</h3><p>For loose boards, worn steps, railing concerns, and outdoor wear that needs practical repair.</p></div>
<div class="card"><h3>Painting</h3><p>For interior touch-ups, exterior detail work, trim, doors, small wall areas, and paint connected to repairs.</p></div>
<div class="card"><h3>Power Washing</h3><p>For suitable siding, decks, walkways, patios, and exterior areas that need careful cleaning.</p></div>
<div class="card"><h3>Junk Removal</h3><p>For cleanouts, turnovers, repair prep, and non-hazardous clutter that is blocking the next step.</p></div>
</div>
<h2>Not Sure Where Your Job Fits?</h2>
<p>Send the repair list, photos if you have them, and the property location. We will help sort what can be handled by a handyman and what may need a specialist.</p>
<section class="cta"><h2>Send the List</h2><p>Call 406-224-0416 or email info@handymanofbozeman.com.</p></section>
"@
SetRenderedHtml 6217 (RenderShell 'Handyman Services in Bozeman' @('Use this page to find the type of help you need, from small home repairs to rental turnover repairs, exterior wear, painting, power washing, and cleanup.','Zach''s Handyman works in Bozeman and nearby Gallatin Valley areas where scheduling allows. If you are not sure which service fits, send the repair list and ask.') $hubBody)
}

Write-Output "copy-updated:$PageSet"
