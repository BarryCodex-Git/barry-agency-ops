# Solar Repair Pros Schema Plan

Status: planning; build-time schema standard added after the initial design build

## Canonical Entities

- Business `@id`: `https://dev2.mynewwebsite.co.za/#organization`
- Website `@id`: `https://dev2.mynewwebsite.co.za/#website`
- Truthful business type: pending confirmation; do not assume `Electrician`
- Public address status: not supplied
- Service-area business: Dallas-Fort Worth, Texas

## Verified Business Facts

- Name: Solar Repair Pros
- URL: https://dev2.mynewwebsite.co.za/
- Logo: Solar Repair Pros supplied logo
- Phone: 804-928-2768
- Email: info@solarrepairdfw.com
- Address: N/A unless supplied
- Geo: N/A unless supplied
- Opening hours: N/A unless supplied
- Google Business Profile: N/A unless supplied
- Official social profiles: N/A unless supplied
- Approved review source: N/A unless supplied

## Page Schema Map

| Page group | Planned types | Status |
|---|---|---|
| Home | WebPage, WebSite, canonical business entity | needs correction; inherited H2O entity detected |
| Services hub | CollectionPage, ItemList/service catalogue | pending audit/injection |
| Service Areas hub | CollectionPage, ItemList/Place, areaServed | pending audit/injection |
| Five service pages | WebPage, Service, optional matching FAQPage | pending audit/injection |
| Blog | Blog/CollectionPage relationship | pending audit |
| Three starter posts | Article/BlogPosting | Yoast output present; inherited social/schema residue requires audit |

## Maintenance Notes

- Correct Yoast Site Representation before extending the graph.
- Reuse the canonical business `@id` across all provider/publisher references.
- Omit address, geo, hours, profiles and ratings until verified.
- Validate visible FAQs before adding FAQPage schema.
