# BUG-FEAT1-QA-001: Stale Closure in useTasks – CRUD-Operationen lesen veralteten State

- **Feature:** FEAT-1 – Task-Management
- **Severity:** High
- **Bereich:** Functional
- **Gefunden von:** QA Engineer
- **Status:** Open

## Beschreibung

In `useTasks.ts` referenzieren alle vier CRUD-Funktionen (`addTask`, `toggleTask`, `updateTask`, `deleteTask`) die Variable `tasks` direkt aus dem Closure des Hooks statt den funktionalen Update-Pattern `setTasks(prev => ...)` zu verwenden.

```ts
// Aktueller Code – problematisch:
function addTask(title: string): void {
  setTasks([newTask, ...tasks]);  // tasks könnte veraltet sein
}

// Korrekt wäre:
function addTask(title: string): void {
  setTasks(prev => [newTask, ...prev]);
}
```

Dasselbe gilt für `toggleTask`, `updateTask` und `deleteTask`.

## Steps to Reproduce

1. Zwei State-Updates werden in einem einzigen React-Render-Zyklus ausgelöst (z.B. durch React Concurrent Mode, automatisches Batching in React 18, oder programmatische schnelle Aufrufe)
2. Zweiter Aufruf liest den State vor dem ersten Update
3. Expected: Beide Änderungen sind im finalen State sichtbar
4. Actual: Der erste Update wird vom zweiten überschrieben – eine Mutation geht verloren

## Warum jetzt noch nicht sichtbar

React 18 batcht State-Updates in Event-Handlers automatisch. Im normalen UI-Fluss (ein Klick = ein Update) tritt das Problem nicht auf. Es tritt auf bei: programmatischen Mehrfach-Aufrufen, Concurrent Mode Transitions, oder zukünftigen Features die mehrere Tasks gleichzeitig manipulieren.

## Betroffene Dateien

- `projekt/src/hooks/useTasks.ts` – Zeilen 18, 22, 27-28, 33

## Priority

Fix before release
