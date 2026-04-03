# BUG-FEAT1-QA-006: Test-Coverage fehlt für updateTask mit Whitespace-only Titel

- **Feature:** FEAT-1 – Task-Management
- **Severity:** Low
- **Bereich:** Functional
- **Gefunden von:** QA Engineer
- **Status:** Fixed — 2026-04-03

## Fix
Test updateTask with whitespace-only title does not change anything in useTasks.test.ts ergänzt.

## Beschreibung

Die Spec definiert unter Test-Setup explizit:
> `updateTask` mit leerem Titel → keine Änderung

Der implementierte Test in `useTasks.test.ts` prüft nur den leeren String `''`:

```ts
it('updateTask with empty title does not change anything', () => {
  act(() => { result.current.updateTask(id, ''); });
  expect(result.current.tasks[0].title).toBe('Keep this');
});
```

Der analoge Whitespace-only-Fall (`'   '`) – der in `addTask` explizit getestet wird – fehlt für `updateTask`. Der Hook selbst behandelt ihn korrekt (via `trim()`), aber der Test-Case fehlt vollständig.

Das ist eine Test-Lücke bei einer explizit spezifizierten Anforderung: "Ein Titel, der ausschließlich aus Leerzeichen besteht oder leer ist, kann nicht gespeichert werden." – dieser Satz gilt für das Erstellen UND für das Bearbeiten.

## Steps to Reproduce

1. In `useTasks.test.ts` den Test für `updateTask` mit `'   '` (Whitespace) ausführen
2. Expected: Test existiert und ist grün
3. Actual: Test existiert nicht

## Betroffene Dateien

- `projekt/src/__tests__/useTasks.test.ts` – kein Test für `updateTask` mit Whitespace-only

## Priority

Fix before release
