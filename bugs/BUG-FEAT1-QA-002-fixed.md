# BUG-FEAT1-QA-002: Fokus nach Abbrechen des Edit-Modus geht verloren

- **Feature:** FEAT-1 – Task-Management
- **Severity:** Medium
- **Bereich:** A11y
- **Gefunden von:** QA Engineer
- **Status:** Fixed — 2026-04-03

## Fix
Fokus-Return nach Edit-Cancel: editButtonRef + wasEditingRef in TaskItem.tsx.

## Beschreibung

Wenn ein Keyboard-User den Edit-Modus per Escape-Taste oder Cancel-Button abbricht, wird der Fokus nicht auf ein sinnvolles Element zurückgesetzt. Der Fokus landet auf dem `<body>` oder einem unvorhersehbaren Element – der Keyboard-Kontext des Nutzers geht verloren.

Die Spec definiert unter Barrierefreiheit: "Keyboard-Navigation: Tab durch Tasks; Enter/Space zum Aktivieren von Checkbox; Escape zum Abbrechen." Das impliziert eine vollständige Keyboard-Journey. Nach Cancel sollte der Fokus auf den Edit-Button des betreffenden Task-Items zurückspringen.

## Steps to Reproduce

1. App im Browser öffnen
2. Tab-Navigation bis zum Edit-Button eines Tasks
3. Enter drücken → Edit-Modus öffnet sich, Fokus liegt im Edit-Input (korrekt)
4. Escape drücken → Edit-Modus schließt sich
5. Expected: Fokus liegt wieder auf dem Edit-Button des bearbeiteten Tasks
6. Actual: Fokus geht verloren (landet auf body oder einem nicht vorhersehbaren Element)

## Betroffene Dateien

- `projekt/src/components/TaskItem.tsx` – `cancelEditing`-Logik und `useEffect` für Edit-Modus
- `projekt/src/hooks/useTasks.ts` – `cancelEditing`-Funktion ohne Fokus-Rückgabe-Mechanismus

## Technische Ursache

`cancelEditing` in `useTasks.ts` setzt nur `editingId` auf `null`. Es gibt keinen Mechanismus, der nach dem Schließen des Edit-Modus den Fokus auf den Edit-Button des entsprechenden Task-Items legt. `TaskItem` müsste dafür eine `ref` auf den Edit-Button halten und `onCancelEdit` müsste nach dem Schließen darauf fokussieren – oder der übergeordnete Callback gibt die ID zurück, damit `TaskItem` die Fokus-Rückgabe selbst übernimmt.

## Priority

Fix before release
