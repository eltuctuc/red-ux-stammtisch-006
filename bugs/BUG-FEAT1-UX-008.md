# BUG-FEAT1-UX-008: Pflicht-Attribute fehlen an Task-Input und Edit-Input (name-Attribut)

- **Feature:** FEAT-1 – Task-Management
- **Severity:** Low
- **Bereich:** Konsistenz
- **Gefunden von:** UX Reviewer
- **Status:** Open

## Problem

Die DS-Spec für Input-Felder (`design-system/components/input.md`) definiert unter "Regeln":

> Jeder Input hat ein `name`-Attribut.

Weder das Eingabefeld in `TaskInput.tsx` noch das Edit-Input in `TaskItem.tsx` haben ein `name`-Attribut gesetzt. Das hat folgende Konsequenzen:

- Autofill-Mechanismen des Browsers können nicht greifen (obwohl `autocomplete="off"` hier bewusst gesetzt ist, ist das `name`-Attribut dennoch DS-Pflicht)
- Screen-Reader und Assistive-Technologies nutzen `name` gelegentlich zur Feldidentifikation
- Es ist eine nicht genehmigte Abweichung von der DS-Spec

## Steps to Reproduce

1. `TaskInput.tsx` und `TaskItem.tsx` im DevTools inspizieren
2. `<input>`-Elemente auf `name`-Attribut prüfen
3. Expected: `name="new-task"` bzw. `name="edit-task"` vorhanden
4. Actual: Kein `name`-Attribut auf beiden Inputs

## Empfehlung

`name="new-task"` zum Input in `TaskInput.tsx` hinzufügen. `name="edit-task"` zum Edit-Input in `TaskItem.tsx` hinzufügen.

## Priority

Nice-to-have
