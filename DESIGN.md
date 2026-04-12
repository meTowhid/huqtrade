# Design System Document

## 1. Overview & Creative North Star: "The Architectural Horizon"

This design system is built for a global logistics leader that operates at the intersection of massive scale and surgical precision. Moving away from the dense, dark aesthetics of traditional maritime branding, we are pivoting to a light-forward, editorial experience.

**Creative North Star: The Architectural Horizon**
This system treats the interface as a physical workspace—an expansive, light-filled architectural environment. We break the "template" look through **Intentional Asymmetry** and **Tonal Depth**. By utilizing wide horizontal tracking, generous negative space, and a high-contrast typography scale, we convey an atmosphere of "Calculated Calm." We don't just move cargo; we orchestrate global trade with absolute transparency.

---

## 2. Colors: Depth Through Tone, Not Lines

Our palette leverages the heritage Navy and Gold, but reimagines them as precision accents within a sophisticated, slate-based environment.

### The "No-Line" Rule
To maintain a premium, high-end feel, **1px solid borders for sectioning are strictly prohibited.** Boundaries must be defined solely through background color shifts. For example, a `surface-container-low` (#f0f4f8) section should sit on a `surface` (#f6fafe) background to denote a change in context.

### Surface Hierarchy & Nesting
Treat the UI as a series of nested physical layers. Use the following tiers to define importance:
*   **Base:** `surface` (#f6fafe) for the primary application background.
*   **The Content Layer:** `surface-container-low` (#f0f4f8) for large content areas.
*   **The Interactive Layer:** `surface-container-lowest` (#ffffff) for cards and primary input areas. This creates a "lifted" effect without heavy shadows.

### Signature Textures & Soul
To move beyond a generic "SaaS" look, utilize the **"Elite Gradient"**: A subtle linear transition from `primary` (#001529) to `primary_container` (#071d31) for hero sections or main CTAs. This provides a professional polish that flat colors cannot achieve, echoing the deep hues of the open ocean.

---

## 3. Typography: Editorial Authority

We use **Manrope** as our sole typeface. Its geometric foundations and modern proportions make it ideal for a logistics firm that prides itself on modern technology and reliability.

*   **Display (lg/md):** Reserved for high-level marketing statements and hero statistics. Use `primary` (#001529) with tight letter-spacing (-0.02em) to command attention.
*   **Headline (lg/md/sm):** Used for section titles. These should be paired with generous top-padding to let the content "breathe."
*   **Title (lg/md/sm):** For card headings and navigational elements.
*   **Body (lg/md/sm):** Rendered in `on_surface_variant` (#43474d) for long-form reading to reduce eye strain, maintaining a "slate" editorial feel.
*   **Labels:** Technical data, shipping IDs, and timestamps. These should be set in all-caps with increased letter-spacing (0.05em) to feel like a modern manifest.

---

## 4. Elevation & Depth: Tonal Layering

Traditional drop shadows are too "noisy" for a high-end maritime experience. Hierarchy is achieved through **Tonal Layering**.

*   **The Layering Principle:** Place a `surface-container-lowest` (#ffffff) card on a `surface-container-low` (#f0f4f8) section. This creates a soft, natural lift that feels architectural.
*   **Ambient Shadows:** If a floating element (like a modal or dropdown) is required, use an extra-diffused shadow.
    *   *Blur:* 24px - 40px
    *   *Opacity:* 4% - 6% 
    *   *Color:* Use a tinted version of `on_surface` (#171c1f) to mimic natural ambient light.
*   **The "Ghost Border" Fallback:** If a border is required for accessibility, use the `outline_variant` (#c4c6cd) at **15% opacity**. Never use a 100% opaque border.
*   **Glassmorphism:** For global navigation bars or floating status chips, use a `surface-container-lowest` color with 80% opacity and a `20px` backdrop-blur. This reinforces the brand's commitment to "Transparency."

---

## 5. Components

All components adhere to the **ROUND_FOUR (0.25rem)** corner radius to maintain a rigid, corporate, and reliable look.

### Buttons
*   **Primary:** Solid Navy (`primary` #001529) with `on_primary` (#ffffff) text. Minimalist, no icon unless necessary for direction.
*   **Secondary:** `surface_container_highest` (#dfe3e7) background with `primary` text.
*   **Accent (Gold):** Reserved for high-conversion actions (e.g., "Book Now"). Use `tertiary_fixed_dim` (#f7be1d) with `on_tertiary_fixed` (#251a00).

### Cards & Lists
*   **Forbid Divider Lines:** Use vertical white space from the spacing scale to separate list items.
*   **Interactive State:** On hover, a card should shift from `surface-container-lowest` (#ffffff) to `surface-bright` (#f6fafe) with a subtle ambient shadow.

### Input Fields
*   **Form Factor:** "The Floating Label." Use a `surface-container-low` background with no border. A bottom-only `outline_variant` (20% opacity) acts as a subtle baseline.
*   **Error State:** Use `error` (#ba1a1a) for text and a `error_container` (#ffdad6) soft background glow.

### Logistics-Specific Components
*   **The Manifest Chip:** For status tracking (e.g., "In Transit"). Use high-contrast color pairings like `tertiary_container` (#251a00) background with `tertiary_fixed` (#ffdf9a) text.
*   **Route Geometry:** When displaying maps or logistics paths, use `outline` (#74777d) for inactive routes and `tertiary` (#EAB308) for the active path to draw the eye with precision.

---

## 6. Do's and Don'ts

### Do
*   **Do** use asymmetrical layouts where one column is significantly wider than the other to create an editorial feel.
*   **Do** prioritize `surface` color shifts over lines.
*   **Do** use the Navy (`primary`) for high-contrast text against Slate (`surface-variant`) backgrounds.
*   **Do** embrace negative space; if a screen feels crowded, remove a container, don't shrink the text.

### Don't
*   **Don't** use 100% opaque, high-contrast borders. It breaks the "Architectural Horizon" feel.
*   **Don't** use aggressive roundness. Stick strictly to the `ROUND_FOUR` (0.25rem) limit to keep the brand feeling authoritative.
*   **Don't** use standard "blue" for links. Use `primary` (#001529) with a `tertiary` (#EAB308) underline on hover.
*   **Don't** use drop shadows for every card. Rely on the tonal layering of the `surface-container` tokens.