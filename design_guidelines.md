# Design Guidelines for Academic Math Platform

## Design Approach

**Reference-Based Approach**: Drawing inspiration from scholarly platforms like Khan Academy, Brilliant.org, and academic documentation sites (Read the Docs, MathJax demos), emphasizing clarity, readability, and mathematical precision over trendy visual effects.

**Core Principle**: Create a distraction-free learning environment where mathematical content is the hero. Every design decision should enhance comprehension and usability.

---

## Color System

### Base Palette (Muted Academic)
- **Background**: `#F8F9FB` (soft off-white for reduced eye strain)
- **Surface/Cards**: `#FFFFFF` (pure white for content containers)
- **Text Primary**: `#111827` (near-black for optimal readability)
- **Text Secondary**: `#4B5563` (medium gray for labels, metadata)
- **Accent**: `#2B6CB0` (scholarly blue for links, CTAs)
  - Hover state: `#1E4E8C` (darker blue)
- **Borders**: `#E5E7EB` (light gray for subtle separation)
- **Callouts/Info Blocks**: `#EEF2FF` (very light blue tint)

### Usage Rules
- Use white cards exclusively for mathematical content and examples
- Reserve accent blue for interactive elements only (links, buttons, active states)
- Never use color to convey meaning alone (always pair with icons/text for accessibility)

---

## Typography Hierarchy

### Font Families
1. **Body Content (Prose)**: `"Source Serif Pro", Georgia, serif` - optimized for long-form mathematical reading
2. **UI Elements**: `Inter, system-ui, sans-serif` - clean, modern for navigation and controls
3. **Code/Steps**: `"JetBrains Mono", "Fira Code", monospace` - for step labels and algorithmic content
4. **Math Display**: KaTeX rendering (no font specification needed)

### Scale (Desktop)
- **Hero Heading**: 2.5rem (40px), font-weight: 700, line-height: 1.1
- **Page Title**: 2rem (32px), font-weight: 600, line-height: 1.2
- **Section Heading**: 1.5rem (24px), font-weight: 600, line-height: 1.3
- **Subsection**: 1.25rem (20px), font-weight: 500
- **Body**: 1.0625rem (17px), font-weight: 400, line-height: 1.7 (optimal for reading)
- **Small/Meta**: 0.875rem (14px), font-weight: 400
- **Button Text**: 0.9375rem (15px), font-weight: 500

### Responsive Adjustments
- Mobile: Scale down headings by 15-20%, body remains 16px minimum
- Maintain line-height ratios across breakpoints

---

## Layout System

### Spacing Primitives
**Tailwind units**: Use 2, 4, 6, 8, 12, 16, 20, 24 for consistency
- **Micro spacing**: `p-2, m-2` (8px) - tight element grouping
- **Standard spacing**: `p-4, m-4` (16px) - default component padding
- **Section spacing**: `p-8, py-12` (32px, 48px) - content sections
- **Page spacing**: `py-16, py-20` (64px, 80px) - major page divisions

### Grid Structure
**App Shell Layout**:
```
┌─────────────────────────────────────────────┐
│  Header (60px fixed, white bg, border-b)   │
├──────┬────────────────────────┬─────────────┤
│ Side │   Main Content         │ Right Rail  │
│ bar  │   (max-w-4xl)          │ (280px)     │
│(240px│                        │             │
│fixed)│                        │             │
└──────┴────────────────────────┴─────────────┘
```

**Content Max-Widths**:
- Main content: `max-w-4xl` (896px) for optimal reading
- Full-width sections (when needed): `max-w-6xl` (1152px)
- Prose content: `max-w-prose` (65ch optimal line length)

**Breakpoints**:
- Mobile: `< 768px` - sidebar collapses to mobile menu, right rail hidden
- Tablet: `768px - 1024px` - sidebar persistent, right rail collapses
- Desktop: `> 1024px` - full three-column layout

---

## Component Design

### Cards
- Background: white
- Border: `1px solid #E5E7EB`
- Border radius: `rounded-2xl` (16px)
- Shadow: `shadow-sm` (subtle) on default, `shadow-md` on hover
- Padding: `p-6` (24px) standard, `p-8` for feature cards

### Buttons
**Primary** (Accent blue):
- Background: `#2B6CB0`, text: white
- Padding: `px-6 py-3` (24px x 12px)
- Border radius: `rounded-xl` (12px)
- Hover: `#1E4E8C` with subtle lift (`translate-y-[-2px]`)
- Font: 15px, weight 500

**Secondary** (Outline):
- Border: `2px solid #2B6CB0`, text: `#2B6CB0`
- Same sizing as primary
- Hover: light blue background (`#EEF2FF`)

**Subtle/Text**:
- No border, text: `#2B6CB0`
- Padding: `px-4 py-2`
- Hover: underline + slight color darken

### Input Fields
- Background: white
- Border: `2px solid #E5E7EB`
- Border radius: `rounded-lg` (8px)
- Padding: `px-4 py-3`
- Focus state: border becomes `#2B6CB0`, add blue glow (`ring-4 ring-blue-100`)
- Font: 16px to prevent mobile zoom

