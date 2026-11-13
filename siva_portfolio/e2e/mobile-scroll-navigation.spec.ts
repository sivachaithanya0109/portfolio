import { expect, test } from '@playwright/test'

test('mobile navigation follows the section reached by scrolling', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('.portfolio-launch')).toBeHidden()
  await page.getByLabel('Choose portfolio template').click()
  await page.getByRole('button', { name: /Automotive Journey/i }).click()
  await page.setViewportSize({ width: 390, height: 844 })
  await page.evaluate(() => {
    const section = document.getElementById('about')
    if (section) window.scrollTo({ top: section.offsetTop + 100, behavior: 'instant' })
  })
  await page.waitForFunction(() => {
    const bounds = document.getElementById('about')?.getBoundingClientRect()
    const marker = window.innerHeight * .36
    return Boolean(bounds && bounds.top <= marker && bounds.bottom > marker)
  })
  await page.getByRole('button', { name: /open navigation/i }).click()
  await expect(page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'About' })).toHaveAttribute('aria-current', 'page')
})
