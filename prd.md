# Product Requirements Document
*Erstellt: 2026-04-03*

## Vision
Eine lokale Task-Management-Webapp für Einzelpersonen, die schnell und ohne Overhead Tasks verwalten wollen – ohne Cloud, ohne Login, ohne Ablenkung.

## Zielgruppe
Einzelperson (Enrico), lokal im Browser, kein Multi-User.

## Kernproblem
Ich brauche einen einfachen Ort, um Tasks zu erfassen, zu bearbeiten und abzuhaken – ohne den Overhead bestehender Tools, direkt auf meinem Rechner.

## Scope (In)
- Tasks hinzufügen (Titel)
- Tasks bearbeiten
- Tasks als erledigt markieren
- Tasks löschen
- Daten bleiben nach Reload erhalten (localStorage)

## Out-of-Scope
- Kategorien, Tags, Prioritäten
- Fälligkeitsdaten
- Mehrere Listen / Projekte
- Backend / Datenbank
- Auth / Multi-User
- Mobile-Optimierung

## Erfolgskriterien
- Alle vier CRUD-Operationen funktionieren
- Daten überleben einen Browser-Reload
- Läuft lokal ohne Server-Setup (oder mit minimalem)

## Offene Fragen
- Keine – Scope ist klar genug für direkte Umsetzung.

## Scope-Typ
Funktionierender Prototyp
