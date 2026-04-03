# FEAT-1: Task-Management

## Status
Aktueller Schritt: Dev (Runde 3 QA: 1 Medium-Regression offen – UX-009, Fix läuft)

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

---

## 3. Technisches Design
*Ausgefüllt von: /red:proto-architect — 2026-04-03*

### Component-Struktur

```
App
└── TaskApp                      ← Haupt-Container (max-width 600px, zentriert)
    ├── TaskInput                ← Eingabezeile oben
    │   ├── <input>              ← Text-Eingabefeld (DS: Input, variant: default)
    │   └── AddButton            ← "Hinzufügen" (DS: Button, variant: primary)
    │                               disabled wenn inputValue leer / nur Whitespace
    └── TaskList                 ← Liste aller Tasks
        ├── TaskItem (×n)        ← Normalmodus: ein Task pro Zeile
        │   ├── TaskCheckbox     ← Checkbox (Tokens-Build) – toggle done/offen
        │   ├── TaskTitle        ← Titeltext; durchgestrichen wenn done
        │   ├── EditButton       ← Icon-Button (DS: Button, variant: ghost, sm)
        │   └── DeleteButton     ← Icon-Button (DS: Button, variant: danger, sm)
        ├── TaskItem (Edit-Modus) ← wenn editingId === task.id
        │   ├── TaskCheckbox     ← disabled im Edit-Modus
        │   ├── TaskEditInput    ← Input-Feld vorbefüllt mit aktuellem Titel
        │   ├── SaveButton       ← Icon-Button (DS: Button, variant: ghost, sm)
        │   └── CancelButton     ← Icon-Button (DS: Button, variant: ghost, sm)
        └── TaskEmpty            ← Tokens-Build, nur wenn tasks.length === 0
```

Keine bestehenden Komponenten wiederverwendbar – Scaffold ist vanilla Vite-Template.

### Daten-Modell

**Task-Objekt:**
- `id`: eindeutige Zeichenkette (generiert via `crypto.randomUUID()`, browser-built-in)
- `title`: Titeltext des Tasks (nicht leer, getrimmt)
- `done`: Boolean – ob der Task als erledigt markiert ist
- `createdAt`: Zeitstempel der Erstellung (Zahl) – für konsistente Reihenfolge

**Gespeichert in:** localStorage, Key `"tasks"` – serialisiert als JSON-Array.

**Reihenfolge:** Neueste Tasks oben (absteigende Sortierung nach `createdAt`).

### API / Daten-Fluss

Kein Backend – alles im Browser.

```
User-Aktion → CRUD-Funktion → tasks-State (React) → localStorage (Sync)
                                      ↓
                               Re-Render der TaskList
```

**CRUD-Operationen:**
- `addTask(title)` – neuen Task prependen, in localStorage speichern
- `toggleTask(id)` – `done`-Status invertieren, speichern
- `updateTask(id, newTitle)` – Titel ersetzen, speichern
- `deleteTask(id)` – Task aus Array entfernen, speichern

### Tech-Entscheidungen

- **Custom Hook `useTasks`:** Kapselt State (`tasks[]`, `editingId`) + alle CRUD-Funktionen. `TaskApp` konsumiert nur den Hook – kein Prop-Drilling. Keine externe State-Library nötig bei diesem Scope.
- **Custom Hook `useLocalStorage`:** Generischer Hook für localStorage-Sync (lesen beim Mount, schreiben bei Änderung). Trennt Persistenz-Logik von Business-Logik.
- **`crypto.randomUUID()`:** Browser-native UUID-Generierung – kein externes Package nötig.
- **Kein State-Management-Framework:** `useState` + Custom Hooks reichen für diesen Scope vollständig aus.

### Security-Anforderungen

