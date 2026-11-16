import { expect, test } from '@playwright/test'

test('homepage and portfolio sections render with working local images', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('.portfolio-launch')).toBeHidden()
  await expect(page.getByRole('heading', { level: 1, name: /Siva Chaithanya Gurram/ })).toBeVisible()

  for (const heading of [
    'A bit about',
    'Technical Expertise.',
    'Featured Projects.',
    'Professional Journey.',
    'My Resume.',
    'Let’s Work Together.',
  ]) {
    await expect(page.getByRole('heading', { name: new RegExp(heading.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i') })).toBeAttached()
  }

  await expect(page.locator('.skill-card')).toHaveCount(8)
  await expect(page.locator('.project-card')).toHaveCount(3)
  await expect(page.locator('.timeline-item')).toHaveCount(1)

  const imageResults = await page.locator('img').evaluateAll((images) =>
    images.map((image) => ({
      src: (image as HTMLImageElement).currentSrc,
      loaded: (image as HTMLImageElement).complete && (image as HTMLImageElement).naturalWidth > 0,
    })),
  )
  expect(imageResults.length).toBeGreaterThan(0)
  expect(imageResults.filter((image) => !image.loaded).map((image) => image.src)).toEqual([])
})

test('section navigation works at mobile, tablet, and desktop widths', async ({ page }) => {
  for (const width of [390, 768, 1280]) {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/')
    await expect(page.locator('.portfolio-launch')).toBeHidden()
    const dimensions = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      content: document.documentElement.scrollWidth,
    }))
    expect(dimensions.content, `horizontal overflow at ${width}px`).toBeLessThanOrEqual(dimensions.viewport + 1)

    if (width <= 650) {
      await page.getByRole('button', { name: /open navigation/i }).click()
    }
    await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Projects' }).click()
    await expect(page).toHaveURL(/\/projects$/)
    await expect(page.locator('.project-card').first()).toBeVisible()
  }
})

test('resume download and project links are available', async ({ page, request }) => {
  await page.goto('/resume')
  const resumeLink = page.locator('a[href="/siva-chaithanya-resume.pdf"][download]').first()
  await expect(resumeLink).toBeVisible()

  const resumeResponse = await request.get('/siva-chaithanya-resume.pdf')
  expect(resumeResponse.ok()).toBeTruthy()
  expect(resumeResponse.headers()['content-type']).toContain('application/pdf')

  await page.goto('/projects')
  const projectLinks = page.locator('.project-card a[href^="https://"]')
  await expect(projectLinks).toHaveCount(3)
  for (const link of await projectLinks.all()) {
    await expect(link).toHaveAttribute('rel', /noreferrer/)
  }
})

test('contact form blocks invalid input and prepares a valid email', async ({ page }) => {
  await page.goto('/contact')
  const name = page.getByLabel('Your Name')
  const email = page.getByLabel('Your Email')
  const message = page.getByLabel('Your Message')

  await page.getByRole('button', { name: 'Send Message' }).click()
  await expect(name).toHaveJSProperty('validity.valid', false)

  await name.fill('Siva')
  await email.fill('not-an-email')
  await message.fill('I would like to discuss a project.')
  await page.getByRole('button', { name: 'Send Message' }).click()
  await expect(email).toHaveJSProperty('validity.valid', false)

  await email.fill('visitor@example.com')
  await page.getByRole('button', { name: 'Send Message' }).click()
  await expect(page.getByRole('status')).toContainText('Your email app is opening')
})
