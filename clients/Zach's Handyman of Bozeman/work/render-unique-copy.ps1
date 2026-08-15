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

function PageShell([string]$h1, [string[]]$intro, [string]$body) {
  $introHtml = ($intro | ForEach-Object { "<p>$_</p>" }) -join "`n"
@"
<style>
.zach-page{font-family:Arial,sans-serif;color:#222;line-height:1.65;max-width:1120px;margin:0 auto;padding:46px 20px}
.zach-page h1{font-size:clamp(34px,5vw,58px);line-height:1.08;margin:0 0 18px;color:#111}
.zach-page h2{font-size:clamp(25px,3vw,36px);line-height:1.18;margin:42px 0 14px;color:#111}
.zach-page h3{font-size:20px;margin:0 0 8px;color:#111}
.zach-page p{font-size:18px;margin:0 0 14px}.zach-page li{font-size:17px;margin:0 0 8px}
.zach-hero{background:#f6f3ef;border-left:6px solid #ff8617;padding:34px;margin-bottom:34px;border-radius:8px}
.zach-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:18px}
.zach-card{border:1px solid #e6e1da;border-radius:8px;background:#fff;padding:20px}
.zach-band{background:#171717;color:#fff;border-radius:8px;padding:28px;margin-top:42px}.zach-band h2{color:#fff;margin-top:0}.zach-band a{color:#fff;font-weight:700}
</style>
<main class="zach-page">
<section class="zach-hero"><h1>$h1</h1>$introHtml<p><strong>Call <a href="tel:+14062240416">406-224-0416</a></strong> or email <a href="mailto:info@handymanofbozeman.com">info@handymanofbozeman.com</a>.</p></section>
$body
</main>
"@
}

function Card($h,$p){ "<div class='zach-card'><h3>$h</h3><p>$p</p></div>" }
function SetPage($id, $html) {
  $body = @{ content = $html } | ConvertTo-Json -Depth 20 -Compress
  Invoke-RestMethod -Headers $headers -Uri "$site/wp-json/wp/v2/pages/$id" -Method Post -Body $body | Out-Null
}

$pages = @{}
$pages.home = @{
  id=2747
  html=PageShell 'Handyman Services in Bozeman for Repairs, Maintenance, and Small Projects' @(
    'Small repairs have a way of piling up. A loose handrail, sticking door, damaged trim, or worn deck board can sit on the list for weeks.',
    'Zach''s Handyman helps Bozeman homeowners, landlords, property managers, and small businesses sort the list, handle the practical repairs, and flag anything that needs a specialist.'
  ) @"
<h2>Common Handyman Jobs We Help With</h2>
<div class="zach-grid">
$(Card 'Repair Lists' 'Doors, trim, fixtures, shelving, hardware, small wall repairs, and other items that are annoying enough to matter but not large enough for a remodel.')
$(Card 'Rental Turnovers' 'Punch-list repairs, paint touch-ups, cleanup, and small fixes that help a unit move from move-out condition to ready-for-showing condition.')
$(Card 'Exterior Wear' 'Deck boards, railing concerns, siding sections, trim, and other outdoor items affected by Bozeman snow, wind, moisture, and regular use.')
$(Card 'Surface Prep' 'Painting touch-ups and power washing where the surface is suitable and the work fits normal handyman scope.')
</div>
<h2>How We Keep the Work Practical</h2>
<p>We start with the list. Photos help, especially for siding, decks, paint, and anything outdoors. From there, we confirm priorities, talk through access, and handle the jobs that make sense to group together.</p>
<p>If a job belongs with a licensed trade, we say so early. That saves time and keeps small repair work from turning into guesswork.</p>
<h2>For Homes, Rentals, and Small Businesses</h2>
<p>Homeowners usually call when the weekend repair list has stopped being realistic. Landlords and property managers call when small repairs are holding up a turnover or creating repeat tenant calls. Small businesses call when a repair affects how the space looks or works.</p>
<h2>Service Areas</h2>
<p>We serve Bozeman, Belgrade, Four Corners, Gallatin Gateway, Livingston, and nearby Gallatin Valley areas where scheduling allows.</p>
<section class="zach-band"><h2>Send Your Repair List</h2><p>Call Zach''s Handyman to talk through the work, or send photos and details so we can help you plan the next step.</p></section>
"@
}

$pages.hub = @{
  id=6217
  html=PageShell 'Handyman Services in Bozeman' @(
    'This page is the quick route to the right kind of help. Some jobs are simple repairs, some are turnover punch lists, and some need a specialist before anyone starts.',
    'Choose the service that best matches the problem. If your list crosses a few categories, send the whole thing and we will help sort it.'
  ) @"
<h2>Find the Right Service</h2>
<div class="zach-grid">
$(Card 'Handyman Repairs' 'A good fit for mixed repair lists, loose fixtures, doors, trim, hardware, shelving, and practical fixes around the property.')
$(Card 'Maintenance Contracting' 'Useful when a property has repeat repair items, regular checks, tenant follow-up, or seasonal wear that needs steady attention.')
$(Card 'Unit Turnovers' 'Focused on move-out damage, touch-ups, leftover items, and punch-list repairs that can slow down cleaning, photos, or move-in.')
$(Card 'Siding and Deck Repairs' 'Exterior help for visible wear, loose sections, boards, railings, trim, and outdoor areas affected by Gallatin Valley weather.')
$(Card 'Painting and Power Washing' 'Surface-focused help for touch-ups, prep, grime, winter residue, and areas that need to look cared for again.')
$(Card 'Junk Removal' 'Cleanup support when leftover items or clutter are blocking repairs, turnovers, property photos, or usable space.')
</div>
<h2>When One List Covers Several Jobs</h2>
<p>You do not need to split the request perfectly. Send the list, photos if available, and the property location. We will help separate handyman work from anything that needs a licensed specialist.</p>
<h2>Service Areas</h2>
<p>Zach''s Handyman serves Bozeman, Belgrade, Four Corners, Gallatin Gateway, Livingston, and nearby Gallatin Valley areas where scheduling allows.</p>
<section class="zach-band"><h2>Not Sure Which Page Fits?</h2><p>Call 406-224-0416 or send the repair list to info@handymanofbozeman.com.</p></section>
"@
}

$pages.handyman = @{
  id=6077
  html=PageShell 'Handyman Services in Bozeman for Repairs, Maintenance, and Small Projects' @(
    'A repair list usually starts with one small thing. Then a loose handle, a sticking door, a damaged corner, and a worn deck board get added.',
    'Zach''s Handyman helps Bozeman property owners turn that mixed list into practical next steps.'
  ) @"
<h2>Common Repair Lists We See</h2>
<ul><li>Loose fixtures, doors, trim, shelves, and hardware.</li><li>Small wall repairs, paint touch-ups, and surface prep.</li><li>Deck, siding, and exterior trim items that need attention.</li><li>Rental punch-list items after move-out or inspection.</li></ul>
<h2>Why a Handyman Makes Sense Here</h2>
<p>These jobs often do not need a full contractor. They need someone who can look at the whole list, group the work sensibly, and explain what can be handled in one visit.</p>
<p>That is especially useful for landlords, property managers, and busy homeowners who do not want to coordinate five different small calls.</p>
<h2>How the Visit Usually Starts</h2>
<p>Send the list first. Photos help us understand materials, access, height, and whether the job fits handyman scope. We then confirm priorities and point out any items that should go to a licensed specialist.</p>
<h2>FAQs</h2><div class="zach-grid">$(Card 'Can I send several small jobs?' 'Yes. A full list helps us group the work and avoid missing the item that matters most.')$(Card 'What should I include?' 'Send photos, the property location, access notes, and whether any item is urgent.')$(Card 'What may need a specialist?' 'Major electrical, plumbing, structural, gas, roofing, or permitted work may need a licensed trade.')</div>
<section class="zach-band"><h2>Ready to Sort the List?</h2><p>Call 406-224-0416 or email your repair list and photos.</p></section>
"@
}

$pages.maintenance = @{
  id=6626
  html=PageShell 'Maintenance Contracting in Bozeman for Properties That Need Regular Attention' @(
    'Maintenance work is rarely one dramatic problem. It is usually a steady list of small repairs, tenant notes, weather wear, and things that need follow-up.',
    'Zach''s Handyman helps keep those lists moving for Bozeman homes, rentals, offices, and small business spaces.'
  ) @"
<h2>What Maintenance Contracting Can Cover</h2>
<ul><li>Recurring repair lists for rentals and managed properties.</li><li>Hardware, trim, door, shelving, fixture, and small wall repairs.</li><li>Seasonal checks after snow, wind, moisture, or heavy use.</li><li>Follow-up items from inspections, tenant reports, or property walks.</li></ul>
<h2>Why Regular Attention Helps</h2>
<p>Small issues are easier to manage before tenants report them repeatedly or customers start noticing them. A damaged trim piece, loose fixture, or worn exterior area can often be handled before it becomes a bigger repair.</p>
<h2>How We Work Through a Maintenance List</h2>
<p>We group related tasks, confirm access, and agree on the most important items first. If something looks bigger than normal handyman scope, we flag it instead of forcing the wrong repair.</p>
<h2>Good Fits for This Service</h2><div class="zach-grid">$(Card 'Property Managers' 'Useful for repair follow-up, routine lists, and tenant-reported items that need practical handling.')$(Card 'Landlords' 'Helpful when small issues keep appearing between turnovers or inspections.')$(Card 'Small Businesses' 'Good for customer-facing spaces where little repairs can make the property look neglected.')</div>
<section class="zach-band"><h2>Send the Maintenance List</h2><p>Include photos, access notes, and any timing concerns so we can help prioritise the work.</p></section>
"@
}

$pages.turnovers = @{
  id=6627
  html=PageShell 'Unit Turnover Repairs in Bozeman for Rentals, Apartments, and Offices' @(
    'Turnovers can stall over small things. A damaged door stop, scuffed wall, loose shelf, leftover junk, or missing trim piece can delay cleaning, photos, or move-in.',
    'Zach''s Handyman helps with practical unit turnover repairs in Bozeman and nearby Gallatin Valley areas.'
  ) @"
<h2>Turnover Items That Slow Things Down</h2>
<ul><li>Move-out punch-list repairs after a tenant leaves.</li><li>Door, trim, wall, hardware, shelf, and fixture issues.</li><li>Paint touch-ups and patching tied to ordinary turnover work.</li><li>Cleanup and junk removal that clears the way for cleaners or photos.</li></ul>
<h2>Why Turnover Work Needs Clear Priorities</h2>
<p>Not every item blocks move-in. Some repairs affect safety, some affect photos, and some can wait. We help separate the urgent items from the nice-to-fix items so the unit can move forward.</p>
<h2>Working With Landlords and Property Managers</h2>
<p>A clear punch list, photos, and access instructions make the visit smoother. We can work through practical repairs and point out specialist items before they hold up the schedule.</p>
<h2>FAQs</h2><div class="zach-grid">$(Card 'Can you work from a punch list?' 'Yes. A written list with photos is the best starting point.')$(Card 'Can junk removal be included?' 'Yes, when it is part of turnover cleanup or repair prep.')$(Card 'What if the list includes plumbing or electrical?' 'We will separate those items so the right licensed trade can handle them.')</div>
<section class="zach-band"><h2>Have a Unit to Turn?</h2><p>Send the punch list and the target timing, and we will help plan the next step.</p></section>
"@
}

$pages.siding = @{
  id=6628
  html=PageShell 'Siding Repairs in Bozeman for Weather-Worn Exterior Areas' @(
    'Siding damage is easy to ignore until wind, moisture, or temperature swings make it worse. Loose sections and damaged trim can also make a property look uncared for.',
    'Zach''s Handyman helps with siding repairs in Bozeman when the work fits normal handyman scope.'
  ) @"
<h2>Common Siding Problems</h2>
<ul><li>Loose or damaged siding sections.</li><li>Exterior trim that has pulled away, cracked, or worn down.</li><li>Small impact damage near entries, decks, or high-use areas.</li><li>Weather-worn spots that need repair before paint or cleaning.</li></ul>
<h2>Bozeman Weather Matters</h2>
<p>Snow, wind, sun, and moisture can all show up on exterior surfaces. A small loose area may stay small, or it may let water and movement make the problem worse.</p>
<h2>When We Recommend a Specialist</h2>
<p>Large replacement work, hidden water damage, roofing leaks, structural issues, or permitted exterior work may need a specialist. We will tell you if the repair is beyond handyman scope.</p>
<h2>Before You Call</h2>
<p>Photos are especially useful for siding. Include a close-up, a wider shot, and any notes about height or access.</p>
<section class="zach-band"><h2>Send Siding Photos</h2><p>Email photos of the damaged area and we will help you decide the next step.</p></section>
"@
}

$pages.deck = @{
  id=6629
  html=PageShell 'Deck Repairs in Bozeman for Loose Boards, Railings, and Outdoor Wear' @(
    'Deck repairs often start with something you can feel underfoot. A board flexes, a step feels tired, or a railing does not feel as solid as it should.',
    'Zach''s Handyman helps with practical deck repairs in Bozeman when the structure and scope fit handyman work.'
  ) @"
<h2>Deck Issues Worth Checking</h2>
<ul><li>Loose boards, worn steps, and small surface repairs.</li><li>Railing hardware, trim, or visible wear that needs attention.</li><li>Weathered areas after snow, moisture, sun, or heavy use.</li><li>Prep work before cleaning, staining, painting, or a larger repair.</li></ul>
<h2>Safety Comes First</h2>
<p>A loose board is one thing. A structural problem is another. We look for the difference and will not treat support, ledger, code, or permit concerns as simple handyman repairs.</p>
<h2>Good Times to Call</h2>
<p>Call before regular summer use, before listing a rental, after a winter season, or when an inspection notes deck concerns. Photos help us understand height, access, material, and the size of the repair.</p>
<h2>FAQs</h2><div class="zach-grid">$(Card 'Can you replace loose boards?' 'Often, yes, if the surrounding structure is sound and the repair is practical.')$(Card 'Does weather affect timing?' 'Yes. Moisture, temperature, and snow can affect materials and finish work.')$(Card 'What needs a deck contractor?' 'Major support work, rebuilds, ledger issues, or code-related railing work may need a specialist.')</div>
<section class="zach-band"><h2>Need a Deck Checked?</h2><p>Send photos of the boards, steps, or railing area and include the property location.</p></section>
"@
}

$pages.painting = @{
  id=6630
  html=PageShell 'Interior and Exterior Painting Help in Bozeman' @(
    'Painting is not only about putting colour on a surface. The prep, patching, sanding, masking, and surface condition decide how the finished work looks.',
    'Zach''s Handyman helps with painting tasks tied to repairs, turnovers, maintenance lists, and smaller projects.'
  ) @"
<h2>Painting Jobs That Fit Handyman Scope</h2>
<ul><li>Interior touch-ups, doors, trim, and small wall areas.</li><li>Exterior trim or siding details where access and weather are suitable.</li><li>Painting after wall patches, repair work, or turnover damage.</li><li>Prep work such as light sanding, cleaning, masking, and small repairs.</li></ul>
<h2>Prep Makes the Difference</h2>
<p>Fresh paint over a bad surface rarely solves the problem. We look at scuffs, patched areas, existing paint, moisture, and the finish you expect before starting.</p>
<h2>When a Painting Contractor Is Better</h2>
<p>Large repaints, difficult heights, lead paint concerns, specialty coatings, or heavy exterior prep may need a dedicated painter. Smaller paint work connected to repairs is usually a better fit here.</p>
<h2>For Rentals and Businesses</h2>
<p>Touch-ups can matter before photos, showings, inspections, or customer visits. We can help with the practical paint items that keep a space looking cared for.</p>
<section class="zach-band"><h2>Send the Area You Want Painted</h2><p>Include photos, surface details, and whether the paint work is tied to a repair or turnover.</p></section>
"@
}

$pages.power = @{
  id=6631
  html=PageShell 'Power Washing in Bozeman for Siding, Decks, and Walkways' @(
    'Dirt, winter grime, dust, and mildew can make a property look older than it is. Power washing can help, but only when the surface is suitable.',
    'Zach''s Handyman offers power washing in Bozeman for practical cleaning around homes, rentals, and small business properties.'
  ) @"
<h2>Surfaces We May Be Able to Clean</h2>
<ul><li>Decks, walkways, patios, and entry areas.</li><li>Some siding surfaces, depending on material and condition.</li><li>Exterior areas before painting, repair work, or property photos.</li><li>Small business entries where first impressions matter.</li></ul>
<h2>Pressure Is Not Always the Answer</h2>
<p>Too much pressure can damage wood, weak siding, failing paint, and older surfaces. We check whether washing makes sense before treating every surface the same way.</p>
<h2>Seasonal Cleaning in Gallatin Valley</h2>
<p>Snow, dust, pollen, foot traffic, and outdoor storage can all leave marks. A careful wash can make a walkway, deck, or entry feel cleaner before the busy season.</p>
<h2>What May Need Another Method</h2>
<p>Fragile surfaces, roof cleaning, high work, damaged materials, or environmental concerns may need a specialist method or different contractor.</p>
<section class="zach-band"><h2>Ask Before You Wash</h2><p>Send photos of the surface and we will help decide whether power washing is a sensible next step.</p></section>
"@
}

$pages.junk = @{
  id=6632
  html=PageShell 'Junk Removal in Bozeman for Turnovers, Cleanouts, and Repair Prep' @(
    'Junk removal is often the step before the real work starts. Leftover items, old fixtures, small debris, and clutter can block repairs, cleaning, photos, and move-in schedules.',
    'Zach''s Handyman helps with junk removal in Bozeman when it connects to turnovers, cleanouts, maintenance, and small project prep.'
  ) @"
<h2>Common Junk Removal Situations</h2>
<ul><li>Left-behind tenant items after move-out.</li><li>Clutter that blocks repair, cleaning, painting, or photos.</li><li>Small project debris and old non-hazardous materials.</li><li>Garage, entry, office, or rental areas that need practical clearing.</li></ul>
<h2>Why Cleanup Helps the Rest of the Job</h2>
<p>Repairs go faster when the work area is accessible. Clearing the space can also make it easier to see damage, prep surfaces, and hand the property to cleaners or the next tenant.</p>
<h2>What We Need to Know First</h2>
<p>Photos help with volume, access, stairs, parking, and item type. Let us know if anything is heavy, sharp, wet, restricted, or likely to need special disposal.</p>
<h2>What We Do Not Remove</h2>
<p>Hazardous materials, chemicals, large appliances, heavy construction debris, or regulated disposal items may need a specialist hauler or approved disposal route.</p>
<section class="zach-band"><h2>Need Space Cleared?</h2><p>Send photos of what needs to go, where it is located, and when the space needs to be ready.</p></section>
"@
}

$sets = @{
  home=@('home'); hub=@('hub'); batch1=@('handyman','maintenance','turnovers'); batch2=@('siding','deck','painting'); batch3=@('power','junk')
}
$keys = if($PageSet -eq 'all') { @('home','hub','handyman','maintenance','turnovers','siding','deck','painting','power','junk') } else { $sets[$PageSet] }
foreach($key in $keys){ SetPage $pages[$key].id $pages[$key].html; Write-Output "updated:$key" }
