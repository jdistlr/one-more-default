import type { Meta, StoryObj } from "@storybook/react-vite"
import { ComponentSheet } from "./ComponentSheet"

const meta = {
  title: "Komponenten/Dokumentation",
  component: ComponentSheet,
  decorators: [Story => <main className="studio-content story-content"><Story /></main>],
} satisfies Meta<typeof ComponentSheet>
export default meta
export const Varianten: StoryObj<typeof meta> = {}
