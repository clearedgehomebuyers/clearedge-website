# ClearEdge Home Buyers — Comprehensive Website Audit Prompt

**Site:** https://www.clearedgehomebuyers.com
**Total Pages:** 67+ (15 static + 21 location + 9 situation + 22+ blog posts)
**Date Generated:** March 6, 2026

---

## INSTRUCTIONS FOR THE AUDITOR

You will audit every page of the ClearEdge Home Buyers website by visiting each URL in a browser. For **every page**, document the following:

1. **Layout & Structure** — Header, hero section, body content sections, sidebar elements, footer
2. **Content & Messaging** — H1 tag, key headlines, body copy quality, calls to action, tone/voice consistency
3. **CTAs & Forms** — Every button, link, and form on the page. Note what action each triggers (scroll to form, phone call, SMS, navigation, etc.)
4. **SEO & Technical** — Title tag, meta description, canonical URL, Open Graph tags, structured data/schema, image alt text, internal/external links
5. **Media** — All images, videos, embedded content. Note loading behavior (lazy load, etc.)
6. **Mobile Responsiveness** — Test each page on mobile viewport. Note any layout issues.
7. **Performance** — Page load speed, any visible jank, CLS issues, slow-loading elements
8. **Issues Found** — Broken links, missing images, typos, inconsistencies, accessibility problems

---

## PHASE 1: GLOBAL ELEMENTS (Check on Every Page)

### 1A. Header Navigation
The header appears on every page. Verify:
- **Logo** — ClearEdge logo links to homepage, displays correctly
- **Phone Number** — Dynamic click-to-call link in header (number changes by traffic source: SEO = (610) 904-8526, Direct = (610) 628-0671, SMS = (610) 379-1453)
- **Desktop Nav Dropdowns:**
  - "Locations" mega-dropdown with 3 regional groups:
    - **NEPA:** Hub + Scranton, Wilkes-Barre, Hazleton, Pittston, Kingston, Nanticoke, Carbondale, Dunmore, Honesdale, Bloomsburg
    - **Lehigh Valley:** Hub + Allentown, Bethlehem, Easton, Reading, Pottsville
    - **Poconos:** Hub + Stroudsburg, East Stroudsburg, Pocono Pines, Tannersville
  - "Situations" dropdown: Foreclosure, Inherited Property, Divorce, Job Relocation, Tired Landlord, Vacant Property, Major Repairs, Tax Liens & Code Violations, Foundation & Structural Issues
  - "Resources" dropdown: Sale Calculator, Cash Buyer vs. Realtor, Are Cash Buyers Legit?, Blog & Guides
- **Mobile Menu** — Hamburger menu with all the same links
- **"Get My Cash Offer" CTA button** — Scrolls to lead form section

### 1B. Footer
The footer appears on every page. Verify:
- **Quick Links:** How It Works, About, Contact, Blog & Guides, Sale Calculator, Cash Buyer vs. Realtor
- **Situations column:** All 9 situation page links
- **Service Areas:** 3 regional groups with hub + city links (same as header)
- **Contact Info:** Phone number (dynamic), email (info@clearedgehomebuyers.com), address
- **Social Links:** Facebook, Instagram, YouTube, Google Maps
- **Legal Links:** Privacy Policy, Terms and Conditions
- **Copyright notice**

### 1C. Floating Text Button (Mobile Only)
- Green floating SMS button fixed at bottom-right on mobile
- Links to `sms:{dynamic_phone_number}`
- Fires `click_to_text` GA4 event

### 1D. Global Integrations
- **Google Analytics 4:** Tracking ID `G-1H6CPZVB8D` (production only)
- **WebSite Schema (JSON-LD):** On every page via root layout
- **Traffic Source Provider:** Detects SEO vs Direct vs SMS traffic, sets dynamic phone numbers and Zapier webhook URLs
- **Google Places Autocomplete:** On address fields in lead forms
- **Zapier Webhooks:** 3 webhooks (SEO, Direct, SMS) for form submissions
- **Sanity CMS:** Powers location pages, situation pages, and blog posts

---

## PHASE 2: HOMEPAGE

### Page 1: Homepage
**URL:** https://www.clearedgehomebuyers.com
**Title:** Cash Home Buyers in Pennsylvania | Fair Offer in 24 Hours | ClearEdge
**Meta Description:** PA cash home buyers who actually close. Fair offer in 24 hours, close in 7-30 days. No repairs, no fees, no commissions. Serving NEPA, Lehigh Valley & Poconos.
**Canonical:** https://www.clearedgehomebuyers.com
**OG Image:** https://www.clearedgehomebuyers.com/og-image.png
**Schema:** WebSite (global), LocalBusinessSchema, FAQSchema

