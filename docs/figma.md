# Figma als optionale Lesequelle

Der Stand eurer Figma-Rechte ist offen. Der erste Test braucht nur einen intern freigegebenen Link zu einem konkreten Button oder Dialog („Copy link to selection“). Einen solchen Test innerhalb der für die Unternehmensdatei vorgesehenen Umgebung durchführen. Für lokale Demo, Builds und Tests braucht dieses Projekt weder Figma noch Zugangsdaten.

## Verbindung auswählen

In Figma Desktop eine Design-Datei öffnen, in Dev Mode den Desktop-MCP-Server aktivieren. Der offizielle lokale HTTP-Endpunkt lautet `http://127.0.0.1:3845/mcp`. Figma dokumentiert die nötigen Pläne und Dev-/Full-Seats. Der Desktop-Client und der Agent müssen dieselbe Loopback-Adresse erreichen können. Eine gehostete Agentensitzung kann den Mac über ihre eigene localhost-Adresse nicht erreichen. [Desktop-Anleitung](https://developers.figma.com/docs/figma-mcp-server/local-server-installation/)

Falls der offizielle Remote-Zugriff im Unternehmen genutzt wird, ist `https://mcp.figma.com/mcp` die Alternative mit Anmeldung im MCP-Client. [Remote-Anleitung](https://developers.figma.com/docs/figma-mcp-server/remote-server-installation/) · [Zugriff und Kontingente](https://developers.figma.com/docs/figma-mcp-server/rate-limits-access/)

Beispiel für die benutzerlokale Codex-Konfiguration, sobald die Desktop-Verbindung gewünscht ist:

```toml
[mcp_servers.figma]
url = "http://127.0.0.1:3845/mcp"
```

## Kleine Leseprobe

1. Verfügbare Werkzeuge anzeigen. Bei Remote kann whoami das aktive Konto und den Seat bestätigen. Das Ergebnis sagt noch nichts über die konkrete Datei aus.
2. Mit get_metadata die verlinkte Node auflösen. Bei großer Seite den gewünschten Frame eingrenzen.
3. get_design_context für diesen Frame lesen. Variantenname, Komponenteninstanz, Layout und verfügbare Code-Connect-Hinweise notieren.
4. Bei Bedarf get_variable_defs für die Auswahl anfordern. Einen zurückgegebenen Wert nur dann als Token-Alias dokumentieren, wenn die Bindung nachweisbar ist. Eine Auswahl enthält nur die dort sichtbaren bzw. verwendeten Daten.
5. Mit get_screenshot den sichtbaren Zustand abgleichen. Für Hover, Fehler oder deaktiviert jeweils prüfen, ob ein eigener Zustand zugänglich ist. Ein Screenshot belegt weder Tastaturverhalten noch die Benennung eines Tokens.

| Ergebnis | Verwendbare Aussage | Weiterarbeit |
|---|---|---|
| Kontext, Variablen und Hauptkomponente lesbar | Befunde zu der geprüften Version und den tatsächlich gelesenen Zuständen | In DESIGN.md auf Regel oder Beobachtung verweisen |
| Instanz lesbar, Bibliothek gesperrt | Geometrie und Bindungen dieser Instanz, soweit sichtbar | Andere Modi und Varianten offenlassen; gegebenenfalls Angular-Beispiel vergleichen |
| Nur Export oder Screenshot verfügbar | Sichtbarer Aufbau bei konkreter Größe | Werte als Schätzung kennzeichnen; Verhalten in Angular beobachten |
| Zugriff verweigert, Kontingent erreicht oder Tool fehlt | Für diesen Abruf fehlt ein Befund | Ursache getrennt protokollieren; mit Leitfaden, freigegebenen Exporten oder neutraler Fixture weiterarbeiten |

Pro Probe genügen Datum, Quelle/Node, Zustand, verfügbare Informationen und offene Fragen. Konto-E-Mail, Zugangstokens und vollständige Rohantworten gehören nicht ins Vergleichsprotokoll. Ein Firmen-Frame kann in der internen Projektkopie belegt werden; das private Labor enthält nur neutrale Beispiele. [Figma-Werkzeugreferenz](https://developers.figma.com/docs/figma-mcp-server/tools-and-prompts/)
