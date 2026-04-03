# BUG-FEAT1-QA-011: btn--icon::before Touch-Target durch overflow:hidden der task-list geclipt

- **Feature:** FEAT-1 – Task-Management
- **Severity:** Low
- **Bereich:** A11y
- **Gefunden von:** QA Engineer (Retest-Runde 3)
- **Status:** Open

## Beschreibung

`.task-list` hat `overflow: hidden` (für den border-radius). Das pseudo-Element `::before { inset: -6px }` auf `.btn--icon` wird an den Rändern der `.task-list` geclipt. Das erste und letzte Task-Item haben damit reduzierte Touch-Targets am oberen und unteren Rand (32px statt 44px).

Das betrifft Edge-Items in der Liste und ist kein vollständiger Ausfall – die meisten Klicks auf Icon-Buttons treffen noch immer den 32px-Kern.

## Fix

`overflow: hidden` auf `.task-list` durch `overflow: clip` ersetzen (erlaubt border-radius ohne Clipping von Pseudo-Elementen) oder `overflow: visible` + `border-radius` mit `clip-path` kombinieren.

## Betroffene Dateien

- `projekt/src/components/TaskList.css`

## Priority

Nice-to-have