**Sections to verify (in order):**
1. **V0Header** — Sticky navigation
2. **V0Hero** — Hero section with property photo, headline, sub-headline, CTA
3. **SocialProofWall** — Social proof / trust indicators
4. **V0LeadForm** — 5-step multi-step lead form (id="lead-form")
5. **V0ProblemSolutionMerged** — Problem/solution content section
6. **V0HowItWorks** — 3-step process explanation
7. **V0ComparisonMerged** — Cash buyer vs traditional sale comparison table
8. **V0VideoSection** — YouTube video embed (Video ID: YS6uDgxIjiI)
9. **V0Testimonials** — Customer testimonials/reviews
10. **V0FAQ** — FAQ accordion section
11. **V0ServiceAreas** — Service areas grid with location links
12. **V0Footer** — Full footer

**CTAs to verify:**
- Hero CTA → scrolls to #lead-form
- All "Get My Cash Offer" buttons → scroll to #lead-form
- Phone number links → tel: dynamic number
- Service area links → respective location pages

---

## PHASE 3: CORE PAGES (6 Pages)

### Page 2: How It Works
**URL:** https://www.clearedgehomebuyers.com/how-it-works
**Title:** How We Buy Houses for Cash in PA | 3-Step Process | ClearEdge
**Meta Description:** See how ClearEdge buys PA houses for cash: Tell us about your property, get a fair offer in 24 hours, close in 7-30 days. No repairs, no fees, no commissions.
**Canonical:** https://www.clearedgehomebuyers.com/how-it-works
**Components:** V0Header, V0LeadForm, V0Footer, LiteYouTube (Video ID: YS6uDgxIjiI)
**Verify:** 3-step process content, video embed, lead form, FAQ section

### Page 3: About
**URL:** https://www.clearedgehomebuyers.com/about
**Title:** About ClearEdge Home Buyers | PA Cash Home Buyers Since 2016
**Meta Description:** Meet Tyler and the ClearEdge team — family-owned PA cash home buyers. 200+ homes purchased since 2016 across Scranton, Allentown & 21 markets.
**Canonical:** https://www.clearedgehomebuyers.com/about
**Components:** V0Header, V0Footer, LiteYouTube (Video ID: YS6uDgxIjiI)
**Verify:** Team/Tyler bio, company story, trust signals, video embed, images (tyler.jpg)

### Page 4: Testimonials
**URL:** https://www.clearedgehomebuyers.com/testimonials
**Title:** ClearEdge Home Buyers Reviews | Real PA Homeowner Testimonials
**Meta Description:** Verified Google reviews from PA homeowners who sold to ClearEdge. Inherited homes, foreclosure, fast closings — real stories from real sellers.
**Canonical:** https://www.clearedgehomebuyers.com/testimonials
**Components:** V0Header, V0Footer, SocialProofWall
**Schema:** AggregateRating (5.0, 6 reviews) in LocalBusiness
**Verify:** All review cards, star ratings, reviewer names, Google review links

### Page 5: Contact
**URL:** https://www.clearedgehomebuyers.com/contact
**Title:** Contact ClearEdge Home Buyers | Talk to Tyler Directly
**Meta Description:** Contact ClearEdge for a fair cash offer on your PA home. Call Tyler at (610) 904-8526 or fill out our form. Response within 24 hours, no obligation.
**Canonical:** https://www.clearedgehomebuyers.com/contact
**Components:** V0Header, ContactForm, V0Footer
**Form fields:** First Name, Last Name, Email, Phone, Message, Terms consent checkbox, SMS consent checkbox
**Verify:** Form submission to Zapier webhook, GA4 generate_lead event, success/error states, phone validation

### Page 6: Calculator (Home Sale Calculator)
**URL:** https://www.clearedgehomebuyers.com/calculator
**Title:** Home Sale Calculator — Compare Net Proceeds | ClearEdge Home Buyers
**Meta Description:** Free PA home sale calculator. Compare net proceeds: traditional sale vs. cash offer with county-specific closing costs and real contractor repair pricing.
**Canonical:** https://www.clearedgehomebuyers.com/calculator
**Components:** V0Header, Calculator, V0LeadForm, V0FAQ, V0Footer
**Verify:** Calculator inputs/outputs work correctly, comparison visualization, FAQ section, lead form

### Page 7: Cash Buyer vs Realtor
**URL:** https://www.clearedgehomebuyers.com/cash-buyer-vs-realtor
**Title:** Cash Buyer vs Realtor: Which Nets You More in PA? (2026 Math)
**Meta Description:** Sell your PA house to a cash buyer or list with a realtor? Side-by-side 2026 math from a local buyer — honest about when we're NOT your best option.
**Canonical:** https://www.clearedgehomebuyers.com/cash-buyer-vs-realtor
**Components:** V0Header, V0Footer
**Verify:** Comparison content, tables/visuals, CTAs

### Page 8: Are Cash Home Buyers Legit?
**URL:** https://www.clearedgehomebuyers.com/are-cash-home-buyers-legit
**Title:** Are Cash Home Buyers Legit? 8 Red Flags to Watch (2026 PA Guide)
**Meta Description:** Are cash home buyers legit or a scam? A PA cash buyer with 200+ purchases explains the 8 red flags and what to look for before you sell your house.
**Canonical:** https://www.clearedgehomebuyers.com/are-cash-home-buyers-legit
**Components:** V0Header, V0Footer
**Verify:** 8 red flags content, trust-building elements, CTAs

