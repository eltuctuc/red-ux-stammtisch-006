# FEAT-1: Task-Management

## Status
Aktueller Schritt: UX

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

---

## 2. UX Entscheidungen
*Ausgefüllt von: /red:proto-ux — 2026-04-03*

### Einbettung im Produkt
Einziger Screen der App. Alle CRUD-Operationen laufen inline auf diesem Screen.
Route: `/`

### Einstiegspunkte
App-Start → S-01 direkt (kein Onboarding, kein Login, keine Zwischenseite).

### User Flow

```
App öffnen
    ↓
S-01: Task-Liste (ggf. leer mit Empty State)
    ↓
[Eingabefeld oben fokussieren]
    ↓
Titel tippen → Enter oder "Hinzufügen" Button
    ↓
Task erscheint sofort in der Liste (oben in der Liste)
    ↓
Checkbox klicken → Task als erledigt markiert (durchgestrichen, gedämpft)
    ↓
Edit-Icon klicken → Titel wird zum Input-Feld (Inline-Edit-Modus)
    │    ↓ Enter / Save → Gespeichert, zurück zur normalen Ansicht
    │    ↓ Escape → Abgebrochen, Ursprungstitel wiederhergestellt
    ↓
Delete-Icon klicken → Task sofort entfernt (kein Modal)
```

### Layout (Desktop, zentriert)

```
┌──────────────────────────────────────┐
│  [Input: "Neuen Task eingeben..."]  [Hinzufügen] │
├──────────────────────────────────────┤
│  □  Task-Titel                  ✎  🗑 │
│  □  Task-Titel                  ✎  🗑 │
│  ✓  ~~Erledigter Task~~         ✎  🗑 │
│  □  Task-Titel (im Edit-Modus):      │
│     [Input: "Task-Titel"]  [✓] [✕]   │
└──────────────────────────────────────┘
```

Max-Breite: 600px, zentriert. Seitlicher Rand: `spacing-page-x-desktop`.

### Interaktionsmuster
- **Primärmuster:** Input-at-top + Inline-List-Editing (Referenz: design-system/patterns/data-display.md – Listen)
- **Fehler-Handling:** Silent Validation – "Hinzufügen"-Button disabled bei leerem/Whitespace-Titel; kein Fehlerdialog, Fokus verbleibt im Input
- **Leerer Zustand:** Empty State mit Icon + Text "Noch keine Tasks – füge deinen ersten oben hinzu." (kein Primär-Button nötig, da Eingabefeld bereits präsent ist)
- **Ladeverhalten:** Kein Ladezustand – localStorage ist synchron, keine API-Calls

### Eingesetzte Komponenten

| Komponente       | DS-Status         | Quelle                                                    |
|------------------|-------------------|-----------------------------------------------------------|
| Input            | ✓ Vorhanden       | design-system/components/input.md                         |
| Button (primary) | ✓ Vorhanden       | design-system/components/button.md – Variant: primary     |
| Button (ghost)   | ✓ Vorhanden       | design-system/components/button.md – Variant: ghost, sm   |
| Button (danger)  | ✓ Vorhanden       | design-system/components/button.md – Variant: danger, icon-only |
| Card             | ✓ Vorhanden       | design-system/components/card.md – Variant: flat (Listen-Container) |
| Checkbox         | ⚠ Tokens-Build    | Keine Spec – genehmigt 2026-04-03. Native HTML checkbox + `color-primary-500`, `radius-sm` |
| List-Item (Task) | ⚠ Tokens-Build    | Keine Spec – genehmigt 2026-04-03. Aus data-display.md Pattern + Tokens |
| Empty State      | ⚠ Tokens-Build    | Keine Spec – genehmigt 2026-04-03. Aus feedback.md Pattern + Tokens |

### Bewusste Abweichungen vom Design System

| Abweichung | DS-Regel | Entscheidung | Begründung |
|-----------|----------|--------------|------------|
| Kein Bestätigungs-Modal beim Löschen | DS: "Danger-Buttons erst nach Bestätigung" | Direktes Löschen ohne Modal | Produkt-Kern ist Overhead-Freiheit. Single-User, persönliche Tasks, kein hochkritischer Datenverlust. Modal würde dem PRD-Grundsatz widersprechen. |

### Navigation nach Aktionen (verbindlich)

| Ausgangs-Screen | Aktion des Nutzers                       | Ziel  | Bedingung                                        |
|-----------------|------------------------------------------|-------|--------------------------------------------------|
| S-01            | Enter / "Hinzufügen" mit gültigem Titel  | S-01  | Task erscheint oben in der Liste, Input geleert  |
| S-01            | Enter / "Hinzufügen" mit leerem Titel    | S-01  | Kein neuer Task, Fokus bleibt im Input           |
| S-01            | Checkbox klick (offener Task)            | S-01  | Status → Erledigt, visuell aktualisiert          |
| S-01            | Checkbox klick (erledigter Task)         | S-01  | Status → Offen, visuell aktualisiert             |
| S-01            | Edit-Icon klick                          | S-01  | Task wechselt in Inline-Edit-Modus               |
| S-01 (Edit)     | Enter oder Save-Icon                     | S-01  | Titel gespeichert, Edit-Modus verlassen          |
| S-01 (Edit)     | Escape oder Cancel-Icon                  | S-01  | Ursprungstitel wiederhergestellt                 |
| S-01            | Delete-Icon klick                        | S-01  | Task sofort entfernt                             |

*(Vollständige Navigations-Abfolgen auch in flows/product-flows.md)*

### DS-Status dieser Implementierung
- **Konforme Komponenten:** Input, Button (primary, ghost, danger), Card (flat)
- **Neue Komponenten (Tokens-Build, genehmigt):** Checkbox, List-Item/Task-Item, Empty State
- **Bewusste Abweichungen:** Kein Bestätigungs-Modal beim Löschen (Single-User-Kontext, Overhead-freies Design)

### Barrierefreiheit (A11y)
- **Keyboard-Navigation:** Tab durch Tasks; Enter/Space zum Aktivieren von Checkbox; Enter zum Starten/Speichern von Inline-Edit; Escape zum Abbrechen; Tab auf Delete-Icon aktiviert Löschen via Enter
- **Screen Reader:** `aria-label="Task erledigt markieren"` auf Checkboxen; `aria-checked` state; `aria-label="[Task-Titel] bearbeiten"` / `"[Task-Titel] löschen"` auf Icon-Buttons; `aria-live="polite"` auf der Task-Liste für dynamische Updates
- **Farbkontrast:** Erledigte Tasks: `color-text-disabled` (`color-neutral-400`) auf `color-neutral-0` – ggf. `color-neutral-500` verwenden. Referenz: design-system/tokens/colors.md

### Mobile-Verhalten
Mobile-Optimierung nicht im Scope gemäß PRD (Out-of-Scope: "Mobile-Optimierung").
