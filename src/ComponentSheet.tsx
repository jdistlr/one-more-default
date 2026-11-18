import { Button } from "./components/ui/button"
import { Input } from "./components/ui/input"

export function ComponentSheet() {
  return <article className="component-sheet">
    <header className="workspace-heading"><div><h1>Komponenten</h1><p>Button und Textfeld im Vergleich.</p></div></header>
    <section>
      <div className="anatomy">
        <div><h2>Button</h2><p>Primär für den nächsten Schritt, sekundär für Alternativen. Destruktiv kennzeichnet Aktionen mit Datenverlust.</p></div>
        <div className="anatomy-sample"><Button tabIndex={-1}>Ansicht speichern</Button><span>Fläche · Beschriftung · Fokusrahmen</span></div>
      </div>
      <table aria-label="Button-Zustände" className="comparison">
        <thead><tr><th>Variante</th><th>Standard</th><th>Fokus</th><th>Deaktiviert</th></tr></thead>
        <tbody>{([
          ["Primär", "default", "Speichern"],
          ["Sekundär", "outline", "Zurück"],
          ["Destruktiv", "destructive", "Löschen"],
        ] as const).map(([role, variant, label]) => <tr key={role}>
          <th scope="row">{role}</th><td><Button variant={variant}>{label}</Button></td>
          <td><Button variant={variant} data-preview-focus>{label}</Button></td>
          <td><Button variant={variant} disabled>{label}</Button></td>
        </tr>)}</tbody>
      </table>
    </section>
    <section>
      <div className="anatomy"><div><h2>Textfeld</h2><p>Das Label bleibt sichtbar. Bei einem Fehler steht der Hinweis direkt unter dem Feld.</p></div>
        <div className="anatomy-sample"><label>Ansichtsname<Input placeholder="z. B. Schichtübergabe" /></label><span>Label · Eingabefläche · Hinweis</span></div>
      </div>
      <div className="field-matrix">
        <label>Leer<Input placeholder="Ansichtsname" /></label>
        <label>Ausgefüllt<Input defaultValue="Schichtübergabe" /></label>
        <label>Fehler<Input aria-invalid aria-describedby="sheet-field-error" /><span id="sheet-field-error" className="field-error">Gib einen Namen ein.</span></label>
        <label>Deaktiviert<Input defaultValue="Standardansicht" disabled /></label>
      </div>
    </section>
  </article>
}
