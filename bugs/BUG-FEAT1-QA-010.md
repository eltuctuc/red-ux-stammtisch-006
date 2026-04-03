# BUG-FEAT1-QA-010: Verschachtelte aria-live-Regionen durch role="status" im aria-live-Wrapper

- **Feature:** FEAT-1 – Task-Management
- **Severity:** Low
- **Bereich:** A11y
- **Gefunden von:** QA Engineer (Retest-Runde 3)
- **Status:** Open

## Beschreibung

In `TaskList.tsx` ist der Outer-Wrapper `<div aria-live="polite">`. Darin befindet sich im Empty State ein `<div className="task-empty" role="status">`. `role="status"` impliziert ebenfalls `aria-live="polite"` – das ergibt eine verschachtelte live Region, was laut ARIA-Spec zwar technisch erlaubt aber nicht empfohlen ist. Manche AT können doppelte Announcements erzeugen.

## Fix

`role="status"` vom Empty-State-Div entfernen. Der Outer-Wrapper `aria-live="polite"` reicht aus.

## Betroffene Dateien

- `projekt/src/components/TaskList.tsx`

## Priority

Nice-to-have