- **Authentifizierung:** Nicht erforderlich – Single-User, lokal
- **Autorisierung:** Nicht erforderlich
- **Input-Validierung:** `title.trim().length > 0` vor `addTask()` und `updateTask()`. Validierung im Hook, nicht nur im UI.
- **XSS:** React escaped JSX-Ausdrücke standardmäßig – kein `dangerouslySetInnerHTML` verwenden.
- **localStorage:** Enthält nur Task-Titel (keine sensiblen Daten). Keine Verschlüsselung nötig.
- **CSRF / SQL-Injection:** Nicht relevant – kein Backend, keine Datenbank.

### Dependencies

Neue `devDependencies`:

| Package | Zweck |
|---------|-------|
| `vitest` | Test-Runner (Vite-nativ) |
| `@testing-library/react` | Komponenten-Tests |
| `@testing-library/user-event` | Simulierte User-Interaktionen in Tests |
| `jsdom` | DOM-Umgebung für Vitest |

Keine neuen Runtime-Dependencies.

### Test-Setup

**Unit Tests (`useTasks` Hook):**
- `addTask` mit gültigem Titel → Task erscheint in Liste
- `addTask` mit leerem / Whitespace-Titel → kein neuer Task
- `toggleTask` → done-Status wechselt
- `updateTask` mit gültigem Titel → Titel aktualisiert
- `updateTask` mit leerem Titel → keine Änderung
- `deleteTask` → Task nicht mehr in Liste
- localStorage-Persistenz: Nach `addTask` ist Wert im localStorage vorhanden

**Component Tests:**
- `TaskInput`: Button disabled bei leerem Input; Enter löst `addTask` aus
- `TaskItem`: Checkbox-Klick ruft `toggleTask` auf; Edit-Icon öffnet Edit-Modus; Escape verlässt ohne Änderung; Delete ruft `deleteTask` auf
- `TaskEmpty`: Wird angezeigt wenn `tasks.length === 0`

**E2E Tests:** Nicht im Scope dieses Prototypen.

---

## 4. Implementierung
*Ausgefüllt von: /red:proto-dev — 2026-04-03*

### Implementierte Dateien
- `projekt/src/types/task.ts` – Task-Interface (id, title, done, createdAt)
- `projekt/src/hooks/useLocalStorage.ts` – Generischer Hook für localStorage-Sync
- `projekt/src/hooks/useTasks.ts` – CRUD-Logik + editingId State
- `projekt/src/components/TaskApp.tsx` / `.css` – Haupt-Container (max-width 600px)
- `projekt/src/components/TaskInput.tsx` / `.css` – Eingabezeile mit Disabled-Button
- `projekt/src/components/TaskItem.tsx` / `.css` – Normal- und Edit-Modus
- `projekt/src/components/TaskList.tsx` / `.css` – Liste + Empty State
- `projekt/src/App.tsx` – Reduziert auf `<TaskApp />`
- `projekt/src/App.css` – Geleert (Styles in Komponenten)
- `projekt/src/index.css` – DS-Tokens als CSS Custom Properties + globale Button-Klassen
- `projekt/src/test-setup.ts` – @testing-library/jest-dom Setup
- `projekt/src/__tests__/useTasks.test.ts` – 12 Unit-Tests für den Hook
- `projekt/src/__tests__/TaskInput.test.tsx` – 6 Component-Tests
- `projekt/src/__tests__/TaskItem.test.tsx` – 10 Component-Tests
- `projekt/src/__tests__/TaskList.test.tsx` – 4 Component-Tests
- `projekt/vite.config.ts` – Vitest-Konfiguration ergänzt

### Installierte Dependencies
- `vitest@4.1.2` (devDependency)
- `@testing-library/react@16.3.2` (devDependency)
- `@testing-library/user-event@14.6.1` (devDependency)
- `@testing-library/jest-dom@6.9.1` (devDependency)
- `jsdom@29.0.1` (devDependency)