### Math Input (MathLive)
- Larger height: `min-h-[80px]`
- Monospace preview when in LaTeX mode
- Clear visual distinction between input and rendered preview

### Navigation (Sidebar)
- Fixed position, white background
- Links: 14px, weight 500, padding `px-4 py-2.5`
- Active state: blue background (`#EEF2FF`), blue text, left border accent
- Hover: light gray background (`#F8F9FB`)
- Nested topics: indent by `pl-8`

### Step Cards (Solution Display)
- White card with left border (`border-l-4 border-blue-500`)
- Step number in circle badge (blue background, white text)
- "Before" and "After" sections with KaTeX rendering
- Rule label in small caps, weight 600, secondary text color
- Generous vertical spacing between steps (`space-y-6`)

### Callouts (Formulas/Theorems)
- Background: `#EEF2FF` (light blue tint)
- Border-left: `4px solid #2B6CB0`
- Padding: `p-6`
- Border radius: `rounded-xl`
- Icon or emoji prefix (📐, 💡, ⚠️) for visual anchoring

---

## Interactions & Motion

### Animation Philosophy
**Minimal and purposeful** - avoid distracting motion

**Approved Animations**:
- Button hover lift: `transform: translateY(-2px)`, 150ms ease
- Card hover shadow increase: 200ms ease
- Dropdown/modal entrance: fade + slide (200ms)
- Loading skeleton pulse: subtle, slow (2s cycle)

**Forbidden**:
- Parallax scrolling
- Auto-playing carousels
- Excessive transitions on every interaction

---

## Page-Specific Guidelines

### Home Page
**Hero Section** (NOT traditional centered hero):
- Two-column split: Left = headline + CTA, Right = illustration or grid of subject cards
- Height: natural flow (~500px), not forced 100vh
- Background: subtle gradient from white to `#F8F9FB`

**Subject Cards Grid**:
- 2 columns on desktop, 1 on mobile
- Each card shows icon, subject name, topic count, and "Start Learning" link
- Hover effect: slight elevation

**Quick Stats Bar**:
- Horizontal strip below hero
- "200+ Topics", "4 Subjects", "Step-by-Step Solutions" with icons
- Background: light blue tint

### Knowledge Base Page
**Search-First Layout**:
- Large search bar at top (auto-focus on load)
- Filter chips below (subject, difficulty tags)
- Results grid: 3 columns desktop, 1 mobile
- Each result card: title, subject badge, tags, preview snippet

### Subject Hub Pages
**Three-Zone Layout**:
1. **Overview Section** (top): Subject description, key concepts list
2. **Topic Grid** (middle): 3-column card grid with topic cards
3. **Solver Panel** (sticky sidebar or bottom on mobile): MathLive input + examples

### Topic Detail Page
**Academic Paper Style**:
- Title centered, large
- Metadata row: subject badge, difficulty, tags
- Main content in single column (max-w-prose)
- Inline KaTeX for formulas
- "Examples" accordion below content
- "Try It" mini-solver at bottom

---

## Accessibility Requirements

- **Focus Indicators**: 3px blue outline on all interactive elements
- **Skip Links**: "Skip to content" at top for keyboard users
- **ARIA Labels**: On all icon buttons, search inputs, math inputs
- **Color Contrast**: Minimum WCAG AA (4.5:1 for text)
- **Screen Reader Support**: ARIA live regions for solver results

---

## Images Strategy

**Where to Use Images**:
1. **Home Page Hero** (right side): Abstract mathematical visualization (3D graphs, geometric patterns, matrix grids) - stylized, not photorealistic
2. **Subject Icons**: Custom SVG icons for each subject (not photos)
3. **Empty States**: Friendly illustrations for "no results", "no examples yet"

**Image Treatment**:
- Illustrative/diagrammatic style over photography
- Use SVG where possible for crispness
- If using background images behind buttons: apply `backdrop-blur-md` to button backgrounds

**No Images Needed**:
- Topic cards (rely on typography and color)
- Step display (purely mathematical)
- Navigation elements

---

## Key Formulas Right Rail

**Structure**:
- Collapsible accordion sections: "Definitions", "Identities", "Theorems"
- Each section loaded from `/content/_formulas/<subject>.md`
- Sticky positioning (scrolls with content up to header)
- Background: white card, subtle shadow
- Font size: 14px body, 12px for formulas

**Responsive Behavior**:
- Desktop: Always visible (280px width)
- Tablet: Collapsible toggle
- Mobile: Hidden, accessible via bottom sheet

---

## Quality Checklist

✅ Mathematical content always uses serif fonts for body text  
✅ All KaTeX expressions render with proper spacing and alignment  
✅ White cards never have color backgrounds (only light blue for callouts)  
✅ Consistent rounded corners (`rounded-xl` minimum, `rounded-2xl` for cards)  
✅ Generous whitespace prevents cramped layouts  
✅ Interactive elements have clear hover/focus states  
✅ Mobile layout is fully functional (no broken stacks)  
✅ Loading states prevent jarring content shifts