import type { Meta, StoryObj } from "@storybook/react-vite"
import { DataView, Feedback, Fields, RegistrySheet } from "./RegistrySheet"
const meta = { title: "Komponenten/Rhea", component: RegistrySheet } satisfies Meta<typeof RegistrySheet>
export default meta
type Story = StoryObj<typeof meta>
export const Beispielblatt: Story = {}
export const Formular: Story = { render: () => <Fields /> }
export const Datentabelle: Story = { render: () => <DataView /> }
export const Rueckmeldung: Story = { name: "Rückmeldung", render: () => <Feedback /> }
