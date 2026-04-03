# BUG-FEAT1-QA-004: aria-live Region verschwindet beim letzten Task-Delete – Screen Reader bekommt keine Ankündigung

- **Feature:** FEAT-1 – Task-Management
- **Severity:** Medium
- **Bereich:** A11y
- **Gefunden von:** QA Engineer
- **Status:** Fixed — 2026-04-03

## Fix
aria-live Wrapper-div in TaskList.tsx – live region bleibt persistent beim Wechsel zwischen Liste und Empty State.

## Beschreibung

Wenn der letzte Task gelöscht wird, wechselt `TaskList` von:
- `<ul aria-live="polite" aria-label="Task-Liste">` (mit Items)

zu:
- `<div role="status">` (Empty State)

Die `aria-live="polite"`-Region wird dabei komplett aus dem DOM entfernt. Screen Reader kündigen Änderungen in Live-Regionen nur an, wenn der **Inhalt der Region** sich ändert – nicht wenn die Region selbst ersetzt wird.

Das Ergebnis: Beim Löschen des letzten Tasks gibt es keine Screen Reader Ankündigung des leeren Zustands. Der Nutzer weiß nicht, dass die Liste jetzt leer ist.

`role="status"` auf dem Empty State impliziert zwar eine implizite Live-Region (entspricht `aria-live="polite"`), aber nur bei initialem Render enthält sie bereits Inhalt – dadurch wird sie von vielen Screen Readern beim ersten Erscheinen nicht angekündigt.

## Steps to Reproduce

1. App mit Screen Reader öffnen (z.B. VoiceOver auf macOS)
2. Einen einzigen Task hinzufügen
3. Den Task über den Delete-Button löschen
4. Expected: Screen Reader kündigt den leeren Zustand an (z.B. "Noch keine Tasks")
5. Actual: Screen Reader bleibt still – keine Ankündigung des leeren Zustands

## Technische Ursache

Die Live-Region (`<ul aria-live="polite">`) wird durch eine komplett andere DOM-Struktur (`<div role="status">`) ersetzt, anstatt dass die Live-Region im DOM verbleibt und ihr Inhalt aktualisiert wird.

## Betroffene Dateien

- `projekt/src/components/TaskList.tsx` – bedingte Renderverzweigung Zeilen 24-38 vs. 40-61

## Priority

Fix before release