---

## PHASE 4: REGIONAL HUB PAGES (3 Pages)

### Page 9: NEPA Regional Hub
**URL:** https://www.clearedgehomebuyers.com/locations/nepa
**Title:** Cash Home Buyers in NEPA | Fair Offer in 24 Hours | ClearEdge
**Meta Description:** Cash home buyers in NEPA. ClearEdge buys houses as-is across Scranton, Wilkes-Barre, Hazleton & more. No fees, no repairs, close in 7-30 days.
**Components:** V0Header, RegionalHubPage, RegionalCoverageMap, V0LeadForm, V0Footer
**Verify:** Overview content (4 paragraphs about NEPA market), city cards linking to 10 city pages, situation cards, FAQ accordion, coverage map, lead form

### Page 10: Lehigh Valley Regional Hub
**URL:** https://www.clearedgehomebuyers.com/locations/lehigh-valley
**Title:** Cash Home Buyers in Lehigh Valley | Fair Offer in 24 Hours | ClearEdge
**Meta Description:** Cash home buyers in the Lehigh Valley. ClearEdge buys houses as-is in Allentown, Bethlehem, Easton & more. No fees, no repairs, close in 7-30 days.
**Components:** V0Header, RegionalHubPage, RegionalCoverageMap, V0LeadForm, V0Footer
**Verify:** Overview content, city cards linking to 5 city pages, situation cards, FAQ accordion, coverage map, lead form

### Page 11: Poconos Regional Hub
**URL:** https://www.clearedgehomebuyers.com/locations/poconos
**Title:** Cash Home Buyers in the Poconos | Fair Offer in 24 Hours | ClearEdge
**Meta Description:** Cash home buyers in the Poconos. ClearEdge buys cabins, A-frames, lakefront homes & vacation properties as-is. No fees, no repairs. Close in 7-30 days.
**Components:** V0Header, RegionalHubPage, RegionalCoverageMap, V0LeadForm, V0Footer
**Verify:** Overview content, city cards linking to 4 city pages, situation cards, FAQ accordion, coverage map, lead form

---

## PHASE 5: LOCATION/CITY PAGES (19 Pages — Sanity CMS Driven)

Each location page has the same template. Verify for each:
- Hero section with property photo, city name, headline
- LocalBusiness Schema + FAQSchema (JSON-LD)
- Dynamic metadata from Sanity CMS (metaTitle, metaDescription)
- Canonical URL
- FAQ accordion (LocationFAQAccordion)
- Location map (LocationMapWrapper)
- Lead form (V0LeadForm)
- Internal links to hub page and related blog posts
- CTA buttons scrolling to #lead-form
- Dynamic phone number links

### NEPA Cities (10 pages):
| # | Page | URL |
|---|------|-----|
| 12 | Scranton | https://www.clearedgehomebuyers.com/locations/scranton |
| 13 | Wilkes-Barre | https://www.clearedgehomebuyers.com/locations/wilkes-barre |
| 14 | Hazleton | https://www.clearedgehomebuyers.com/locations/hazleton |
| 15 | Pittston | https://www.clearedgehomebuyers.com/locations/pittston |
| 16 | Kingston | https://www.clearedgehomebuyers.com/locations/kingston |
| 17 | Nanticoke | https://www.clearedgehomebuyers.com/locations/nanticoke |
| 18 | Carbondale | https://www.clearedgehomebuyers.com/locations/carbondale |
| 19 | Dunmore | https://www.clearedgehomebuyers.com/locations/dunmore |
| 20 | Honesdale | https://www.clearedgehomebuyers.com/locations/honesdale |
| 21 | Bloomsburg | https://www.clearedgehomebuyers.com/locations/bloomsburg |

### Lehigh Valley Cities (5 pages):
| # | Page | URL |
|---|------|-----|
| 22 | Allentown | https://www.clearedgehomebuyers.com/locations/allentown |
| 23 | Bethlehem | https://www.clearedgehomebuyers.com/locations/bethlehem |
| 24 | Easton | https://www.clearedgehomebuyers.com/locations/easton |
| 25 | Reading | https://www.clearedgehomebuyers.com/locations/reading |
| 26 | Pottsville | https://www.clearedgehomebuyers.com/locations/pottsville |

### Poconos Cities (4 pages):
| # | Page | URL |
|---|------|-----|
| 27 | Stroudsburg | https://www.clearedgehomebuyers.com/locations/stroudsburg |
| 28 | East Stroudsburg | https://www.clearedgehomebuyers.com/locations/east-stroudsburg |
| 29 | Pocono Pines | https://www.clearedgehomebuyers.com/locations/pocono-pines |
| 30 | Tannersville | https://www.clearedgehomebuyers.com/locations/tannersville |

