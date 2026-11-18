# Designgrundlage

Status: neutrale Testdaten. Der aktuelle Stand enthält keine übernommene Unternehmensrichtlinie.

| Entscheidung | Herkunft | Referenz | Umsetzung und Prüfung |
|---|---|---|---|
| Primäre Aktion gefüllt, sekundäre Aktion mit Rahmen | Abgeleitet für den Test | Lokale Bedienprobe „Ansicht speichern“ | Button default / outline; beide Rollen in der Referenztafel und im Dialog ansehen |
| Aktionsfarbe und Fokus getrennt | Abgeleitet für den Test | src/theme.css | --primary und --ring unabhängig ändern; Fokus mit Tab prüfen |
| Kontrollradius 8 px | Abgeleitet für den Test | Rhea-Button verwendet rounded-2xl | --control-radius setzt diese Stufe im Web-Theme; weitere Komponenten mit derselben Stufe prüfen |
| Fehler unter dem Feld, Fokus zurück zum Auslöser | Abgeleitet für den Test | tests/dialog.spec.ts | Fehlversuch, Speichern und Escape prüfen |

## Übernahme einer internen Referenz

Je Befund Komponente, Zustand, Kontext, Version oder Datum und konkrete Fundstelle nennen. „Vorgegeben“ bezeichnet eine explizite Regel, „beobachtet“ ein Ergebnis in einem konkreten Angular- oder Figma-Beispiel, „abgeleitet“ eine eigene Entscheidung. Bei widersprüchlichen Quellen beide Befunde aufführen. Unzugängliche Varianten als offen markieren.

Vergleiche zuerst sekundären Button, Fehlerfeld und Dialog bei identischem Text und gleicher Breite. Rhea ist eine Arbeitshypothese für kompakte Geometrie. Vergleiche Höhe, Innenabstand, Radius, Typografie und Fokus mit der tatsächlichen Referenz. Entscheide dann über Preset und Anpassung. Die Gruppe aus Label, Eingabe und Fehlermeldung wird zunächst im Dialog erprobt; bei zweitem Einsatz gemeinsam extrahieren.
