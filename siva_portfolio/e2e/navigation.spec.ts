import { expect, test } from '@playwright/test'

test('visits portfolio pages from the main navigation', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: /siva chaithanya/i })).toBeVisible()
  await page.getByRole('link', { name: 'Skills', exact: true }).click()
  await expect(page).toHaveURL(/\/skills$/)
  await expect(page.getByRole('heading', { name: /technical skills/i })).toBeVisible()
})
