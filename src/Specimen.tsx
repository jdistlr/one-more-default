import { Button } from "./components/ui/button"
import { SaveView } from "./components/SaveView"

export function Specimen() {
  return <main className="mx-auto max-w-4xl px-5 py-12 sm:px-10">
    <p className="text-sm font-medium text-primary">One More Default / Komponenten</p>
    <h1 className="mt-2 text-4xl font-semibold tracking-tight">Aktionen und Formularfelder</h1>
    <p className="my-5 max-w-prose">Neutrale Arbeitsreferenz für den Vergleich mit dem Corporate Design. Mit der Tab-Taste lässt sich der Fokus prüfen.</p>
    <section className="my-8 border-y border-border py-5">
      <h2 className="mb-4 text-xl font-semibold">Button-Varianten</h2>
      <table className="w-full text-left text-sm"><thead><tr><th>Rolle</th><th>Standard</th><th>Deaktiviert</th></tr></thead>
        <tbody>{(["default","outline"] as const).map(variant => <tr key={variant}>
          <th className="py-2">{variant === "default" ? "Primär" : "Sekundär"}</th>
          {[false,true].map(disabled => <td key={String(disabled)}><Button variant={variant} disabled={disabled}>{variant === "default" ? "Speichern" : "Zurück"}</Button></td>)}
        </tr>)}</tbody>
      </table>
    </section>
    <h2 className="mb-3 text-xl font-semibold">Dialog mit Validierung</h2>
    <SaveView />
  </main>
}
