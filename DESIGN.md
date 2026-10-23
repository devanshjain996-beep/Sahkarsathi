---
name: Cooperative Operational Interface
colors:
  surface: '#0c1323'
  surface-dim: '#0c1323'
  surface-bright: '#32394b'
  surface-container-lowest: '#070e1e'
  surface-container-low: '#151b2c'
  surface-container: '#191f30'
  surface-container-high: '#232a3b'
  surface-container-highest: '#2e3446'
  on-surface: '#dce2f9'
  on-surface-variant: '#bbcac1'
  inverse-surface: '#dce2f9'
  inverse-on-surface: '#2a3042'
  outline: '#85948c'
  outline-variant: '#3c4a43'
  surface-tint: '#3edfaa'
  primary: '#56f1bb'
  on-primary: '#003827'
  primary-container: '#2dd4a0'
  on-primary-container: '#00563e'
  inverse-primary: '#006c4e'
  secondary: '#77daa1'
  on-secondary: '#003920'
  secondary-container: '#037d4d'
  on-secondary-container: '#bdffd4'
  tertiary: '#cfd7f1'
  on-tertiary: '#283044'
  tertiary-container: '#b4bbd5'
  on-tertiary-container: '#434b60'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#63fcc5'
  primary-fixed-dim: '#3edfaa'
  on-primary-fixed: '#002115'
  on-primary-fixed-variant: '#00513a'
  secondary-fixed: '#93f7bc'
  secondary-fixed-dim: '#77daa1'
  on-secondary-fixed: '#002111'
  on-secondary-fixed-variant: '#005231'
  tertiary-fixed: '#dae2fd'
  tertiary-fixed-dim: '#bec6e0'
  on-tertiary-fixed: '#131b2e'
  on-tertiary-fixed-variant: '#3f465c'
  background: '#0c1323'
  on-background: '#dce2f9'
  surface-variant: '#2e3446'
  surface-border: '#243047'
  text-primary: '#F8FAFC'
  text-muted: '#94A3B8'
  text-soft: '#CBD5E1'
  status-completed: '#059669'
  status-progress: '#0284C7'
  status-pending: '#F59E0B'
  status-blocked: '#EF4444'
  status-info: '#6366F1'
typography:
  headline-xl:
    fontFamily: Outfit
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Outfit
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-lg:
    fontFamily: Outfit
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Outfit
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  headline-sm:
    fontFamily: Outfit
    fontSize: 16px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Outfit
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Outfit
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Outfit
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-lg:
    fontFamily: Outfit
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.02em
  label-md:
    fontFamily: Outfit
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.04em
  label-sm:
    fontFamily: Outfit
    fontSize: 10px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.06em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-lg: 1.5rem
  margin: 1rem
  margin-md: 1.5rem
  margin-lg: 2rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1.25rem
  space-xl: 2rem
---

## Brand & Style

This design system targets project supervisors, trade union leads, and cooperative coordinators managing skilled manual and technical labor across high-velocity site deployments. The UI projects institutional reliability, operational transparency, and dignified trade professionalism. 

The aesthetic blends **Modern Dark Surface Engineering** with **Tactile Utility Dashboard** principles:
- High-contrast, dense telemetry with dark-mode bias to reduce eye strain under varied lighting environments (site containers, field tablets, command offices).
- Precise, functional data hierarchy balancing urgent operational blockers with long-term collective workforce metrics.
- Controlled micro-luminescence: subtle mint/emerald edge states and glowing focus indicators emphasize real-time cooperative task flows without distracting visual clutter.

## Colors

The palette establishes an authoritative dark command center. 

- **Primary Canvas & Surfaces**: The base viewport uses `#050B1B` (deep navy-black). Elevated workspace modules and card surfaces live on `#0F172A` (slate navy), bounded by subtle architectural contours tinted in `#243047`.
- **Accents & Action Triggers**: The primary accent `#2DD4A0` (vibrant mint) highlights active telemetry, live monitors, and high-priority metrics. Interactive action buttons and confirmed workflow triggers utilize `#087F4F` / `#059669` (cooperative emerald) to evoke stability and shared growth.
- **Typography Contrast**: Crisp foreground content renders in `#F8FAFC`, supported by structural secondary telemetry in `#CBD5E1` and descriptive metadata in `#94A3B8`.
- **Status Semantic System**:
  - `Completed`: `#059669` (Emerald Green)
  - `In Progress`: `#0284C7` (Sky/Cyan)
  - `Pending`: `#F59E0B` (Amber Orange)
  - `Delayed / Critical Blocker`: `#EF4444` (Coral Red)
  - `Info / Telemetry`: `#6366F1` (Indigo Blue)

## Typography

The typography system relies on **Outfit** across all display, body, and label roles. Its geometric construction, robust counters, and modern proportions ensure crisp legibility on dense supervision tables, active dispatch sheets, and high-contrast analytical feeds.

- Numerical performance figures, trade worker counters, and status indicators must always leverage tabular layout alignment (`font-variant-numeric: tabular-nums`).
- Label roles (`label-md`, `label-sm`) use uppercase transforms and slight positive tracking for micro-badges, stage tags, and column headers.
- Headline scales enforce tight letter-spacing to present a deliberate, modern architectural presence.