### Offene Punkte / Tech-Debt
- Checkbox: Tokens-Build (kein DS-Spec), nutzt native HTML `<input type="checkbox">` + `accent-color: var(--color-primary-500)` – genehmigt 2026-04-03
- List-Item (TaskItem): Tokens-Build ohne DS-Spec – genehmigt 2026-04-03
- Empty State: Tokens-Build ohne DS-Spec – genehmigt 2026-04-03
- Kein Bestätigungs-Modal beim Löschen – bewusste Abweichung vom DS (genehmigt 2026-04-03)

---

## 5. QA Ergebnisse
*Ausgefüllt von: /red:proto-qa — 2026-04-03 (Runde 2: Bug-Fix-Retest)*

### Acceptance Criteria Status
- [x] AC-1: Neuer Task via Enter oder Button erstellbar ✅
- [x] AC-2: Task erscheint sofort in Liste ✅
- [x] AC-3: Task bearbeitbar, gespeichert und sofort angezeigt ✅
- [x] AC-4: Task als erledigt markierbar (durchgestrichen, gedämpft) ✅
- [x] AC-5: Erledigter Task zurück auf offen setzbar ✅
- [x] AC-6: Task löschbar, verschwindet aus Liste ✅
- [x] AC-7: Tasks in localStorage gespeichert, nach Reload korrekt geladen ✅
- [x] AC-8: Leerer/Whitespace-Titel kann nicht gespeichert werden ✅
- [x] AC-9: App läuft lokal ohne separaten Server ✅

### Security-Check
✅ Kein `dangerouslySetInnerHTML`. React-Escaping aktiv. Input-Validierung im Hook (nicht nur UI). localStorage enthält keine sensiblen Daten. CSRF/SQL-Injection nicht relevant (kein Backend).

### A11y-Check
⚠️ `aria-label` auf Checkboxen und Icon-Buttons vorhanden. `aria-live="polite"` gesetzt. Fokus-Management nach Edit-Modus unvollständig (BUG-FEAT1-QA-002, BUG-FEAT1-QA-008, BUG-FEAT1-UX-005). `outline: none` ohne Focus-Delta im Edit-Input (BUG-FEAT1-QA-003). Touch-Targets unter WCAG 2.5.5 (BUG-FEAT1-UX-003, BUG-FEAT1-UX-004).

### Gefixte Bugs (Runde 1 → Runde 2)
- ✅ BUG-FEAT1-QA-001 – Stale Closure in useTasks – GEFIXT
- ✅ BUG-FEAT1-UX-001 – App zentriert sich nicht – GEFIXT
- ✅ BUG-FEAT1-UX-002 – WCAG Kontrast – Bestätigt False Positive (neutral-500 war bereits korrekt)

### Offene Bugs
- BUG-FEAT1-QA-007 – localStorage-Fehlerfall zeigt keinen Hinweis (Low)
- BUG-FEAT1-QA-009 – useEffect Persistenz-Timing-Fenster (Low)
- BUG-FEAT1-QA-010 – Verschachtelte aria-live + role="status" (Low)
- BUG-FEAT1-QA-011 – Touch-Target durch overflow:hidden geclipt (Low)
- BUG-FEAT1-UX-006 – Input Focus-Zustand weicht von DS-Spec ab (Low)
- BUG-FEAT1-UX-007 – Disabled-Button nutzt opacity statt DS-Hintergrundfarbe (Low)
- BUG-FEAT1-UX-009 – Edit-Input Focus-Glow WCAG-Kontrast 1.2:1 (**Medium, Fix läuft**)

### Summary
- ✅ 9/9 Acceptance Criteria passed
- ✅ 13 Bugs gefixt (3 High, 7 Medium, 3 Low)
- ❌ 7 Bugs offen (0 Critical · 0 High · 1 Medium · 6 Low)

### Production-Ready
❌ NOT Ready – BUG-FEAT1-UX-009 offen (Medium, Fix before release – Regression aus Runde 2)
