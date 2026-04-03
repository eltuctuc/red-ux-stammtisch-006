# BUG-FEAT1-QA-009: useLocalStorage schreibt asynchron via useEffect – minimales Persistenz-Timing-Fenster

- **Feature:** FEAT-1 – Task-Management
- **Severity:** Low
- **Bereich:** Functional
- **Gefunden von:** QA Engineer (Retest-Durchlauf 2)
- **Status:** Open

## Beschreibung

Das Refactoring von `useLocalStorage.ts` (Fix für BUG-FEAT1-QA-001) hat das Schreib-Pattern von synchron auf asynchron geändert. Das vorherige Pattern schrieb direkt im Set-Aufruf in `localStorage`. Das neue Pattern schreibt in einem `useEffect` nach dem Render.

```typescript
// Neues Pattern:
useEffect(() => {
  window.localStorage.setItem(key, JSON.stringify(storedValue));
}, [key, storedValue]);
```

Zwischen dem `setTasks(...)`-Aufruf und der Ausführung des `useEffect` existiert ein Render-Fenster (typisch < 16ms), in dem der React-State aktuell ist, `localStorage` aber noch den Vorgängerwert enthält.

## Szenario

1. Nutzer fügt Task hinzu via `addTask()`
2. React State wird synchron aktualisiert (Task in Memory)
3. Browser-Tab wird hart geschlossen (Crash, Force-Quit, Browser-Kill) BEVOR der useEffect-Callback ausgeführt wurde
4. Expected: Task ist nach Reload aus localStorage wiederherstellbar
5. Actual: Task ist verloren – localStorage enthält noch den Stand vor dem CRUD-Aufruf

## Warum jetzt?

Das vorherige Pattern hatte einen stale-Closure-Bug (BUG-FEAT1-QA-001), der in bestimmten Szenarien Updates verloren hat. Das neue Pattern behebt den Stale-Closure-Bug korrekt, tauscht ihn aber gegen ein minimales Timing-Fenster. Das Timing-Fenster ist erheblich kleiner als das Stale-Closure-Risiko – der Trade-off ist vertretbar. Das Finding ist dokumentiert, damit es bewusst akzeptiert oder adressiert werden kann.

## Einschätzung

Das Fenster ist minimal und tritt nur bei abruptem Tab-Abbruch innerhalb eines Render-Zyklus auf. In der Praxis kein reproduzierbares Problem. Kein echter Blocking-Bug. Dokumentation für Awareness.

## Betroffene Dateien

- `projekt/src/hooks/useLocalStorage.ts` – Zeilen 13-19

## Priority

Nice-to-have
