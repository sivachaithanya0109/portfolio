import { expect, test } from '@playwright/test'

const templates = [
  ['Midnight Professional', 'midnight-professional'],
  ['Pastel Developer', 'pastel-developer'],
  ['Motion Cinematic', 'motion-cinematic'],
  ['Automotive Journey', 'automotive-journey'],
  ['Mountain Explorer', 'mountain-explorer'],
  ['Animated Professional', 'animated-professional'],
] as const

const routes = ['/','/about','/skills','/projects','/experience','/resume','/contact']
const widths = [1920, 1440, 1366, 768, 430, 390]

async function selectTemplate(page: import('@playwright/test').Page, name: string) {
  await page.getByLabel('Choose portfolio template').click()
  await page.getByRole('button', { name: new RegExp(name, 'i') }).click()
}

async function setTheme(page: import('@playwright/test').Page, theme: 'light' | 'dark') {
  const target = theme === 'dark' ? /switch to dark theme/i : /switch to light theme/i
  const toggle = page.getByRole('button', { name: target })
  if (await toggle.count()) await toggle.click()
  await expect.poll(() => page.evaluate(() => localStorage.getItem('siva-theme'))).toBe(theme)
}

test('template selection, routes, preferences, responsive widths and themes', async ({ page }) => {
  test.setTimeout(90000)
  await page.goto('/')
  await expect(page.locator('.portfolio-launch')).toBeHidden()
  await expect(page.locator('#root [data-template]')).toBeVisible()

  for (const [name, id] of templates) {
    await selectTemplate(page, name)
    await expect(page.locator(`#root [data-template="${id}"]`)).toBeVisible()
    const portraitPath = id === 'animated-professional' ? '/images/siva-chaithanya-anime.png' : '/images/siva-chaithanya.jpg'
    const portrait = page.locator(`img[src="${portraitPath}"]`).first()
    await expect(portrait).toBeVisible()
    await expect.poll(() => portrait.evaluate((image) => (image as HTMLImageElement).naturalWidth)).toBeGreaterThan(0)
    if (id === 'animated-professional') {
      const character = page.locator('.animated-character-wrap')
      await character.hover()
      await expect(character.locator('img.animated-character')).toHaveCount(1)
    }
    await expect(page.evaluate(() => localStorage.getItem('siva-template'))).resolves.toBe(id)

    for (const route of routes) {
      await page.goto(route)
      await expect(page.locator(`#root [data-template="${id}"]`)).toBeVisible()
      await expect(page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: route === '/' ? 'Home' : route.slice(1).replace(/^./, (letter) => letter.toUpperCase()) })).toHaveAttribute('aria-current', 'page')
      if (route === '/contact') await expect(page.locator('form input[name="name"]')).toHaveCount(1)
      if (route === '/contact') {
        await expect(page.locator('.portfolio-footer')).toBeVisible()
        await expect(page.getByRole('link', { name: 'Instagram' })).toHaveAttribute('href', 'https://www.instagram.com/')
        await expect(page.locator('.portfolio-footer nav a')).toHaveCount(6)
        await expect.poll(() => page.locator('.portfolio-footer nav').evaluate((nav) => getComputedStyle(nav).gridTemplateColumns.split(' ').length)).toBe(3)
      }
      if (route === '/resume') await expect(page.locator(`a[href="/siva-chaithanya-resume.pdf"]`).first()).toBeVisible()
      if (route === '/projects') await expect(page.locator('a[href^="https://github.com/"]').first()).toBeVisible()
    }

    await setTheme(page, 'dark')
    if (id !== 'midnight-professional') await expect(page.locator(`#root [data-template="${id}"]`)).toHaveAttribute('data-theme-mode', 'dark')
    await setTheme(page, 'light')
  }

  await page.goto('/')
  await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Projects' }).click()
  await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Resume' }).click()
  await page.goBack()
  await expect(page).toHaveURL(/\/projects$/)
  await page.goBack()
  await expect(page).toHaveURL(/\/$/)

  await page.goto('/contact')
  await selectTemplate(page, 'Automotive Journey')
  await expect(page).toHaveURL(/\/contact$/)
  await page.goto('/')
  await expect(page.locator('.auto-loader')).toHaveCount(0)
  await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'About' }).click()
  await expect(page.locator('.auto-loader')).toHaveCount(0)

  await page.goto('/')
  await page.getByLabel('Choose portfolio template').click()
  await expect(page.locator('.template-menu')).toHaveAttribute('open', '')
  await page.locator('.template-header .template-mark').click()
  await expect(page.locator('.template-menu')).not.toHaveAttribute('open', '')

  await page.setViewportSize({ width: 1440, height: 900 })
  await page.evaluate(() => { const section = document.getElementById('projects'); if (section) window.scrollTo({ top: section.offsetTop + 100, behavior: 'instant' }) })
  await page.waitForFunction(() => { const section = document.getElementById('projects'); const marker = window.innerHeight * .36; const bounds = section?.getBoundingClientRect(); return Boolean(bounds && bounds.top <= marker && bounds.bottom > marker) })
  await expect(page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Projects' })).toHaveAttribute('aria-current', 'page')
  await page.setViewportSize({ width: 390, height: 844 })
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
  await page.goto('/contact')
  await page.locator('.template-header .template-mark').click()
  await expect(page).toHaveURL(/\/$/)
  await page.goto('/contact')
  await page.reload()
  await expect(page.locator('.portfolio-launch.launch-automotive-journey')).toBeVisible()
  await expect(page.locator('.launch-emblem')).toBeVisible()
  await expect(page).toHaveURL(/\/$/)
  await expect(page.locator('.portfolio-launch')).toBeHidden()

  for (const width of widths) {
    await page.setViewportSize({ width, height: 900 })
    for (const [name, id] of templates) {
      await selectTemplate(page, name)
      await expect(page.locator(`#root [data-template="${id}"]`)).toBeVisible()
      const dimensions = await page.evaluate(() => ({ viewport: document.documentElement.clientWidth, content: document.documentElement.scrollWidth }))
      expect(dimensions.content, `${id} has horizontal overflow at ${width}px`).toBeLessThanOrEqual(dimensions.viewport + 1)
      const header = page.locator(id === 'midnight-professional' ? '.site-header' : '.template-header')
      const headerWidth = await header.evaluate((element) => element.getBoundingClientRect().width)
      expect(headerWidth, `${id} header should fill the viewport at ${width}px`).toBeGreaterThanOrEqual(dimensions.viewport - 1)
      if (width <= 650) {
        const header = page.locator('.template-header, .site-header').first()
        const templateBox = await header.locator('.template-menu > summary').boundingBox()
        const themeBox = await header.locator('.theme-toggle').boundingBox()
        const menuBox = await header.locator('.section-menu-toggle, .menu-toggle').boundingBox()
        expect(templateBox).not.toBeNull()
        expect(themeBox).not.toBeNull()
        expect(menuBox).not.toBeNull()
        expect(templateBox!.x).toBeLessThan(themeBox!.x)
        expect(themeBox!.x).toBeLessThan(menuBox!.x)
        await page.getByRole('button', { name: /open navigation/i }).click()
        await expect(page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Contact' })).toBeVisible()
        await page.keyboard.press('Escape')
        await expect(page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Contact' })).toBeHidden()
        await page.getByRole('button', { name: /open navigation/i }).click()
        await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Contact' }).click()
        await expect(page).toHaveURL(/\/contact$/)
        await expect.poll(() => page.locator('.portfolio-footer nav').evaluate((nav) => getComputedStyle(nav).gridTemplateColumns.split(' ').length)).toBe(3)
        await page.goto('/')
      }
    }
  }

  await expect.poll(() => page.evaluate(() => localStorage.getItem('siva-template'))).toBe('animated-professional')
})
