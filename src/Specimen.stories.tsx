import type { Meta, StoryObj } from "@storybook/react-vite"
import { Specimen } from "./Specimen"
import { SaveView } from "./components/SaveView"
const meta = { title: "Foundation/Aktionsmuster", component: Specimen } satisfies Meta<typeof Specimen>
export default meta
export const Referenz: StoryObj<typeof meta> = {}
export const Dialog: StoryObj<typeof meta> = { render: () => <SaveView /> }
