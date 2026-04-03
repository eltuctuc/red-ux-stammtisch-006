# BUG-FEAT1-UX-004: Icon-Buttons zu klein (32x32px statt min. 44x44px)

- **Feature:** FEAT-1 – Task-Management
- **Severity:** Medium
- **Bereich:** A11y
- **Gefunden von:** UX Reviewer
- **Status:** Open

## Problem

Alle Icon-Buttons (Edit, Delete, Save, Cancel) sind mit `width: 32px; height: 32px` implementiert (`.btn--sm.btn--icon`). Das ist die tatsächliche Trefferfläche.

WCAG 2.5.5 (Level AA) und UX-Standards verlangen ein Mindest-Touch-Target von 44x44px. Bei 32x32px fehlen 12px in jeder Dimension – auf einem Touch-Gerät sind diese Buttons schwer präzise zu treffen. Der Edit-Button und der Delete-Button sitzen direkt nebeneinander, was bei zu kleinen Targets zu Fehlerklicks führt (Edit statt Delete oder umgekehrt).

Der Spacing zwischen den beiden Buttons ist `spacing-3` (12px) – das reicht, wenn die Targets die richtige Grösse hätten. Zusammen mit den zu kleinen Targets entsteht aber ein kritischer Bereich mit hoher Fehlerklick-Wahrscheinlichkeit.

## Steps to Reproduce

1. App öffnen und Task hinzufügen
2. Auf einem Touch-Gerät oder mit reduzierter Motorik Edit- oder Delete-Button antippen
3. Expected: Button reagiert zuverlässig in einem 44x44px Bereich
4. Actual: Trefferfläche beträgt nur 32x32px, Fehlklicks am Rand

## Empfehlung

Touch-Target auf 44x44px erweitern ohne die visuelle Grösse zu verändern: `min-width: 44px; min-height: 44px` mit zentriertem Icon-Inhalt, oder ein unsichtbares Pseudo-Element (`::before`) mit `content: ''`, `position: absolute`, `inset: -6px` als erweitertes Hit-Area.

## Priority

Nice-to-have
