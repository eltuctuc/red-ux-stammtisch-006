# BUG-FEAT1-UX-007: Disabled-Primary-Button nutzt opacity statt DS-spezifizierter Hintergrundfarbe

- **Feature:** FEAT-1 – Task-Management
- **Severity:** Low
- **Bereich:** Konsistenz
- **Gefunden von:** UX Reviewer
- **Status:** Open

## Problem

Die DS-Spec für den Button (`design-system/components/button.md`) definiert den Disabled-Zustand der Primary-Variante mit:

> Hintergrund: `color-primary-300` (also #93C5FD – ein helleres Blau)

Die Implementierung in `index.css` löst den Disabled-Zustand über:

```css
.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}
```

Das bedeutet: Der "Hinzufügen"-Button ist disabled und erscheint als halbdurchsichtiges Blau (#3B82F6 bei 50% Opacity), nicht als das definierte helle Blau `color-primary-300` (#93C5FD). Das resultierende visuelle Ergebnis ist ähnlich, aber nicht spezifikationskonform.

Zusätzlich: Das Opacity-Muster ist generisch für alle Button-Varianten definiert, nicht varianten-spezifisch. Die DS-Spec definiert für jede Variante eigene Disabled-Werte.

## Steps to Reproduce

1. App öffnen, Eingabefeld leer lassen
2. "Hinzufügen"-Button im disabled Zustand betrachten
3. Farbe gegen `color-primary-300` (#93C5FD) vergleichen
4. Expected: Button-Hintergrund entspricht `color-primary-300`
4. Actual: Button-Hintergrund ist `color-primary-500` (#3B82F6) bei 50% Opacity

## Empfehlung

Disabled-State des Primary-Buttons varianten-spezifisch mit dem DS-Wert überschreiben:

```css
.btn--primary:disabled {
  background: var(--color-primary-300);
  opacity: 1;
}
```

## Priority

Nice-to-have