**Hero photos by location:**
- Photo 1 (Scranton property): Scranton, Stroudsburg, Pittston, Bloomsburg, Reading
- Photo 2 (Wilkes-Barre property): Wilkes-Barre, East Stroudsburg, Kingston, Lehigh Valley
- Photo 3 (Allentown property): Allentown, Hazleton, Dunmore, Poconos
- Photo 4 (Bethlehem/Lehigh Valley property): Bethlehem, Pottsville, Nanticoke, Pocono Pines
- Photo 5 (NEPA distressed property): Easton, Carbondale, Honesdale, Tannersville

---

## PHASE 6: SITUATION PAGES (9 Pages — Sanity CMS Driven)

Each situation page has the same template. Verify for each:
- Hero section with property photo and situation-specific headline
- LocalBusiness Schema + FAQSchema (JSON-LD)
- Dynamic metadata from Sanity CMS
- Answer-First Summary box (question + answer for AI/featured snippets)
- Situation-specific body content (Portable Text from Sanity)
- FAQ accordion (SituationFAQAccordion)
- Lead form (V0LeadForm)
- CTA buttons scrolling to #lead-form
- Internal links to related blog posts
- Dynamic phone number links

| # | Page | URL |
|---|------|-----|
| 31 | Foreclosure | https://www.clearedgehomebuyers.com/situations/foreclosure |
| 32 | Inherited Property | https://www.clearedgehomebuyers.com/situations/inherited-property |
| 33 | Divorce | https://www.clearedgehomebuyers.com/situations/divorce |
| 34 | Job Relocation | https://www.clearedgehomebuyers.com/situations/job-relocation |
| 35 | Tired Landlord | https://www.clearedgehomebuyers.com/situations/tired-landlord |
| 36 | Vacant Property | https://www.clearedgehomebuyers.com/situations/vacant-property |
| 37 | Major Repairs | https://www.clearedgehomebuyers.com/situations/major-repairs |
| 38 | Tax Liens & Code Violations | https://www.clearedgehomebuyers.com/situations/tax-liens-code-violations |
| 39 | Foundation & Structural Issues | https://www.clearedgehomebuyers.com/situations/foundation-structural-issues |

**Hero photos by situation:**
- Foreclosure, Major Repairs → Allentown property photo
- Inherited Property, Tax Liens → Wilkes-Barre property photo
- Divorce, Tired Landlord → Lehigh Valley/Bethlehem property photo
- Job Relocation, Vacant Property → NEPA distressed property photo
- Foundation & Structural Issues → Wilkes-Barre property photo

---

## PHASE 7: BLOG INDEX + BLOG POSTS (22+ Pages — Sanity CMS Driven)

### Page 40: Blog Index
**URL:** https://www.clearedgehomebuyers.com/blog
**Title:** PA Home Selling Guides | Cash Sale Tips & 2026 Laws | ClearEdge
**Meta Description:** No-fluff guides for PA homeowners navigating foreclosure, probate, inherited property, and fast cash sales. From direct experience buying 200+ homes.
**Canonical:** https://www.clearedgehomebuyers.com/blog
**Components:** V0Header, BlogPostsGrid, V0Footer
**Verify:** Grid of blog post cards with featured images, titles, excerpts, publish dates. Pagination if applicable.

### Blog Posts (Content from Sanity CMS — metadata generated dynamically)
Each blog post has: V0Header, article content (Portable Text), FAQ section, TrackedCTALink CTAs, V0Footer. OG type = "article" with publishedTime, modifiedTime, author. Canonical URLs set per-post. Answer-First Summary boxes for AI/featured snippet optimization.

