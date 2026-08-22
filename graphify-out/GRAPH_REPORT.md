# Graph Report - majestic new business demo  (2026-08-22)

## Corpus Check
- 73 files · ~47,794 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 150 nodes · 86 edges · 3 communities detected
- Extraction: 91% EXTRACTED · 9% INFERRED · 0% AMBIGUOUS · INFERRED: 8 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 14|Community 14]]

## God Nodes (most connected - your core abstractions)
1. `buildWhatsAppUrl()` - 7 edges
2. `Header()` - 3 edges
3. `TourCard()` - 3 edges
4. `AboutPage()` - 2 edges
5. `Footer()` - 2 edges
6. `StickyMobileBar()` - 2 edges
7. `WhatsAppFloating()` - 2 edges
8. `getInitialGallery()` - 2 edges
9. `DataProvider()` - 2 edges
10. `useTheme()` - 2 edges

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
Cohesion: 0.14
Nodes (7): AboutPage(), Footer(), StickyMobileBar(), TourCard(), WhatsAppFloating(), buildWhatsAppUrl(), getAvailabilityStatus()

### Community 4 - "Community 4"
Cohesion: 0.4
Nodes (2): Header(), useTheme()

### Community 14 - "Community 14"
Cohesion: 1.0
Nodes (2): DataProvider(), getInitialGallery()

## Knowledge Gaps
- **Thin community `Community 4`** (5 nodes): `Header()`, `ThemeProvider()`, `useTheme()`, `Header.tsx`, `ThemeContext.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `Community 14`** (3 nodes): `DataProvider()`, `getInitialGallery()`, `DataContext.tsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `buildWhatsAppUrl()` connect `Community 0` to `Community 4`?**
  _High betweenness centrality (0.013) - this node is a cross-community bridge._
- **Why does `Header()` connect `Community 4` to `Community 0`?**
  _High betweenness centrality (0.006) - this node is a cross-community bridge._
- **Are the 6 inferred relationships involving `buildWhatsAppUrl()` (e.g. with `AboutPage()` and `Footer()`) actually correct?**
  _`buildWhatsAppUrl()` has 6 INFERRED edges - model-reasoned connections that need verification._
- **Are the 2 inferred relationships involving `Header()` (e.g. with `useTheme()` and `buildWhatsAppUrl()`) actually correct?**
  _`Header()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Are the 2 inferred relationships involving `TourCard()` (e.g. with `getAvailabilityStatus()` and `buildWhatsAppUrl()`) actually correct?**
  _`TourCard()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.14 - nodes in this community are weakly interconnected._