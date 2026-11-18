export type Theme = "system" | "light" | "dark"

const preference = matchMedia("(prefers-color-scheme: dark)")

export function applyTheme(theme: Theme) {
  const root = document.documentElement
  root.dataset.theme = theme
  root.toggleAttribute("data-system-dark", theme === "system" && preference.matches)
}

preference.addEventListener("change", () => {
  if (document.documentElement.dataset.theme === "system") applyTheme("system")
})