## Layout & Spacing

This layout is structured around an adaptive 12-column fluid grid system optimized for data density and field mobility.

- **Breakpoints**:
  - `Compact (Mobile)`: 0px – 767px (4 columns, `margin`: 1rem, `gutter`: 1rem). Single-column stacked inspection sheets and worker status cards.
  - `Medium (Tablet / Field Ops)`: 768px – 1023px (8 columns, `margin-md`: 1.5rem, `gutter`: 1rem). Split-panel interface with collapsible side navigation.
  - `Expanded (Desktop Dashboard)`: 1024px+ (12 columns, `margin-lg`: 2rem, `gutter-lg`: 1.5rem). Multi-tier supervisory boards, gantt-timeline trackers, and trade allocation matrices.
- **Rhythm Philosophy**: Compact internal padding inside table rows and data cells preserves screen real estate, while outer margins frame functional sectors into distinct architectural groups.

## Elevation & Depth

Visual hierarchy does not rely on heavy drop shadows; instead, it utilizes **tonal layering**, **structural surface borders**, and **luminescent edge accents**:

- **Ground Level (Canvas)**: `#050B1B` serves as the structural floor.
- **Level 1 (Card & Section Containers)**: `#0F172A` with a crisp `1px solid #243047` boundary.
- **Level 2 (Dropdowns, Floating Overlays, Modals)**: `#152238` with `1px solid #334464` and an ambient diffuse shadow (`0 12px 32px -4px rgba(2, 6, 23, 0.75)`).
- **Interactive State / Active Accent**: Selected cards and focused controls project a subtle mint boundary glow (`box-shadow: 0 0 0 1px #2DD4A0, 0 0 12px -2px rgba(45, 212, 160, 0.2)`).

## Shapes

The design language applies controlled geometry with balanced roundedness:
- Standard dashboard panels, operational cards, and modals use `rounded-lg` (1rem / 16px) for an approachable yet structured frame.
- Internal controls (inputs, buttons, filter segments) employ a standard `0.5rem` (8px) radius to ensure functional cohesion.
- Small indicator badges and operational tags utilize full pill configurations (`rounded-full` / 9999px) to clearly differentiate meta-labels from interactive surface cards.

## Components

### Buttons
- **Primary Cooperative Action**: Background `#087F4F` (hover: `#059669`), text `#F8FAFC`, padding `0.625rem 1.25rem`, border radius `0.5rem`. Subtle active transition scale down (`0.98`).
- **Secondary / Ghost Action**: Background transparent, border `1px solid #243047` (hover border: `#2DD4A0`, hover text: `#2DD4A0`), text `#CBD5E1`.
- **Destructive Action**: Background `rgba(239, 68, 68, 0.1)`, border `1px solid rgba(239, 68, 68, 0.3)`, text `#EF4444` (hover: background `#EF4444`, text `#FFFFFF`).

### Status Badges & Chips
- Structure: Height `24px`, horizontal padding `0.625rem`, border-radius `9999px`, font `label-sm`.
- **Completed**: Background `rgba(5, 150, 105, 0.15)`, text `#34D399`, border `1px solid rgba(5, 150, 105, 0.4)`.
- **In Progress**: Background `rgba(2, 132, 199, 0.15)`, text `#38BDF8`, border `1px solid rgba(2, 132, 199, 0.4)`.
- **Pending**: Background `rgba(245, 158, 11, 0.15)`, text `#FBBF24`, border `1px solid rgba(245, 158, 11, 0.4)`.
- **Delayed / Blocker**: Background `rgba(239, 68, 68, 0.15)`, text `#F87171`, border `1px solid rgba(239, 68, 68, 0.4)`.
- **Info**: Background `rgba(99, 102, 241, 0.15)`, text `#818CF8`, border `1px solid rgba(99, 102, 241, 0.4)`.

### Cards & Workstation Modules
- Default surface `#0F172A`, border `1px solid #243047`, corner radius `1rem`, internal padding `1.25rem`.
- Header area includes trade categorization icons (carpentry, electrical, plumbing) followed by crisp `#F8FAFC` titling and real-time status chips.

### Form Inputs & Selectors
- Background `#050B1B`, border `1px solid #243047`, text `#F8FAFC`, placeholder `#94A3B8`.
- Focus ring: `1px solid #2DD4A0` with `box-shadow: 0 0 0 2px rgba(45, 212, 160, 0.2)`. Height `40px`, padding `0 0.75rem`.

### Trade Labor Allocation Lists & Tables
- Dense telemetry layouts with alternate row tinting (`rgba(15, 23, 42, 0.6)`).
- Table header: Text `#94A3B8`, typography `label-sm`, bottom border `1px solid #243047`.
- Hover state on rows: `rgba(45, 212, 160, 0.04)` with quick cursor feedback.
- Interactive checkboxes and radio toggles utilize `#050B1B` base with `#2DD4A0` check fill on active selection.