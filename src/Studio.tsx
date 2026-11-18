import { useEffect, useLayoutEffect, useState } from "react"
import { ComponentSheet } from "./ComponentSheet"
import { Workspace } from "./Workspace"
import { applyTheme, type Theme } from "./theme-mode"

const sections = ["pruefstationen", "wartungsauftraege", "komponenten"] as const
const names = ["Prüfstationen", "Wartungsaufträge", "Komponenten"]
type Section = typeof sections[number]

function currentSection(): Section {
  return sections.find(section => "#" + section === location.hash) ?? "pruefstationen"
}

function storedTheme(): Theme {
  try {
    const value = localStorage.getItem("omd.theme")
    if (value === "light" || value === "dark") return value
  } catch {
    // The current selection also works when storage is unavailable.
  }
  return "system"
}

export function Studio({ storybookHref }: { storybookHref: string }) {
  const [section, setSection] = useState(currentSection)
  const [theme, setTheme] = useState(storedTheme)

  useEffect(() => {
    const update = () => setSection(currentSection())
    window.addEventListener("hashchange", update)
    return () => window.removeEventListener("hashchange", update)
  }, [])

  useLayoutEffect(() => {
    applyTheme(theme)
    try { localStorage.setItem("omd.theme", theme) } catch { /* Keep the session setting. */ }
  }, [theme])

  return <div className="studio">
    <header className="studio-header"><div className="studio-bar">
      <a href="#pruefstationen" className="wordmark"><span aria-hidden="true" />One More Default</a>
      <div className="studio-tools">
        <a href={storybookHref}>Storybook <span aria-hidden="true">↗</span></a>
        <label className="theme-control"><span>Farbschema</span>
          <select aria-label="Farbschema" value={theme} onChange={event => setTheme(event.target.value as Theme)}>
            <option value="system">System</option><option value="light">Hell</option><option value="dark">Dunkel</option>
          </select>
        </label>
      </div>
    </div></header>
    <main className="studio-content">
      <nav aria-label="Ansichten" className="studio-nav">
        {sections.map((item, index) => <a key={item} href={"#" + item}
          aria-current={section === item ? "page" : undefined}>{names[index]}</a>)}
      </nav>
      {section === "komponenten" ? <ComponentSheet /> :
        <Workspace key={section} dataset={section === "wartungsauftraege" ? "maintenance" : "inspection"} />}
    </main>
  </div>
}