| # | Post | URL |
|---|------|-----|
| 41 | Sell My House Fast Poconos PA | https://www.clearedgehomebuyers.com/blog/sell-my-house-fast-poconos-pa |
| 42 | Sell House Wilkes-Barre Code Violations | https://www.clearedgehomebuyers.com/blog/sell-house-wilkes-barre-code-violations |
| 43 | Sell My House Fast Lehigh Valley | https://www.clearedgehomebuyers.com/blog/sell-my-house-fast-lehigh-valley |
| 44 | Cash Home Buyers Pottsville PA | https://www.clearedgehomebuyers.com/blog/cash-home-buyers-pottsville-pa |
| 45 | Hazleton Residential Occupancy Inspection Checklist | https://www.clearedgehomebuyers.com/blog/hazleton-residential-occupancy-inspection-checklist |
| 46 | How to Stop Berks County Judicial Sale 2026 | https://www.clearedgehomebuyers.com/blog/how-to-stop-berks-county-judicial-sale-2026 |
| 47 | Stop GovOS Fines Poconos House | https://www.clearedgehomebuyers.com/blog/stop-govos-fines-poconos-house |
| 48 | Sell My House Fast Allentown | https://www.clearedgehomebuyers.com/blog/sell-my-house-fast-allentown |
| 49 | Sell Deceased Parents House Without Probate PA | https://www.clearedgehomebuyers.com/blog/sell-deceased-parents-house-without-probate-pennsylvania |
| 50 | Documents Required Selling Inherited Property PA | https://www.clearedgehomebuyers.com/blog/documents-required-selling-inherited-property-pennsylvania |
| 51 | Sell My House Fast Bethlehem PA Tax Lien | https://www.clearedgehomebuyers.com/blog/sell-my-house-fast-bethlehem-pa-18015-tax-lien |
| 52 | PA Job Relocation Home Buyout Fast Equity Release | https://www.clearedgehomebuyers.com/blog/pennsylvania-job-relocation-home-buyout-fast-equity-release-2026 |
| 53 | Selling Water Damaged House 18102 Mold Issues | https://www.clearedgehomebuyers.com/blog/selling-water-damaged-house-18102-mold-issues |
| 54 | Scranton PA Major Structural Damage Disclosure Law | https://www.clearedgehomebuyers.com/blog/scranton-pa-major-structural-damage-disclosure-law-2026 |
| 55 | Avoid Foreclosure Scranton PA | https://www.clearedgehomebuyers.com/blog/avoid-foreclosure-scranton-pa |
| 56 | Cash Home Buyers Lackawanna County No Fees | https://www.clearedgehomebuyers.com/blog/cash-home-buyers-lackawanna-county-no-fees |
| 57 | Sell My House Fast Luzerne County PA | https://www.clearedgehomebuyers.com/blog/sell-my-house-fast-luzerne-county-pa |
| 58 | Cash Home Buyers Berks County | https://www.clearedgehomebuyers.com/blog/cash-home-buyers-berks-county |
| 59 | Sell My House Fast Dunmore Mine Subsidence | https://www.clearedgehomebuyers.com/blog/sell-my-house-fast-dunmore-mine-subsidence |
| 60 | Selling House IPMC Violations Bethlehem | https://www.clearedgehomebuyers.com/blog/selling-house-international-property-maintenance-code-violations-bethlehem |
| 61 | Easton PA Rental Inspection Checklist 2026 | https://www.clearedgehomebuyers.com/blog/easton-pa-rental-inspection-checklist-2026 |
| 62 | PA Act 135 Blighted Property Conservatorship | https://www.clearedgehomebuyers.com/blog/pennsylvania-act-135-blighted-property-conservatorship-help-owner-rights |
| 63 | Sell House Fast During Divorce Lehigh County PA | https://www.clearedgehomebuyers.com/blog/sell-house-fast-during-divorce-lehigh-county-pa |
| 64 | Sell Hoarder House Reading PA Without Cleanout | https://www.clearedgehomebuyers.com/blog/sell-hoarder-house-reading-pa-without-cleanout |
| 65 | Luzerne County Rental Property Registration Inspection | https://www.clearedgehomebuyers.com/blog/luzerne-county-rental-property-registration-inspection-requirements-2026 |

> **NOTE:** Blog posts are managed in Sanity CMS. Additional posts may exist beyond those listed here. Check the blog index page for the complete current list. Each post's metadata (title, description, OG image) is dynamically generated from Sanity.

---

## PHASE 8: LEGAL & UTILITY PAGES (3 Pages)

### Page 66: Privacy Policy
**URL:** https://www.clearedgehomebuyers.com/privacy-policy
**Title:** Privacy Policy | ClearEdge Home Buyers
**Meta Description:** Privacy Policy for ClearEdge Home Buyers. Learn how we collect, use, and protect your personal information.
**Canonical:** https://www.clearedgehomebuyers.com/privacy-policy
**Components:** V0Header, V0Footer
**Verify:** Full privacy policy text, TCPA/SMS disclosure, cookie policy, data handling, contact information

### Page 67: Terms and Conditions
**URL:** https://www.clearedgehomebuyers.com/terms
**Title:** Terms and Conditions
**Meta Description:** Terms and Conditions for ClearEdge Home Buyers. Read our terms of service for using our website and real estate services.
**Canonical:** https://www.clearedgehomebuyers.com/terms
**Components:** V0Header, V0Footer
**Verify:** Full terms text, service description, liability, governing law

### Page 68: SMS Landing Page (/txt)
**URL:** https://www.clearedgehomebuyers.com/txt
**Title:** See What You'd Walk Away With | ClearEdge Home Buyers
**Meta Description:** Free calculator — see your net proceeds from selling your PA home. No sign-up required.
**Robots:** noindex, nofollow (intentionally hidden from search)
**Components:** Calculator, LiteYouTube (Video ID: YS6uDgxIjiI), SoftLeadForm
**Verify:** Auto SMS attribution (sets traffic source to SMS), calculator tool, video embed, soft lead form, no header/footer (stripped-down landing page)

---

## PHASE 9: SPECIAL/INTERNAL PAGES

### Sanity Studio
**URL:** https://www.clearedgehomebuyers.com/studio
**Purpose:** CMS admin interface (Sanity Studio embedded in Next.js)
**Verify:** Loads correctly, requires authentication, not publicly accessible content

