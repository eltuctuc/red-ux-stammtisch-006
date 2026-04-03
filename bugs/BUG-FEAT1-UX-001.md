# BUG-FEAT1-UX-001: Task-App zentriert sich nicht im Viewport

- **Feature:** FEAT-1 – Task-Management
- **Severity:** High
- **Bereich:** Layout
- **Gefunden von:** UX Reviewer
- **Status:** Open

## Problem

Die UX-Spec definiert unter "Layout (Desktop, zentriert)": Max-Breite 600px, zentriert. Die Komponente `.task-app` setzt `max-width: 600px` und `width: 100%`, hat aber kein `margin: 0 auto`. Die Zentrierung kommt derzeit ausschliesslich vom Eltern-Element `#root` (flexbox mit `align-items: center`). Das ist eine fragile Abhängigkeit – sobald `TaskApp` in einen anderen Container eingebettet wird (z.B. bei Layout-Erweiterungen), rutscht die App linksbündig.

Das Layout-Verhalten der Komponente sollte in sich selbst definiert sein, nicht vom Kontext abhängig sein.

## Steps to Reproduce

1. App öffnen
2. DevTools öffnen, `#root` inspizieren
3. `align-items: center` auf `#root` entfernen oder deaktivieren
4. Expected: Task-App bleibt zentriert (max-width 600px, margin auto)
4. Actual: Task-App springt linksbündig an den Rand

## Empfehlung

`margin: 0 auto` zu `.task-app` in `TaskApp.css` hinzufügen, damit die Zentrierung komponentenintern gesichert ist und nicht vom Eltern-Kontext abhängt.

## Priority

Fix before release
