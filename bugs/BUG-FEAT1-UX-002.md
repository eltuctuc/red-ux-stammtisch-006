# BUG-FEAT1-UX-002: Farbkontrast erledigter Tasks unterschreitet WCAG AA

- **Feature:** FEAT-1 – Task-Management
- **Severity:** High
- **Bereich:** A11y
- **Gefunden von:** UX Reviewer
- **Status:** Open

## Problem

Erledigte Tasks verwenden `color-text-disabled` (`color-neutral-400`, #9CA3AF) auf weissem Hintergrund (`color-neutral-0`, #FFFFFF). Das ergibt ein Kontrastverhältnis von ca. 2.6:1.

WCAG 2.1 AA verlangt 4.5:1 für normalen Text. Der Wert liegt weit darunter – Text ist für sehschwache Nutzer und in schlechten Lichtverhältnissen kaum lesbar.

Hinweis: Die UX-Spec (Abschnitt "Barrierefreiheit") benennt dieses Problem explizit und empfiehlt `color-neutral-500` (#6B7280) als Alternative. Dieser Wert ergibt ca. 4.6:1 und erfüllt WCAG AA knapp. Implementiert ist dennoch der nicht konforme Wert `color-neutral-400`.

## Steps to Reproduce

1. Einen Task anlegen
2. Task als erledigt markieren (Checkbox anklicken)
3. Durchgestrichenen Task-Titel visuell und per Kontrastprüfung (z.B. DevTools "Accessibility") bewerten
4. Expected: Kontrastverhältnis >= 4.5:1 (WCAG AA)
4. Actual: Kontrastverhältnis ~2.6:1 (#9CA3AF auf #FFFFFF)

## Empfehlung

`color-text-disabled` in `.task-item--done .task-item__title` durch `color-neutral-500` (#6B7280, ~4.6:1) ersetzen. Alternativ den Token `color-text-disabled` in `index.css` auf `color-neutral-500` umbiegen – dann aber prüfen ob das an anderen Stellen visuelle Auswirkungen hat.

## Priority

Fix before release
