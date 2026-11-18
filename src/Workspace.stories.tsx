import type { Meta, StoryObj } from "@storybook/react-vite"
import { Workspace } from "./Workspace"

const meta = {
  title: "Patterns/Arbeitsansichten",
  component: Workspace,
  decorators: [Story => <main className="studio-content story-content"><Story /></main>],
} satisfies Meta<typeof Workspace>
export default meta
type Story = StoryObj<typeof meta>
export const Pruefstationen: Story = { name: "Prüfstationen" }
export const Wartungsauftraege: Story = { name: "Wartungsaufträge", args: { dataset: "maintenance" } }