### Sitemap
**URL:** https://www.clearedgehomebuyers.com/sitemap.xml
**Verify:** Auto-generated, includes all static pages, all location pages, all situation pages, all blog posts. Check that every URL in this audit is present.

### Video Sitemap
**URL:** https://www.clearedgehomebuyers.com/video-sitemap.xml
**Purpose:** XML video sitemap for Google (route handler at `src/app/video-sitemap.xml/route.ts`)
**Verify:** Returns valid XML with video metadata — content URL, player URL, thumbnail, duration, publication date for YouTube video YS6uDgxIjiI

### Robots.txt
**URL:** https://www.clearedgehomebuyers.com/robots.txt
**Purpose:** Search engine crawl directives (generated from `src/app/robots.ts`)
**Verify:** Allows indexing of all public pages, blocks /studio, references sitemap.xml

---

## PHASE 10: COMPONENT INVENTORY & CROSS-PAGE AUDIT

### Lead Forms (3 Types)

**1. V0LeadForm (Multi-Step Lead Form)**
- **Appears on:** Homepage, all location pages, all situation pages, How It Works, Calculator
- **Steps:** 5-step wizard
  - Step 1: Property Address (with Google Places autocomplete), City, State (all 50 + DC), ZIP
  - Step 2: Situation (8 options: Inherited Property, Facing Foreclosure, Divorce, Relocating, Tired Landlord, Needs Major Repairs, Behind on Taxes, Other)
  - Step 3: Timeline (ASAP, 1-2 months, 3-6 months, Just exploring)
  - Step 4: Occupancy (I live here, Vacant, Tenant occupied, Family member)
  - Step 5: Contact info (First Name, Last Name, Email, Phone) + Terms/SMS consent checkboxes
- **Submission:** POST to dynamic Zapier webhook URL (based on traffic source)
- **GA4 Events:** `form_step_1` through `form_step_5`, `generate_lead` on success, `form_abandoned` on exit
- **Post-submit:** Confirmation message, scroll to form section

**2. ContactForm**
- **Appears on:** Contact page only
- **Fields:** First Name, Last Name, Email, Phone, Message, Terms consent, SMS consent
- **Submission:** POST to dynamic Zapier webhook
- **GA4 Events:** `generate_lead` on success

**3. SoftLeadForm**
- **Appears on:** /txt (SMS landing page) only
- **Fields:** First Name, Last Name, Phone, Address (with autocomplete), City, State, ZIP
- **Submission:** POST to dynamic Zapier webhook
- **GA4 Events:** `generate_lead` on success
- **formType:** "SMS Soft Lead Form"

### CTA Components

**TrackedCTALink**
- Reusable CTA button component used across location, situation, and blog pages
- Fires `cta_click` GA4 event with page path
- #lead-form links use scrollIntoView smooth behavior

**ScrollToFormButton / ScrollToSectionButton**
- Scroll-to-section buttons used on various pages
- Smooth scroll to target element

**DynamicPhoneLink / DynamicPhoneButton / DynamicPhoneText**
- Dynamic phone number display based on traffic source
- Click-to-call `tel:` links fire phone tracking

### Content Components

| Component | Purpose | Used On |
|-----------|---------|---------|
| V0Hero | Homepage hero with property photo, headline, CTA | Homepage |
| SocialProofWall | Trust badges / social proof wall | Homepage, Testimonials |
| V0ProblemSolutionMerged | Problem/solution content section | Homepage |
| V0HowItWorks | 3-step process visualization | Homepage |
| V0ComparisonMerged | Cash buyer vs traditional sale comparison | Homepage |
| V0VideoSection | YouTube video section with LiteYouTube facade | Homepage |
| V0Testimonials | Testimonial cards | Homepage |
| V0FAQ | FAQ accordion | Homepage, Calculator, Blog posts |
| V0ServiceAreas | Service areas grid with location links | Homepage |
| V0TrustBar | Trust indicators bar | Various pages |
| FAQAccordion | Generic FAQ accordion | Various |
| LocationFAQAccordion | Location-specific FAQ accordion | Location pages |
| SituationFAQAccordion | Situation-specific FAQ accordion | Situation pages |
| RegionalHubPage | Regional hub page template | NEPA, Lehigh Valley, Poconos hub pages |
| RegionalCoverageMap / RegionalCoverageMapWrapper | Regional map display | Hub pages |
| CoverageMap / CoverageMapWrapper | Coverage area map | Various |
| LocationMap / LocationMapWrapper | Individual city map | Location city pages |
| ServiceAreasGrid | Grid of service area links | Various |
| BlogPostsGrid | Blog post card grid | Blog index |
| Calculator | Home sale net proceeds calculator | Calculator page, /txt page |
| LiteYouTube | Lightweight YouTube facade (no JS until click) | Homepage, About, How It Works, /txt |
| AddressAutocomplete | Google Places address autocomplete | Lead forms |
| ScrollAnimationProvider | Scroll-triggered animations | All pages (layout) |
| TrafficSourceProvider | Traffic source detection & routing | All pages (layout) |

