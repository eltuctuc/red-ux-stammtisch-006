# BUG-FEAT1-QA-003: outline: none im Edit-Input ohne sichtbare Focus-Alternative (WCAG 2.4.11)

- **Feature:** FEAT-1 – Task-Management
- **Severity:** Medium
- **Bereich:** A11y
- **Gefunden von:** QA Engineer
- **Status:** Open

## Beschreibung

In `TaskItem.css` wird für das Edit-Input-Feld der Fokus-Indikator entfernt:

```css
.task-item__edit-input:focus {
  outline: none;
}
```

Als Begründung existiert eine konstante `border: 2px solid var(--color-border-focus)` im Normalzustand. Diese Border verändert sich beim :focus jedoch nicht – es gibt also visuell keinen Hinweis, dass das Element gerade fokussiert ist. Für Keyboard-User, die zwischen dem Edit-Input und den Save/Cancel-Buttons tabben, ist nicht erkennbar, welches Element aktiv den Fokus hält.

WCAG 2.4.11 (Focus Appearance, AA) verlangt, dass fokussierte Elemente einen sichtbaren Fokus-Indikator aufweisen, der sich vom unfokussierten Zustand unterscheidet.

## Analoge Probleme

Dieselbe Pattern gilt für `TaskInput.css`:

```css
.task-input__field:focus {
  outline: none;
  border: 2px solid var(--color-border-focus);
  box-shadow: var(--shadow-xs);
}
```

Hier immerhin wechselt die Border von 1px auf 2px und die Farbe wird durch die Fokus-Border kommuniziert – das ist grenzwertig ausreichend. Beim Edit-Input ist die Border jedoch bereits im Normalzustand auf dem Fokus-Wert, daher kein sichtbarer Unterschied.

## Steps to Reproduce

1. App öffnen, Task hinzufügen
2. Edit-Icon eines Tasks klicken → Edit-Modus öffnet sich, Edit-Input erhält Fokus
3. Tab drücken → Fokus wandert auf Save-Button
4. Shift+Tab → Fokus zurück auf Edit-Input
5. Expected: Edit-Input zeigt sichtbar, dass er fokussiert ist (veränderter visueller Zustand)
6. Actual: Das Edit-Input sieht identisch aus fokussiert und unfokussiert (Border unverändert, outline entfernt)

## Betroffene Dateien

- `projekt/src/components/TaskItem.css` – Zeilen 58-60

## Priority

Fix before release
