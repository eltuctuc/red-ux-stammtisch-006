# FEAT-1: Task-Management

## Status
Aktueller Schritt: Spec

## Abhängigkeiten
- Benötigt: Keine

---

## 1. Feature Spec
*Ausgefüllt von: /red:proto-requirements — 2026-04-03*

### Beschreibung
Der Nutzer kann Tasks mit einem Titel erfassen, bearbeiten, als erledigt markieren und löschen. Alle Daten werden im Browser-Speicher (localStorage) persistent abgelegt – Tasks überleben einen Reload ohne Datenverlust. Die gesamte Interaktion findet auf einem einzigen Screen statt.

### Definitionen
- **Task:** Ein Eintrag mit einem Titel (Text) und einem Status (offen / erledigt).
- **Offen:** Task wurde noch nicht abgehakt – erscheint als aktive Aufgabe.
- **Erledigt:** Task wurde als abgeschlossen markiert – visuell unterscheidbar, bleibt in der Liste.
- **Persistenz:** Tasks werden automatisch in localStorage gespeichert und beim nächsten Seitenaufruf geladen.

### User Stories
- Als Enrico möchte ich einen neuen Task mit einem Titel erfassen, damit ich ihn nicht vergesse.
- Als Enrico möchte ich einen bestehenden Task bearbeiten, damit ich seinen Titel korrigieren oder präzisieren kann.
- Als Enrico möchte ich einen Task als erledigt markieren, damit ich sofort sehe was noch offen ist.
- Als Enrico möchte ich einen erledigten Task wieder auf "offen" setzen, falls sich herausstellt, dass er doch noch bearbeitet werden muss.
- Als Enrico möchte ich einen Task löschen, damit er dauerhaft aus der Liste verschwindet.
- Als Enrico möchte ich, dass meine Tasks nach einem Browser-Reload noch da sind, damit ich nach dem Schließen des Browsers nahtlos weitermachen kann.

### Acceptance Criteria
- [ ] Ein neuer Task kann über ein Eingabefeld erstellt werden – Bestätigung via Enter-Taste oder dediziertem Button.
- [ ] Ein neu erstellter Task erscheint sofort in der Task-Liste, ohne Seitenreload.
- [ ] Ein bestehender Task kann bearbeitet werden; die geänderte Version wird gespeichert und sofort angezeigt.
- [ ] Ein Task kann als erledigt markiert werden; erledigte Tasks sind visuell klar unterscheidbar (z.B. durchgestrichener Text, gedämpfte Farbe).
- [ ] Ein als erledigt markierter Task kann wieder auf "offen" zurückgesetzt werden.
- [ ] Ein Task kann gelöscht werden; nach der Löschung erscheint er nicht mehr in der Liste.
- [ ] Alle Tasks werden automatisch in localStorage gespeichert und beim nächsten Seitenaufruf korrekt geladen.
- [ ] Ein Titel, der ausschließlich aus Leerzeichen besteht oder leer ist, kann nicht gespeichert werden.
- [ ] Die App läuft lokal ohne separaten Server – ein `npm run dev` genügt.

### Edge Cases
- **Leerer / Whitespace-Titel:** Eingabe von "" oder " " → Task wird nicht erstellt; Eingabefeld bleibt fokussiert, kein Fehlerdialog.
- **Sehr langer Titel:** Task mit 200+ Zeichen → UI bricht nicht; Titel wird mit Zeilenumbruch oder Truncation dargestellt.
- **Letzter Task gelöscht:** Wenn die Liste leer ist → leerer Zustand wird korrekt angezeigt (kein Fehler, kein weißer Screen).
- **Bearbeitung abgebrochen:** User beginnt den Titel zu editieren und drückt Escape → Ursprungstitel bleibt unverändert erhalten.
- **Alle Tasks erledigt:** Wenn alle Tasks abgehakt sind → Liste zeigt alle als erledigt, kein Fehler, kein Auto-Delete.
- **localStorage nicht verfügbar:** Falls localStorage blockiert ist (privater Modus bestimmter Browser) → App funktioniert für die Session, zeigt optional einen Hinweis.

### Nicht im Scope
- Sortierung oder manuelle Reihenfolge (Drag & Drop)
- Filterung nach Status (offen / erledigt)
- Kategorien, Tags, Prioritäten
- Fälligkeitsdaten
- Mehrere Listen oder Projekte
- Bulk-Operationen (z.B. alle erledigten Tasks auf einmal löschen)
- Such-/Filterfunktion
