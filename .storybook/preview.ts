import type { Preview } from "@storybook/react-vite"
import { applyTheme } from "../src/theme-mode"
import "../src/theme.css"

export default {
  globalTypes: {
    theme: { toolbar: { title: "Farbschema", items: [
      { value: "system", title: "System" },
      { value: "light", title: "Hell" },
      { value: "dark", title: "Dunkel" },
    ], dynamicTitle: true } },
  },
  initialGlobals: { theme: "system" },
  decorators: [(Story, context) => {
    applyTheme(context.globals.theme)
    return Story()
  }],
  parameters: {
    layout: "fullscreen",
    options: { storySort: { order: ["Patterns", "Komponenten", ["Dokumentation", "Rhea"], "Foundation"] } },
  },
} satisfies Preview
