import { useId, useRef, useState } from "react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"

type Props = {
  canSave?: boolean
  onSave?: (name: string) => string | void
  existingNames?: string[]
}

export function SaveView({ canSave = true, onSave, existingNames = [] }: Props) {
  const dialog = useRef<HTMLDialogElement>(null)
  const trigger = useRef<HTMLButtonElement>(null)
  const field = useRef<HTMLInputElement>(null)
  const title = useId()
  const input = useId()
  const errorId = useId()
  const [name, setName] = useState("")
  const [error, setError] = useState("")
  const [saved, setSaved] = useState("")

  return <div className="save-view">
    <Button ref={trigger} aria-disabled={!canSave} onClick={() => {
      if (!canSave) return
      setError("")
      setName("")
      dialog.current?.showModal()
    }}>Ansicht speichern</Button>
    <p role="status">{saved && `Gespeichert: ${saved}`}</p>
    <dialog ref={dialog} aria-labelledby={title} className="save-dialog"
      onClose={() => trigger.current?.focus()}>
      <form onSubmit={event => {
        event.preventDefault()
        const value = name.trim()
        const issue = !value ? "Gib einen Namen ein." : existingNames.includes(value)
          ? "Diesen Namen gibt es bereits." : onSave?.(value)
        if (issue) {
          setError(issue)
          field.current?.focus()
          return
        }
        setSaved(value)
        dialog.current?.close()
      }}>
        <h2 id={title}>Ansicht speichern</h2>
        <p>Vergib einen Namen für die aktuelle Auswahl.</p>
        <label htmlFor={input}>Name der Ansicht</label>
        <Input autoFocus ref={field} id={input} value={name} maxLength={70} aria-required="true"
          aria-invalid={Boolean(error)} aria-describedby={error ? errorId : undefined}
          onChange={event => {setName(event.target.value); setError("")}} />
        {error && <p id={errorId} role="alert" className="field-error">{error}</p>}
        <div className="dialog-actions">
          <Button type="button" variant="outline" onClick={() => dialog.current?.close()}>Abbrechen</Button>
          <Button type="submit">Speichern</Button>
        </div>
      </form>
    </dialog>
  </div>
}
