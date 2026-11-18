import { expect, test } from "@playwright/test"
for (const width of [390, 1280]) {
  test(`Speichern, Validierung und Fokus bei ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 800 })
    await page.goto("/")
    const trigger = page.getByRole("button", { name: "Ansicht speichern" })
    await trigger.click()
    const dialog = page.getByRole("dialog")
    const field = dialog.getByRole("textbox")
    await expect(field).toBeFocused()
    await field.press("Enter")
    await expect(dialog.getByRole("alert")).toBeVisible()
    await field.fill("Meine Filter")
    await field.press("Enter")
    await expect(page.getByRole("status")).toHaveText("Gespeichert: Meine Filter")
    await expect(trigger).toBeFocused()
    await trigger.click()
    await field.press("Escape")
    await expect(dialog).toBeHidden()
    await expect(trigger).toBeFocused()
  })
}
