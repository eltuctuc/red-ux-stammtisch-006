# BUG-FEAT1-UX-003: Touch-Target Checkbox zu klein (18x18px statt min. 44x44px)

- **Feature:** FEAT-1 – Task-Management
- **Severity:** Medium
- **Bereich:** A11y
- **Gefunden von:** UX Reviewer
- **Status:** Fixed — 2026-04-03

## Fix
Checkbox in <label className=task-item__checkbox-wrap> gewrappt (44x44px hit area, 18x18px visuell).

## Problem

Die Checkbox (`.task-item__checkbox`) ist mit `width: 18px; height: 18px` definiert. Das ist die visuelle Grösse der nativen Checkbox – das klickbare Areal entspricht dieser Grösse.

WCAG 2.5.5 (Level AA) und die gängigen Platform-Standards (Apple HIG: 44x44pt, Material Design: 48x48dp) verlangen ein Mindest-Touch-Target von 44x44px. Bei 18x18px Trefferfläche ist die Checkbox schwer zu treffen, besonders auf Touch-Geräten und für motorisch eingeschränkte Nutzer.

Da Mobile-Optimierung laut PRD out of scope ist, hat dieser Bug auf Desktop geringeres Gewicht. Dennoch gilt WCAG 2.5.5 auch für Desktop-Nutzung mit Touch-Eingabe (Tablets, Touchscreen-Laptops).

## Steps to Reproduce

1. App auf einem Touchscreen-Gerät oder Tablet öffnen
2. Einen Task hinzufügen
3. Checkbox antippen, insbesondere am Rand der Checkbox
4. Expected: Checkbox reagiert zuverlässig im Bereich von min. 44x44px
4. Actual: Trefferfläche entspricht der visuellen Grösse (18x18px), Fehlklicks bei Randberührung

## Empfehlung

Das visuelle Element bei 18px belassen, aber die Trefferfläche per Padding oder einem umhüllenden `<label>` auf mindestens 44x44px erweitern. Beispiel: Negative Margin und entsprechendes Padding auf dem Wrapper-Element, oder die Checkbox in ein `<label>` einbetten das als Klickbereich dient.

## Priority

Fix before release
