# Local-Service Schema Patterns

## Type Selection

Use the narrowest truthful type, not the most keyword-rich type.

| Situation | Preferred type |
|---|---|
| Business identity without a confirmed public premises | `Organization` or truthful service-business subtype |
| Confirmed customer-facing local premises | `LocalBusiness` or a truthful subtype |
| Published service page | `Service` linked to the provider |
| Services directory | `CollectionPage` plus `ItemList` |
| Service-area directory | `CollectionPage` plus `ItemList`/`Place` |
| Real staffed branch page | Branch `LocalBusiness` only with verified branch facts |
| Advice article | `Article` or `BlogPosting` |
| Visible question-and-answer section | `FAQPage` |

Do not use `Electrician`, `GeneralContractor`, or another regulated/narrow subtype until the client facts support it.

## Minimum Useful Properties

### Business

- `@id`, `@type`, `name`, `url`, `logo`
- `telephone`, `email`, `description` when verified
- `address`, `geo`, `openingHoursSpecification` only when verified
- `areaServed`
- `sameAs` only for verified official profiles

### Service

- `@id`, `@type`, `name`, `description`, `url`
- `provider` referencing the business `@id`
- `serviceType`, `areaServed`, `image` when supported by the visible page

### FAQ

- `@id`, `@type: FAQPage`
- `mainEntity` containing `Question` and accepted `Answer`
- Wording materially identical to the visible FAQ

### Article

- `headline`, `datePublished`, `dateModified`
- `author`, `publisher`, `image`, `mainEntityOfPage`

## Common Failure Conditions

- Duplicate Organisation/LocalBusiness entities with different IDs
- Previous-client name, logo, phone, URL or social profiles
- LocalBusiness without a truthful address
- Multiple fake branches for service areas
- Service schema disconnected from the main provider
- FAQ schema that is hidden or differs from visible copy
- Aggregate ratings without approved visible evidence
- Conflicting canonical URLs
- Elementor and Yoast both outputting the same FAQ entity

## Search Feature Reality

- Valid schema can improve machine readability and eligibility; it does not guarantee rankings or AI citations.
- `Service` is useful vocabulary even without a dedicated Google rich result.
- FAQ rich-result visibility is restricted, but truthful FAQ schema can still describe visible content.
- Self-serving LocalBusiness/Organisation review markup may not produce review stars.

## Official References

- Schema.org LocalBusiness: https://schema.org/LocalBusiness
- Schema.org Service: https://schema.org/Service
- Schema.org FAQPage: https://schema.org/FAQPage
- Google structured data: https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data
- Google Local Business: https://developers.google.com/search/docs/appearance/structured-data/local-business
- Google FAQ: https://developers.google.com/search/docs/appearance/structured-data/faqpage
- Google review snippets: https://developers.google.com/search/docs/appearance/structured-data/review-snippet
- Yoast Schema API: https://developer.yoast.com/features/schema/api/

