# BUG-FEAT1-UX-005: Kein Fokus-Return nach Edit-Save oder Edit-Cancel

- **Feature:** FEAT-1 – Task-Management
- **Severity:** Medium
- **Bereich:** A11y
- **Gefunden von:** UX Reviewer
- **Status:** Open

## Problem

Wenn der Nutzer den Inline-Edit-Modus verlässt – entweder durch Speichern (Enter / Save-Button) oder Abbrechen (Escape / Cancel-Button) – wird der Fokus nicht zurück auf den Edit-Button des entsprechenden Task-Items gesetzt.

Nach dem Verlassen des Edit-Modus "verschwindet" der Fokus: Der Browser setzt ihn je nach Implementierung entweder auf `<body>` oder auf das nächste fokussierbare Element im DOM. Das ist ein klassischer A11y-Bruch für Tastaturnutzer und Screen-Reader-Nutzer – der Nutzer verliert die Position in der Liste und muss sich neu orientieren.

Die UX-Spec Abschnitt "Barrierefreiheit" definiert: "Escape zum Abbrechen" und "Enter zum Starten/Speichern von Inline-Edit" – impliziert ist der korrekte Fokus-Return nach der Aktion. WCAG 2.4.3 (Focus Order) und 3.2.2 (On Input) unterstützen diese Anforderung.

## Steps to Reproduce

1. App öffnen, Task hinzufügen
2. Mit Tab-Taste zum Edit-Button navigieren, Enter drücken (Edit-Modus öffnet)
3. Im Edit-Input eine Änderung vornehmen, Enter drücken (Speichern)
4. Expected: Fokus liegt auf dem Edit-Button des gerade gespeicherten Tasks
4. Actual: Fokus ist undefiniert / springt zu einer unerwarteten Position

Gleiches gilt für Escape/Cancel.

## Empfehlung

In `TaskItem.tsx` einen `ref` auf den Edit-Button legen. Nach `onUpdate()` und nach `onCancelEdit()` diesen Ref via `.focus()` aufrufen. Die Logik kann im `useEffect` auf `isEditing`-Wechsel von `true` nach `false` abgebildet werden.

## Priority

Fix before release
