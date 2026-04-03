# BUG-FEAT1-QA-007: localStorage-Fehlerfall zeigt keinen Hinweis – Spec fordert optionalen Hinweis

- **Feature:** FEAT-1 – Task-Management
- **Severity:** Low
- **Bereich:** Functional
- **Gefunden von:** QA Engineer
- **Status:** Open

## Beschreibung

Die Spec definiert unter Edge Cases:
> **localStorage nicht verfügbar:** Falls localStorage blockiert ist (privater Modus bestimmter Browser) → App funktioniert für die Session, zeigt **optional** einen Hinweis.

Die Implementierung in `useLocalStorage.ts` fängt den `catch`-Fall kommentarlos ab:

```ts
} catch {
  // localStorage not available – app works for the session
  setStoredValue(value);
}
```

Es gibt keinen Mechanismus, um den Fehlerfall nach außen zu kommunizieren. `useLocalStorage` gibt nur `[storedValue, setValue]` zurück – kein `isAvailable`-Flag, kein `error`-State. `useTasks` und alle Komponenten haben keine Möglichkeit, dem Nutzer den Hinweis anzuzeigen, der laut Spec optional möglich sein soll.

Dasselbe gilt für den initialen Read: bei `JSON.parse`-Fehler (korrupte Daten) werden Tasks still verworfen, ohne jeden Hinweis. Der Nutzer sieht eine leere Liste und weiß nicht ob seine Tasks weg sind oder ob ein Fehler vorliegt.

## Steps to Reproduce

1. Browser-localStorage deaktivieren (z.B. über DevTools → Application → localStorage → löschen + `localStorage.setItem` überschreiben mit Fehler-Throw)
2. Task hinzufügen
3. Expected: App funktioniert in der Session; optionaler Hinweis "Tasks werden nicht gespeichert" ist möglich
4. Actual: App funktioniert lautlos; kein Hinweis; kein Mechanismus für die UI, den Fehler anzuzeigen

## Betroffene Dateien

- `projekt/src/hooks/useLocalStorage.ts` – Zeilen 8-10, 15-20

## Priority

Nice-to-have
