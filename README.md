# One More Default

Kleines Designlabor für die Übertragung agnostischer Corporate-Design-Regeln auf React, Tailwind und shadcn/ui. Die erste Arbeitsprobe verbindet einen sekundären Button, ein Fehlerfeld und einen kompakten Dialog. „Speichern“ bestätigt den Namen innerhalb der Demo-Sitzung.

## Start

Node ab 22.12, npm und ein frischer Checkout genügen. Im Projektordner:

```sh
npm ci
npm run dev
```

`npm run storybook` öffnet den lokalen Komponentenkatalog auf Port 6006. `npm run build` prüft TypeScript und erzeugt die statische Demo in dist/. `npm run build-storybook` erzeugt das statische Handbuch in storybook-static/. Beide Ausgaben können separat auf eurem eigenen Webserver liegen.

## Erster Vergleich

1. [Designgrundlage](DESIGN.md) lesen und bei interner Nutzung die Referenz für einen sekundären Button, ein Fehlerfeld und einen Dialog ergänzen.
2. Die gleiche Implementierung im Spec Sheet und im Dialog vergleichen. Aktionsfarbe oder Kontrollradius in src/theme.css ändern und beide Verwendungen kontrollieren.
3. Den Dialog öffnen, ohne Namen speichern, danach einen Namen eingeben. Auch Escape und Fokusrückgabe testen. Mit installiertem Chromium sind dieselben Schritte automatisiert:

```sh
npx playwright install chromium
npm test
```

Für einen schon installierten Chromium kann CHROMIUM_PATH den Pfad zur ausführbaren Datei angeben.

## Herkunft

- Offizieller [shadcn-Skill](https://github.com/shadcn-ui/ui/tree/968d8cb9dc42ae5d52e8fd356cf84596ec832a26/skills/shadcn) vollständig unter .agents/skills/shadcn, mit [MIT-Lizenz](licenses/shadcn.md).
- [Rhea-Button aus der offiziellen Registry](https://ui.shadcn.com/r/styles/base-rhea/button.json) übernommen am 18.11.2026. Der cn-Import verweist auf den lokalen Helfer. Der Dialog nutzt das native HTML-dialog-Element und denselben React-Button. Rhea ist ein Kandidat für die Geometrie, die aktuellen Farben sind neutral gewählte Versuchswerte.
- [Craft von Diego Fernandes](https://github.com/diego3g/craft/tree/2b1f0eed509173edebbfe03f7442d72c16377e45) bleibt für Exploration verfügbar. [Ursprüngliche Paper-Versuche](experiments/README.md) und [Button-Tafel](experiments/button.html).
- [Figma-Lesestrategie](docs/figma.md) mit optionaler lokaler MCP-Konfiguration, Zugriffsprobe und Fallbacks. Interne Referenzen können ebenso aus dem Leitfaden und einer gerenderten Angular-Komponente kommen.

## Storybook auf GitHub Pages

Das Beispielblatt unter **Komponenten → Rhea → Beispielblatt** zeigt Formularvalidierung, Tabellenfilter und einen schrittweisen Prüflauf. Die unabhängigen Stories öffnen jedes Muster einzeln. Button, Badge, Alert, Card, Input, Textarea, Switch, Progress, Separator, Tabs, Table und Skeleton stammen aus der offiziellen Registry `https://ui.shadcn.com/r/styles/base-rhea/{name}.json` (18.11.2026). Die lokalen Importe verwenden denselben cn-Helfer. src/shadcn.css übernimmt die gemeinsamen Varianten aus packages/shadcn/src/tailwind.css des im Abschnitt Herkunft verlinkten Upstream-Stands.

Der Workflow Storybook Pages baut auf main das statische Storybook und lädt ausschließlich storybook-static hoch. Die Pages-Quelle ist **Settings → Pages → Source → GitHub Actions**. Nach erstmaligem Einschalten lässt sich der Workflow unter Actions erneut starten. Das veröffentlichte Beispielblatt enthält neutrale Demo-Daten.

Die [gestaltete Demo](https://jdistlr.github.io/one-more-default/studio/) zeigt zwei Arbeitsansichten und die Komponententafeln. Filteransichten werden im jeweiligen Browser gespeichert. Storybook bleibt als Werkbank unter der bisherigen URL erreichbar.
