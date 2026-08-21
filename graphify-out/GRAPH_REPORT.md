# Graph Report - majestic new business demo  (2026-08-21)

## Corpus Check
- 55 files · ~30,402 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 101 nodes · 55 edges · 2 communities detected
- Extraction: 84% EXTRACTED · 16% INFERRED · 0% AMBIGUOUS · INFERRED: 9 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]

## God Nodes (most connected - your core abstractions)
1. `buildWhatsAppUrl()` - 8 edges
2. `Header()` - 3 edges
3. `TourCard()` - 3 edges
4. `AboutPage()` - 2 edges
5. `Footer()` - 2 edges
6. `StickyMobileBar()` - 2 edges
7. `WhatsAppFloating()` - 2 edges
8. `HeroSection()` - 2 edges
9. `useTheme()` - 2 edges
10. `getAvailabilityStatus()` - 2 edges

## Surprising Connections (you probably didn't know these)
- `AboutPage()` --calls--> `buildWhatsAppUrl()`  [INFERRED]
  src\app\about\page.tsx → src\lib\utils.ts
- `Footer()` --calls--> `buildWhatsAppUrl()`  [INFERRED]
  src\components\Footer.tsx → src\lib\utils.ts
- `Header()` --calls--> `buildWhatsAppUrl()`  [INFERRED]
  src\components\Header.tsx → src\lib\utils.ts
- `StickyMobileBar()` --calls--> `buildWhatsAppUrl()`  [INFERRED]
  src\components\StickyMobileBar.tsx → src\lib\utils.ts
- `WhatsAppFloating()` --calls--> `buildWhatsAppUrl()`  [INFERRED]
  src\components\WhatsAppFloating.tsx → src\lib\utils.ts

## Communities

### Community 0 - "Community 0"
Cohesion: 0.12
Nodes (8): AboutPage(), Footer(), StickyMobileBar(), TourCard(), WhatsAppFloating(), HeroSection(), buildWhatsAppUrl(), getAvailabilityStatus()

### Community 1 - "Community 1"
Cohesion: 0.4
Nodes (2): Header(), useTheme()

## Knowledge Gaps
- **Thin community `Community 1`** (5 nodes): `Header()`, `ThemeProvider()`, `useTheme()`, `Header.tsx`, `ThemeContext.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `buildWhatsAppUrl()` connect `Community 0` to `Community 1`?**
  _High betweenness centrality (0.037) - this node is a cross-community bridge._
- **Why does `Header()` connect `Community 1` to `Community 0`?**
  _High betweenness centrality (0.014) - this node is a cross-community bridge._
- **Are the 7 inferred relationships involving `buildWhatsAppUrl()` (e.g. with `AboutPage()` and `Footer()`) actually correct?**
  _`buildWhatsAppUrl()` has 7 INFERRED edges - model-reasoned connections that need verification._
- **Are the 2 inferred relationships involving `Header()` (e.g. with `useTheme()` and `buildWhatsAppUrl()`) actually correct?**
  _`Header()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Are the 2 inferred relationships involving `TourCard()` (e.g. with `getAvailabilityStatus()` and `buildWhatsAppUrl()`) actually correct?**
  _`TourCard()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.12 - nodes in this community are weakly interconnected._