# Product Flows
*Erstellt von: /red:proto-flows — 2026-04-03*
*Letzte Aktualisierung: 2026-04-03*

> Dieses Dokument ist die verbindliche Navigations-Referenz.
> Kein Screen darf ohne Eintrag hier mit einem anderen verbunden werden.
> Änderungen erfordern eine explizite Entscheidung des UX Designers.

## Screens

| Screen-ID | Screen-Name  | Route | Feature  | Typ  |
|-----------|--------------|-------|----------|------|
| S-01      | Task-Liste   | /     | FEAT-1   | Page |

## Einstiegspunkte

| Kontext   | Einstiegs-Screen | Bedingung |
|-----------|------------------|-----------|
| App-Start | S-01             | –         |

## Screen Transitions

Alle Aktionen verbleiben auf S-01. Es gibt kein Routing zu anderen Screens.
Transitions beschreiben Zustandsänderungen innerhalb des Screens.

| Von        | Trigger                                      | Wohin      | Bedingung                            | Feature |
|------------|----------------------------------------------|------------|--------------------------------------|---------|
| S-01       | Enter-Taste oder "Hinzufügen"-Button         | S-01       | Titel nicht leer / nicht nur Spaces  | FEAT-1  |
| S-01       | Enter-Taste oder "Hinzufügen"-Button         | S-01       | Titel leer oder nur Spaces → kein neuer Task, Fokus bleibt im Eingabefeld | FEAT-1  |
| S-01       | Edit-Aktion auf Task (z.B. Doppelklick oder Edit-Icon) | S-01 | Task wechselt in Inline-Edit-Modus   | FEAT-1  |
| S-01 (Edit-Modus) | Enter-Taste oder Speichern-Aktion   | S-01       | Geänderter Titel nicht leer → gespeichert | FEAT-1  |
| S-01 (Edit-Modus) | Escape-Taste                        | S-01       | Ursprungstitel bleibt erhalten       | FEAT-1  |
| S-01       | Checkbox-Klick auf offenen Task              | S-01       | Task wechselt zu Status "Erledigt"   | FEAT-1  |
| S-01       | Checkbox-Klick auf erledigten Task           | S-01       | Task wechselt zurück zu Status "Offen" | FEAT-1  |
| S-01       | Löschen-Aktion auf Task                      | S-01       | Task wird permanent entfernt         | FEAT-1  |

## Offene Transitions

Transitions die während der Implementierung als fehlend gemeldet wurden und noch nicht definiert sind:

| Gemeldet von | Von Screen | Situation | Status |
|--------------|------------|-----------|--------|
| –            | –          | –         | –      |

*(Wird vom `frontend-developer` befüllt wenn eine Transition fehlt. UX Designer muss entscheiden und Tabelle oben ergänzen.)*
