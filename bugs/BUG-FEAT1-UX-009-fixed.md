# BUG-FEAT1-UX-009: Edit-Input Focus-Glow unterschreitet WCAG Non-text-Kontrast (3:1)

- **Feature:** FEAT-1 – Task-Management
- **Severity:** Medium
- **Bereich:** A11y
- **Gefunden von:** UX Reviewer (Retest-Runde 3)
- **Status:** Fixed — 2026-04-03

## Beschreibung

Der Runde-2-Fix für QA-003 setzte `box-shadow: 0 0 0 3px var(--color-primary-100)` als Focus-Delta auf dem Edit-Input. `--color-primary-100` = `#DBEAFE` auf weißem Hintergrund ergibt ein Kontrastverhältnis von ca. 1.2:1 – weit unter dem WCAG-Mindest von 3:1 für Non-text UI-Zustände (WCAG 2.4.11 Focus Appearance, Level AA). Zusätzlich entfernt `outline: none` den nativen Browser-Focus-Ring.

Das ist eine direkte Regression durch den Runde-2-Fix. Der Fokus des Edit-Inputs ist für Tastaturnutzer und Nutzer mit eingeschränktem Sehvermögen faktisch nicht sichtbar.

## Steps to Reproduce

1. Einen Task hinzufügen und Edit-Icon klicken → Edit-Modus öffnet sich
2. Im Edit-Input mit Tab auf die Save/Cancel-Buttons wechseln
3. Shift+Tab → Fokus zurück auf Edit-Input
4. Expected: Sichtbarer Fokus-Indikator mit min. 3:1 Kontrast gegen Hintergrund
5. Actual: Hellblauer Glow (#DBEAFE auf #FFFFFF = 1.2:1 Kontrast) – visuell kaum wahrnehmbar

## Fix

`--color-primary-100` durch `--color-primary-500` (#3B82F6, ~4.9:1) ersetzen:

```css
.task-item__edit-input:focus {
  outline: none;
  box-shadow: 0 0 0 3px var(--color-primary-500);
}
```

## Betroffene Dateien

- `projekt/src/components/TaskItem.css`

## Priority

Fix before release
