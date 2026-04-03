# BUG-FEAT1-QA-005: aria-checked auf nativem <input type="checkbox"> ist redundant und kann zu doppelter Ansage führen

- **Feature:** FEAT-1 – Task-Management
- **Severity:** Low
- **Bereich:** A11y
- **Gefunden von:** QA Engineer
- **Status:** Fixed — 2026-04-03

## Fix
aria-checked auf native <input type=checkbox> entfernt – redundante ARIA-Rolle.

## Beschreibung

In `TaskItem.tsx` wird auf dem nativen `<input type="checkbox">` explizit `aria-checked` gesetzt:

```tsx
<input
  type="checkbox"
  checked={task.done}
  aria-checked={task.done}   // redundant und ARIA-widrig
  ...
/>
```

Laut WAI-ARIA Authoring Practices: Das `aria-checked`-Attribut darf auf nativen `<input type="checkbox">`-Elementen **nicht** gesetzt werden, da der Browser den Checked-State bereits nativ über die Accessibility API kommuniziert. Das explizite `aria-checked` kann bei einigen Screenreader/Browser-Kombinationen zu einer doppelten Ansage des Zustands führen (z.B. "Checkbox angehakt angehakt").

Dies gilt für beide Vorkommen im `TaskItem`-Component: den normalen Modus (Zeile 129-131) und den Edit-Modus (Zeile 87-89).

## Steps to Reproduce

1. App mit NVDA (Windows) oder VoiceOver (macOS) öffnen
2. Zu einer Checkbox navigieren (Tab)
3. Expected: Screen Reader liest z.B. "Task erledigt markieren: Buy milk, Checkbox, nicht angehakt"
4. Actual: Bei bestimmten Screenreader/Browser-Kombinationen kann der State doppelt angesagt werden

## Betroffene Dateien

- `projekt/src/components/TaskItem.tsx` – Zeilen 87, 129

## Priority

Nice-to-have
