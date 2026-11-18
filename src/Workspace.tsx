import { useId, useState } from "react"
import { SaveView } from "./components/SaveView"
import { Badge } from "./components/ui/badge"
import { Button } from "./components/ui/button"
import { Input } from "./components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./components/ui/table"

const statuses = ["Bereit", "In Prüfung", "Blockiert"] as const
type Status = typeof statuses[number]
type Filter = { query: string; status: string }
type SavedView = Filter & { name: string }
type Entry = { id: string; title: string; detail: string; status: Status }

const datasets = {
  inspection: {
    label: "Prüfstationen",
    singular: "Station",
    items: [
      { id: "PS-01", title: "Wareneingang", detail: "Halle A · Linie 01", status: "Bereit" },
      { id: "PS-02", title: "Optische Endprüfung", detail: "Halle A · Linie 02", status: "In Prüfung" },
      { id: "PS-03", title: "Dichtheitsprüfung", detail: "Halle B · Linie 03", status: "In Prüfung" },
      { id: "PS-04", title: "Messplatz für Oberflächenqualität", detail: "Halle B · Linie 04", status: "Blockiert" },
      { id: "PS-05", title: "Versandfreigabe", detail: "Halle C · Linie 01", status: "Bereit" },
    ] satisfies Entry[],
  },
  maintenance: {
    label: "Wartungsaufträge",
    singular: "Auftrag",
    items: [
      { id: "WA-08", title: "Sensor neu kalibrieren", detail: "Halle A · Optische Endprüfung", status: "In Prüfung" },
      { id: "WA-12", title: "Ersatzteil für die Druckluftversorgung freigeben", detail: "Halle B · Druckluft", status: "Blockiert" },
      { id: "WA-17", title: "Schutzhaube kontrollieren", detail: "Halle C · Versand", status: "Bereit" },
    ] satisfies Entry[],
  },
}

function loadViews(key: string): SavedView[] {
  try {
    const data: unknown = JSON.parse(localStorage.getItem(key) ?? "[]")
    return Array.isArray(data) ? data.filter((item): item is SavedView =>
      item && typeof item.name === "string" && typeof item.query === "string" &&
      typeof item.status === "string" && (item.status === "" || statuses.some(status => status === item.status))
    ) : []
  } catch {
    return []
  }
}

export function Workspace({ dataset = "inspection" }: { dataset?: keyof typeof datasets }) {
  const { label, singular, items } = datasets[dataset]
  const storageKey = "omd.filters." + dataset
  const searchId = useId()
  const statusId = useId()
  const viewId = useId()
  const [filter, setFilter] = useState<Filter>({ query: "", status: "" })
  const [savedViews, setSavedViews] = useState(() => loadViews(storageKey))
  const [activeView, setActiveView] = useState("")
  const query = filter.query.trim().toLocaleLowerCase("de")
  const filtered = items.filter(item =>
    (!filter.status || item.status === filter.status) &&
    [item.title, item.detail, item.id].some(value => value.toLocaleLowerCase("de").includes(query))
  )
  const hasFilter = Boolean(filter.query || filter.status)
  const alreadySaved = savedViews.some(view => view.query === filter.query && view.status === filter.status)

  function applyFilter(next: Filter) {
    setFilter(next)
    setActiveView("")
  }

  function save(name: string) {
    const next = [...savedViews.filter(view => view.name !== name), { ...filter, name }]
    try {
      localStorage.setItem(storageKey, JSON.stringify(next))
    } catch {
      return "Die Ansicht konnte in diesem Browser nicht gespeichert werden."
    }
    setSavedViews(next)
    setActiveView(name)
  }

  return <section className="workspace" aria-label={label}>
    <header className="workspace-heading">
      <div>
        <h1>{label}</h1>
        <p>Übersicht nach Standort und Status.</p>
      </div>
      <SaveView canSave={hasFilter && !alreadySaved} onSave={save} existingNames={savedViews.map(view => view.name)} />
    </header>

    <div className="results">
      <div className="filters">
        <label htmlFor={searchId}>Suche<Input id={searchId} type="search" value={filter.query}
          placeholder={singular + " suchen"}
          onChange={event => applyFilter({ ...filter, query: event.target.value })} /></label>
        <label htmlFor={statusId}><span id={statusId + "-label"}>Status</span><select aria-labelledby={statusId + "-label"} id={statusId} className="select-control" value={filter.status}
          onChange={event => applyFilter({ ...filter, status: event.target.value })}>
          <option value="">Alle Status</option>
          {statuses.map(status => <option key={status}>{status}</option>)}
        </select></label>
        {savedViews.length > 0 && <label htmlFor={viewId}><span id={viewId + "-label"}>Gespeicherte Ansicht</span>
          <select aria-labelledby={viewId + "-label"} id={viewId} className="select-control" value={activeView} onChange={event => {
            const view = savedViews.find(entry => entry.name === event.target.value)
            setFilter(view ?? { query: "", status: "" })
            setActiveView(view?.name ?? "")
          }}>
            <option value="">Keine ausgewählt</option>
            {savedViews.map(view => <option key={view.name}>{view.name}</option>)}
          </select>
        </label>}
      </div>
      <div className="results-bar">
        <p aria-live="polite">{filtered.length} von {items.length} Einträgen</p>
        <Button type="button" variant="ghost" disabled={!hasFilter}
          onClick={() => applyFilter({ query: "", status: "" })}>Filter zurücksetzen</Button>
      </div>
      <Table aria-label={label}>
        <TableHeader><TableRow><TableHead>{singular}</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
        <TableBody>
          {filtered.map(item => <TableRow key={item.id}>
            <TableCell><span className="entry-name">{item.title}</span><span className="entry-detail">{item.id} · {item.detail}</span></TableCell>
            <TableCell><Badge className="status-badge" data-status={item.status}>
              <span className="status-dot" aria-hidden="true" />{item.status}
            </Badge></TableCell>
          </TableRow>)}
          {filtered.length === 0 && <TableRow><TableCell colSpan={2} className="empty-results">
            <strong>Keine Treffer</strong><span>Ändere den Suchbegriff oder setze die Filter zurück.</span>
          </TableCell></TableRow>}
        </TableBody>
      </Table>
    </div>
  </section>
}