### Schema/Structured Data

| Schema Type | Where Applied |
|-------------|---------------|
| WebSite | Every page (root layout) |
| LocalBusiness | Homepage (via Schema.tsx), situation pages |
| FAQPage | Homepage, location pages, situation pages |
| Article (OG) | Blog posts, resource pages |
| AggregateRating | Inside LocalBusiness (5.0 rating, 6 reviews) |

### GA4 Events Tracked

| Event Name | Trigger |
|------------|---------|
| `generate_lead` | Any form submission (all 3 form types) |
| `form_step_1` through `form_step_5` | Multi-step form progression |
| `form_abandoned` | User leaves multi-step form before completing |
| `cta_click` | TrackedCTALink button clicks |
| `click_to_text` | Floating SMS button tap (mobile) |

### External Services & Integrations

| Service | Purpose | Details |
|---------|---------|---------|
| Google Analytics 4 | Analytics | ID: G-1H6CPZVB8D |
| Zapier | Form submission routing | 3 webhooks (SEO, Direct, SMS traffic) |
| Sanity CMS | Content management | Location, situation, blog content |
| Google Places API | Address autocomplete | In lead form address fields |
| Google Maps | Map embeds | Location pages, hub pages |
| YouTube | Video embeds | Video ID: YS6uDgxIjiI (appears on 4 pages) |
| Vercel | Hosting/deployment | Auto-deploys from GitHub |
| Facebook | Social link | facebook.com/clearedgehomebuyers |
| Instagram | Social link | instagram.com/clearedge_home_buyers |
| YouTube Channel | Social link | youtube.com/@ClearEdgeHomeBuyers |
| Google Business Profile | Social link / reviews | Maps listing |

### Media Assets

**Property Photos (used as hero images):**
1. `scranton-pa-cash-home-buyers-clearedge-1.jpg` (+ .webp, mobile, 2x variants)
2. `allentown-pa-sell-house-fast-as-is-2.jpg`
3. `wilkes-barre-pa-inherited-property-sale-3.jpg`
4. `lehigh-valley-real-estate-investors-4.jpg`
5. `nepa-distressed-house-cleanout-service-5.jpg`

**Brand Assets:**
- `logo.webp` / `logo.png` — ClearEdge logo
- `Primary.svg` / `Secondary.svg` — Logo variants
- `og-image.png` — Open Graph share image (1200x630)
- `favicon.svg` — SVG favicon
- `apple-touch-icon.png` — iOS icon
- `icon-192.png` / `icon-512.png` — PWA icons
- `tyler.jpg` — Founder photo (used on About page)

**Video:**
- YouTube Video ID: `YS6uDgxIjiI` — "Meet Tyler — ClearEdge Home Buyers" (embedded on Homepage, About, How It Works, /txt)

---

## PHASE 11: CROSS-CUTTING AUDIT CHECKS

### NAP Consistency
Verify the following info is consistent across ALL pages:
- **Name:** ClearEdge Home Buyers
- **Phone:** (610) 904-8526 (default/SEO number)
- **Email:** info@clearedgehomebuyers.com
- **Region:** Eastern Pennsylvania

### Internal Linking
- Every location page should link back to its regional hub
- Every regional hub should link to all its city pages
- Situation pages should link to related blog posts
- Blog posts should link to relevant situation and location pages
- Footer and header should link to all major pages

### Mobile Audit
Test every page category on mobile (at minimum):
- Homepage
- 1 location page
- 1 situation page
- 1 blog post
- Contact page
- Calculator page
- /txt SMS landing page

### Performance Audit
Run Lighthouse or PageSpeed Insights on:
- Homepage
- 1 location page
- 1 blog post
- Calculator page

Check for:
- Core Web Vitals (LCP, CLS, FID/INP)
- Image optimization (WebP usage, proper sizing)
- Lazy loading of below-fold components
- Font loading strategy (Inter + Playfair Display, display: optional)

### Accessibility Audit
Spot-check across page types:
- Heading hierarchy (H1 → H2 → H3)
- Image alt text
- Form labels and ARIA attributes
- Color contrast
- Keyboard navigation
- Focus management in multi-step form

---

## COMPLETE PAGE URL LIST (Quick Reference)

