import { useId, useRef, useState } from "react"
import { Button } from "./ui/button"

export function SaveView() {
  const dialog = useRef<HTMLDialogElement>(null)
  const field = useRef<HTMLInputElement>(null)
  const title = useId()
  const input = useId()
  const error = useId()
  const [invalid, setInvalid] = useState(false)
  const [saved, setSaved] = useState("")

  return <section>
    <Button onClick={() => {
      setInvalid(false)
      if (field.current) field.current.value = ""
      dialog.current?.showModal()
    }}>Ansicht speichern</Button>
    <p role="status" className="mt-2 text-sm">{saved && `Gespeichert: ${saved}`}</p>
    <dialog ref={dialog} aria-labelledby={title} className="fixed inset-0 m-auto w-[min(26rem,calc(100%-2rem))] rounded-2xl border border-border bg-background p-6 text-foreground">
      <form onSubmit={event => {
        event.preventDefault()
        const name = field.current?.value.trim()
        if (!name) {
          setInvalid(true)
          field.current?.focus()
          return
        }
        setSaved(name)
        dialog.current?.close()
      }}>
        <h2 id={title} className="mb-5 text-xl font-semibold">Ansicht speichern</h2>
        <label htmlFor={input} className="block text-sm font-medium">Name der Ansicht</label>
        <input autoFocus ref={field} id={input} aria-required="true" aria-invalid={invalid}
          aria-describedby={invalid ? error : undefined} onChange={() => setInvalid(false)}
          className="mt-1 w-full rounded-2xl border border-input px-3 py-2 aria-invalid:border-destructive" />
        {invalid && <p id={error} role="alert" className="mt-1 text-sm text-destructive">Gib einen Namen ein.</p>}
        <div className="mt-6 flex flex-wrap justify-end gap-2">
          <Button type="button" variant="outline" onClick={() => dialog.current?.close()}>Abbrechen</Button>
          <Button type="submit">Speichern</Button>
        </div>
      </form>
    </dialog>
  </section>
}
