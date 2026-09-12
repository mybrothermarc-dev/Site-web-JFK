# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: prospective and existing donors/partners in Europe, Canada, and the USA — both francophone and anglophone — who discover Jesus Family Kingdom (JFK) online and decide whether to sponsor a child, support a missionary or missionary teacher, give a one-time or monthly gift, or commit to pray. Secondary: churches, associations, and businesses considering a standing partnership, and people considering a short-term mission trip or a stay at Paradisakely Shalom Land (solidarity tourism).

## Product Purpose

A showcase-and-fundraising site for JFK, a Christian mission organization based in Ambohimalaza, Madagascar. It exists to make the mission's work (evangelism/discipleship, medical missions, school planting, the Paradisakely orphanage, and the Kingdom Business self-funding ventures) legible and trustworthy to a foreign donor audience, and to convert that trust into concrete action: sponsorship, monthly/one-time giving, prayer commitment, or partnership. Success = completed sponsorship requests, gifts, and contact/partnership inquiries, with donors and sponsors returning for annual reports and news.

## Positioning

Not a general international-aid charity: a single, integrated Malagasy-led mission stack where evangelism, medical care, school planting, orphan care, and self-funding businesses (fish farming, livestock, market gardening, solidarity tourism) all roll up into one pilot village, Paradisakely Shalom Land, meant to model a transformed society and become the mission's flagship. Founder/president: Sedera Rakotoaritsifa.

## Operating Context

Donors typically arrive via social media (Facebook/Instagram) or word of mouth, mostly on mobile, in French or English, and decide within one visit whether to trust the organization enough to give recurring support to a program 10,000km away. The site is the primary evidence they see before that decision — there is no in-person meeting first. Content (child/missionary/teacher profiles, impact numbers, project budgets and progress, sponsorship/support amounts) is maintained going forward by non-developer JFK staff editing structured content files, not by re-touching page code.

## Capabilities and Constraints

- Static site (Astro + Tailwind), deployed on Cloudflare Pages free tier; no paid backend. Forms submit via Web3Forms (free). Payment is via external Stripe Payment Links, PayPal, bank transfer, and Mobile Money (Mvola/Orange Money) — not an in-site checkout.
- Bilingual FR (default) / EN from day one, localized URLs (`/fr/...`, `/en/...`), full content parity required in both languages.
- **Child protection is a hard constraint, not a design preference:** children shown by first name only, no last name, no precise location, no other identifying/sensitive detail; photos of specific named sponsorship profiles are published only with real guardian consent. This rules out ever pairing real, identifiable children's photos from group/event imagery with invented or unmatched individual sponsor-profile bios — a mismatch would misattribute a real child's likeness to a fabricated case.
- Placeholder discipline: while real photography for a given subject is unavailable, use crafted visual placeholders (illustration/pattern/labelled), never generic stock photography of unrelated children or unrelated mission scenes standing in for JFK's own people or sites.
- Real assets currently on hand: the official JFK logo (blue "Jesus"/crown+scene icon/gold "KINGDOM" wordmark, in `public/images/logo-full.png` and a transparent variant for dark backgrounds). Four real mission photographs (a village gathering under a thatched/tin shelter, a medical-mission scene with masked staff, a large outdoor crowd gathering on a mountain, and schoolchildren in uniform) were shared in chat but are not yet saved to the project; the user is placing them in `public/images/` separately. No real photos exist yet for individual sponsorship-profile children, missionaries, or teachers (those profiles are illustrative examples pending real data from JFK).
- Money amounts on the site (sponsorship tiers, missionary/teacher monthly support, per-village school cost, emergency medical case cost, funds-allocation percentages) are realistic placeholders explicitly flagged to JFK for validation, defined centrally in `src/data/site.ts`.

## Brand Commitments

- Name: Jesus Family Kingdom (JFK). Motto: "Atteindre. Servir. Transformer. Des vies et des villages." (Reach. Serve. Transform. Lives and villages.), anchored in Acts 1:8, used sparingly.
- **Palette is a confirmed, binding brand commitment, not open for this round:** the "Kingdom" system in `tailwind.config.mjs`/`src/styles/global.css`, drawn directly from the official logo — blue (primary, "Jesus" wordmark), green (nature/growth, the logo's scene), gold (accent, crown + "KINGDOM"), a rare coral pop (the logo's dots), on a cool light "paper" background with deep-navy "ink" text; fonts Petrona (display) + Hanken Grotesk (body). An earlier "Highland Earth" terracotta/brown direction was tried and explicitly rejected in favor of this logo-derived system. This redesign round refines layout, rhythm, typography, and interaction detail against that fixed palette — it does not propose a new visual world or new brand colors.
- Tone: warm, hope-filled, faith-forward, factual about numbers; never guilt-tripping or poverty-porn; shows dignity and joy.

## Evidence on Hand

- Full written brief (site structure, all 5 pillars, 2025 impact numbers, real missionary names/zones/stats, school-planting numbers, a named testimonial from "Nono," official contact details) supplied by the user and already used to write every page's real bilingual copy — no lorem ipsum anywhere on the site.
- Logo file, described above. Four real mission photographs described above, not yet on disk — treat as pending, do not fabricate substitutes claiming to be them.
- No real photos yet for named children/missionary/teacher profiles; those remain openly-labelled placeholders.

## Product Principles

1. Trust before ask: transparency (real numbers, named leadership, a funds-allocation breakdown, an annual report link) and dignity in storytelling come before any donation CTA.
2. One clear action per screen: sponsor a child, support a missionary/teacher, or give — never bury the CTA under competing asks.
3. Non-developers must be able to keep it current: every editable fact (profiles, amounts, progress bars, impact stats) lives in structured content files, never hard-coded in page/component markup.
4. Never trade child safety for a better story: no shortcut on the naming/photo/location rules above, even under redesign pressure to "make profiles feel more real."
5. Preserve the logo-derived Kingdom palette and bilingual parity as fixed floors under any visual refinement.

## Accessibility & Inclusion

WCAG AA is an explicit original requirement: sufficient color contrast, meaningful alt text (including on placeholder imagery, which must disclose it is a placeholder rather than imply a real photo), full keyboard navigation, and visible focus states.
