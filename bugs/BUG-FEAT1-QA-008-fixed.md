# BUG-FEAT1-QA-008: Fokus nach Speichern im Edit-Modus landet nicht auf Edit-Button

- **Feature:** FEAT-1 – Task-Management
- **Severity:** Medium
- **Bereich:** A11y
- **Gefunden von:** QA Engineer
- **Status:** Fixed — 2026-04-03

## Fix
Fokus-Return nach Edit-Save: gleicher Fix wie QA-002 (editButtonRef + wasEditingRef).

## Beschreibung

Wenn ein Task im Edit-Modus per Enter oder Save-Button gespeichert wird, wechselt der Task zurück in den Normalmodus. Der Fokus springt dabei nicht zurück auf den Edit-Button des gespeicherten Tasks – der Keyboard-Kontext geht verloren.

Dieses Problem gilt analog zu BUG-FEAT1-QA-002 (Fokus beim Abbrechen), betrifft aber den Speicher-Pfad. Beide Pfade (Save und Cancel) müssen den Fokus korrekt zurückgeben.

Die Spec definiert unter Navigation nach Aktionen (verbindlich):
> S-01 (Edit) → Enter oder Save-Icon → S-01: Titel gespeichert, Edit-Modus verlassen

Der Keyboard-User erwartet nach dem Speichern, dass sein Fokus auf dem Edit-Button des gerade gespeicherten Tasks verbleibt – damit er sofort weitere Aktionen (erneut bearbeiten, löschen, weiter tabben) ausführen kann.

## Steps to Reproduce

1. App mit Tastatur bedienen (ohne Maus)
2. Tab bis zum Edit-Button eines Tasks, Enter drücken
3. Titel im Edit-Input ändern
4. Enter drücken (Speichern)
5. Expected: Fokus liegt auf dem Edit-Button des soeben gespeicherten Tasks
6. Actual: Fokus geht verloren oder landet auf einem undefinierten Element

## Technische Ursache

`updateTask` in `useTasks.ts` setzt `editingId` auf `null` (Zeile 29), triggert Re-Render. `TaskItem` wechselt in den Normal-Modus. Es gibt keine `ref` auf den Edit-Button und keinen Mechanismus, nach dem Re-Render den Fokus darauf zu setzen.

## Betroffene Dateien

- `projekt/src/components/TaskItem.tsx`
- `projekt/src/hooks/useTasks.ts` – `updateTask` Zeile 29

## Priority

Fix before release
