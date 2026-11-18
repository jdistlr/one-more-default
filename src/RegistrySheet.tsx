import { useId, useState } from "react"
import { Alert, AlertDescription, AlertTitle } from "./components/ui/alert"
import { Badge } from "./components/ui/badge"
import { Button } from "./components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card"
import { Input } from "./components/ui/input"
import { Progress, ProgressLabel, ProgressValue } from "./components/ui/progress"
import { Separator } from "./components/ui/separator"
import { Skeleton } from "./components/ui/skeleton"
import { Switch } from "./components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs"
import { Textarea } from "./components/ui/textarea"

export function Fields() {
  const id = useId()
  const [name, setName] = useState("")
  const [checked, setChecked] = useState(false)
  const [invalid, setInvalid] = useState(false)
  return <Card><CardHeader><CardTitle>Formular und Validierung</CardTitle>
    <CardDescription>Leeren Namen prüfen, anschließend korrigieren.</CardDescription></CardHeader>
    <CardContent><form className="grid gap-4" onSubmit={event => {
      event.preventDefault()
      setChecked(true)
      setInvalid(!name.trim())
    }}>
      <label htmlFor={id} className="grid gap-1 text-sm font-medium">Ansichtsname
        <Input id={id} value={name} aria-required="true" aria-invalid={invalid} aria-describedby={invalid ? id + "-error" : undefined}
          onChange={event => {setName(event.target.value); setChecked(false); setInvalid(false)}} placeholder="z. B. Offene Prüfungen" />
      </label>
      {invalid && <span role="alert" id={id + "-error"} className="text-sm text-destructive">Gib einen Namen ein.</span>}
      <label className="grid gap-1 text-sm font-medium">Beschreibung<Textarea placeholder="Optional" /></label>
      <label className="flex items-center gap-3 text-sm"><Switch /> Als Standard verwenden</label>
      <div className="flex flex-wrap items-center gap-3"><Button type="submit">Eingabe prüfen</Button>
        {checked && !invalid && <span role="status">Name gültig</span>}</div>
    </form></CardContent></Card>
}

const rows = [["Wareneingang","Bereit"],["Messplatz","In Prüfung"],["Endkontrolle","Bereit"]]
export function DataView() {
  return <Card><CardHeader><CardTitle>Prüfstationen</CardTitle><CardDescription>Statusübersicht mit gefilterter Ansicht.</CardDescription></CardHeader>
    <CardContent><Tabs defaultValue="all"><TabsList aria-label="Stationsfilter">
      <TabsTrigger value="all">Alle Stationen</TabsTrigger><TabsTrigger value="pending">In Prüfung</TabsTrigger>
    </TabsList>{["all","pending"].map(value => <TabsContent key={value} value={value}>
      <Table aria-label="Prüfstationen"><TableHeader><TableRow><TableHead>Station</TableHead><TableHead>Status</TableHead></TableRow></TableHeader>
        <TableBody>{rows.filter(([,status]) => value === "all" || status === "In Prüfung").map(([station,status]) =>
          <TableRow key={station}><TableCell>{station}</TableCell><TableCell><Badge variant={status === "Bereit" ? "secondary" : "outline"}>{status}</Badge></TableCell></TableRow>
        )}</TableBody></Table></TabsContent>)}</Tabs></CardContent></Card>
}

export function Feedback() {
  const [step, setStep] = useState(1)
  return <Card><CardHeader><CardTitle>Fortschritt und Rückmeldung</CardTitle>
    <CardDescription>Vier Prüfschritte durchlaufen und den Ergebniszustand vergleichen.</CardDescription></CardHeader>
    <CardContent className="grid gap-4"><Progress value={step * 25}><ProgressLabel>Prüflauf</ProgressLabel><ProgressValue /></Progress>
      <Separator />
      {step < 4 ? <div aria-label="Ergebnis ausstehend" className="space-y-2"><Skeleton className="h-3 w-2/3" /><Skeleton className="h-3 w-1/3" /></div> :
        <Alert><AlertTitle>Prüflauf abgeschlossen</AlertTitle><AlertDescription>Alle vier Schritte wurden ausgeführt.</AlertDescription></Alert>}
      <Button variant="outline" className="justify-self-start" onClick={() => setStep(step === 4 ? 0 : step + 1)}>{step === 4 ? "Zurücksetzen" : "Nächster Schritt"}</Button>
    </CardContent></Card>
}

export function RegistrySheet() {
  return <main className="mx-auto max-w-5xl px-4 py-9 sm:px-10">
    <header className="mb-7 border-b border-border pb-5"><p className="text-sm text-muted-foreground">One More Default / Rhea</p>
    <h1 className="mt-2 text-4xl font-semibold tracking-tight">Komponenten im Zusammenspiel</h1></header>
    <div className="grid items-start gap-5 md:grid-cols-2"><Fields /><div className="grid gap-5"><DataView /><Feedback /></div></div>
  </main>
}
