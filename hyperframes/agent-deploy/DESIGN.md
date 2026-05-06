# Neurospark · TERMINAL.OS — Agent Deploy

## Style Prompt

Cinematic terminal-OS aesthetic: dark void background with a faint violet grid drift, monospaced telemetry, surgically placed neon accents. Feels like watching an autonomous system come online — clinical precision, no flourishes, every motion has purpose. Type-driven (not illustration-driven). Tech-forward but restrained — closer to Bloomberg terminal × cyberpunk OS than gaming UI. Motion is tight and confident: 0.4–0.8s entrances, snappy power3.out / expo.out / steps eases, no bouncing.

## Colors

- `#0A0B10` — canvas (ns-bg)
- `#0F1018` — surface (ns-bg-2)
- `#7C5CFF` — primary brand violet (ns-violet) — connectors, primary glow
- `#4B2FB7` — deep violet (ns-violet-deep) — gradients
- `#22D3EE` — cyan accent (ns-cyan) — secondary highlights, link-glow
- `#C6FF3C` — lime accent (ns-lime) — "ONLINE" / live status only
- `#FF3DAA` — magenta (ns-magenta) — used sparingly for alert/critical
- `#E8E6F0` — primary text (ns-text)
- `rgba(232, 230, 240, 0.55)` — dim text (ns-text-dim)
- `rgba(232, 230, 240, 0.32)` — faint text (ns-text-faint)
- `rgba(124, 92, 255, 0.18)` — line / hairline rule (ns-line)
- `rgba(124, 92, 255, 0.35)` — strong line (ns-line-strong)

## Typography

- **Display:** Space Grotesk (300/400/500) — large numerals, agent names
- **Mono:** JetBrains Mono (400/500/600) — labels, command line, IDs, timestamps
- Tracking: tight on display (-0.04em), wide on mono caps (0.15–0.2em)

## What NOT to Do

- No emoji, no icons-as-decoration. ASCII glyphs (`●`, `↗`, `//`, `[ ]`) only.
- No drop shadows. Use `box-shadow` ONLY for neon glow (violet/cyan).
- No rounded corners > 2px. This is a terminal, not a SaaS.
- No gradient text. Color is solid; emphasis comes from weight + glow.
- No sans-serif body text under 16px — use mono for anything under 16px.
- No motion bounces (`back.out`, `elastic.out`). Use power3, expo, steps.
- No center-alignment for body text. Left-align everything that's read.
