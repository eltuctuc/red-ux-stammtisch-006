# BUG-FEAT1-UX-006: Input focus-Zustand weicht von DS-Spec ab (Box-Shadow)

- **Feature:** FEAT-1 – Task-Management
- **Severity:** Low
- **Bereich:** Konsistenz
- **Gefunden von:** UX Reviewer
- **Status:** Open

## Problem

Die DS-Spec für das Input-Feld (`design-system/components/input.md`) definiert den Focus-Zustand als:

> Border: `color-border-focus` (2px), **kein Box-Shadow**

Die Implementierung in `TaskInput.css` setzt im Focus-Zustand zusätzlich:

```css
box-shadow: var(--shadow-xs);
```

Das ist eine nicht-autorisierte Abweichung vom Design System. Der `shadow-xs`-Wert ist minimal (`0 1px 2px 0 rgb(0 0 0 / 0.05)`), aber er ist laut Spec explizit nicht vorgesehen.

## Steps to Reproduce

1. App öffnen
2. In das Eingabefeld "Neuen Task eingeben..." klicken oder per Tab fokussieren
3. Visuellen Focus-Zustand inspizieren (DevTools: Computed Styles)
4. Expected: 2px Border in `color-border-focus`, kein Box-Shadow
4. Actual: 2px Border in `color-border-focus` + Box-Shadow `0 1px 2px 0 rgb(0 0 0 / 0.05)`

## Empfehlung

`box-shadow: var(--shadow-xs)` aus dem `.task-input__field:focus`-Block in `TaskInput.css` entfernen.

## Priority

Fix before release
