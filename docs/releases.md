# Release History

## 2026-04-03 – v0.1.0
### Neue Features
- **FEAT-1 – Task-Management:** Tasks erstellen, bearbeiten, als erledigt markieren und löschen mit automatischer localStorage-Persistenz.

### Bug Fixes
- **BUG-FEAT1-QA-001:** Stale Closure in useTasks – alle CRUD-Funktionen auf funktionalen Update-Pattern umgestellt *(Severity: High)*
- **BUG-FEAT1-UX-001:** App-Zentrierung – `margin: 0 auto` ergänzt *(Severity: High)*
- **BUG-FEAT1-UX-002:** WCAG-Kontrast erledigter Tasks – False Positive, war bereits konform *(Severity: High)*
- **BUG-FEAT1-QA-002/008 + UX-005:** Fokus-Return nach Edit-Cancel und Edit-Save *(Severity: Medium)*
- **BUG-FEAT1-QA-003 + UX-009:** Focus-Delta auf Edit-Input (WCAG 2.4.11) *(Severity: Medium)*
- **BUG-FEAT1-QA-004:** aria-live Region-Kontinuität beim letzten Task-Delete *(Severity: Medium)*
- **BUG-FEAT1-QA-005:** aria-checked von nativen Checkboxen entfernt *(Severity: Low)*
- **BUG-FEAT1-QA-006:** Test-Coverage für updateTask mit Whitespace-Titel *(Severity: Low)*
- **BUG-FEAT1-UX-003:** Checkbox Touch-Target auf 44x44px erweitert *(Severity: Medium)*
- **BUG-FEAT1-UX-004:** Icon-Button Touch-Target auf 44x44px erweitert *(Severity: Medium)*
- **BUG-FEAT1-UX-008:** name-Attribute auf allen Inputs ergänzt *(Severity: Low)*