```
# Homepage
https://www.clearedgehomebuyers.com

# Core Pages
https://www.clearedgehomebuyers.com/how-it-works
https://www.clearedgehomebuyers.com/about
https://www.clearedgehomebuyers.com/testimonials
https://www.clearedgehomebuyers.com/contact
https://www.clearedgehomebuyers.com/calculator
https://www.clearedgehomebuyers.com/cash-buyer-vs-realtor
https://www.clearedgehomebuyers.com/are-cash-home-buyers-legit

# Regional Hub Pages
https://www.clearedgehomebuyers.com/locations/nepa
https://www.clearedgehomebuyers.com/locations/lehigh-valley
https://www.clearedgehomebuyers.com/locations/poconos

# NEPA City Pages
https://www.clearedgehomebuyers.com/locations/scranton
https://www.clearedgehomebuyers.com/locations/wilkes-barre
https://www.clearedgehomebuyers.com/locations/hazleton
https://www.clearedgehomebuyers.com/locations/pittston
https://www.clearedgehomebuyers.com/locations/kingston
https://www.clearedgehomebuyers.com/locations/nanticoke
https://www.clearedgehomebuyers.com/locations/carbondale
https://www.clearedgehomebuyers.com/locations/dunmore
https://www.clearedgehomebuyers.com/locations/honesdale
https://www.clearedgehomebuyers.com/locations/bloomsburg

# Lehigh Valley City Pages
https://www.clearedgehomebuyers.com/locations/allentown
https://www.clearedgehomebuyers.com/locations/bethlehem
https://www.clearedgehomebuyers.com/locations/easton
https://www.clearedgehomebuyers.com/locations/reading
https://www.clearedgehomebuyers.com/locations/pottsville

# Poconos City Pages
https://www.clearedgehomebuyers.com/locations/stroudsburg
https://www.clearedgehomebuyers.com/locations/east-stroudsburg
https://www.clearedgehomebuyers.com/locations/pocono-pines
https://www.clearedgehomebuyers.com/locations/tannersville

# Situation Pages
https://www.clearedgehomebuyers.com/situations/foreclosure
https://www.clearedgehomebuyers.com/situations/inherited-property
https://www.clearedgehomebuyers.com/situations/divorce
https://www.clearedgehomebuyers.com/situations/job-relocation
https://www.clearedgehomebuyers.com/situations/tired-landlord
https://www.clearedgehomebuyers.com/situations/vacant-property
https://www.clearedgehomebuyers.com/situations/major-repairs
https://www.clearedgehomebuyers.com/situations/tax-liens-code-violations
https://www.clearedgehomebuyers.com/situations/foundation-structural-issues

# Blog Index
https://www.clearedgehomebuyers.com/blog

# Blog Posts
https://www.clearedgehomebuyers.com/blog/sell-my-house-fast-poconos-pa
https://www.clearedgehomebuyers.com/blog/sell-house-wilkes-barre-code-violations
https://www.clearedgehomebuyers.com/blog/sell-my-house-fast-lehigh-valley
https://www.clearedgehomebuyers.com/blog/cash-home-buyers-pottsville-pa
https://www.clearedgehomebuyers.com/blog/hazleton-residential-occupancy-inspection-checklist
https://www.clearedgehomebuyers.com/blog/how-to-stop-berks-county-judicial-sale-2026
https://www.clearedgehomebuyers.com/blog/stop-govos-fines-poconos-house
https://www.clearedgehomebuyers.com/blog/sell-my-house-fast-allentown
https://www.clearedgehomebuyers.com/blog/sell-deceased-parents-house-without-probate-pennsylvania
https://www.clearedgehomebuyers.com/blog/documents-required-selling-inherited-property-pennsylvania
https://www.clearedgehomebuyers.com/blog/sell-my-house-fast-bethlehem-pa-18015-tax-lien
https://www.clearedgehomebuyers.com/blog/pennsylvania-job-relocation-home-buyout-fast-equity-release-2026
https://www.clearedgehomebuyers.com/blog/selling-water-damaged-house-18102-mold-issues
https://www.clearedgehomebuyers.com/blog/scranton-pa-major-structural-damage-disclosure-law-2026
https://www.clearedgehomebuyers.com/blog/avoid-foreclosure-scranton-pa
https://www.clearedgehomebuyers.com/blog/cash-home-buyers-lackawanna-county-no-fees
https://www.clearedgehomebuyers.com/blog/sell-my-house-fast-luzerne-county-pa
https://www.clearedgehomebuyers.com/blog/cash-home-buyers-berks-county
https://www.clearedgehomebuyers.com/blog/sell-my-house-fast-dunmore-mine-subsidence
https://www.clearedgehomebuyers.com/blog/selling-house-international-property-maintenance-code-violations-bethlehem
https://www.clearedgehomebuyers.com/blog/easton-pa-rental-inspection-checklist-2026
https://www.clearedgehomebuyers.com/blog/pennsylvania-act-135-blighted-property-conservatorship-help-owner-rights
https://www.clearedgehomebuyers.com/blog/sell-house-fast-during-divorce-lehigh-county-pa
https://www.clearedgehomebuyers.com/blog/sell-hoarder-house-reading-pa-without-cleanout
https://www.clearedgehomebuyers.com/blog/luzerne-county-rental-property-registration-inspection-requirements-2026

# Legal Pages
https://www.clearedgehomebuyers.com/privacy-policy
https://www.clearedgehomebuyers.com/terms

# SMS Landing Page (noindex)
https://www.clearedgehomebuyers.com/txt

# Utility
https://www.clearedgehomebuyers.com/sitemap.xml
https://www.clearedgehomebuyers.com/studio (Sanity CMS admin)
```

**Total: 68 auditable pages + sitemap.xml + Sanity Studio**
