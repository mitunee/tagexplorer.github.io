import { test, expect, type Page } from '@playwright/test'

const expectHidingCards = (page: Page, screenshotName: string) =>
  expect(page).toHaveScreenshot(screenshotName, { mask: [page.locator('.gen-card')] })

test.describe('Visual regression tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('Home page (heads)', async ({ page }) => {
    await expectHidingCards(page, 'homepage.png')
  })

  test('Styles page', async ({ page }) => {
    await page.getByRole('link', { name: /styles/i }).click()
    await expectHidingCards(page, 'styles.png')
  })

  test('Artists page', async ({ page }) => {
    await page.getByRole('link', { name: /artists/i }).click()
    await expect(page).toHaveScreenshot('artists.png')
  })

  test('Image size setting', async ({ page }) => {
    await page.selectOption('select#imageSize', 'large')
    await expectHidingCards(page, 'imageSize.png')
  })

  test('Settings are persistent', async ({ page }) => {
    await page.selectOption('#imageSize', 'large')
    await page.selectOption('#onGenClick', 'OpenImage')
    await page.selectOption('#ineffectiveTags', 'IneffectiveTagsShow')
    await page.getByRole('link', { name: /composition/i }).click()
    await expectHidingCards(page, 'persistentSettings.png')
  })

  test('Search tag groups', async ({ page }) => {
    await page.locator('#filterTagGroups').fill('eyes')
    await expectHidingCards(page, 'searchTagGroups.png')
  })

  test('Clear tag group search', async ({ page }) => {
    await page.locator('#filterTagGroups').fill('eyes')
    await page.locator('#filterTagGroups + :has-text("clear")').click()
    await expectHidingCards(page, 'clearTagGroupSearch.png')
  })

  test('Tag group search is cleared on page change', async ({ page }) => {
    await page.locator('#filterTagGroups').fill('eyes')
    await page.getByRole('link', { name: /composition/i }).click()
    await page.getByRole('link', { name: /heads/i }).click()
    await expectHidingCards(page, 'tagGroupSearchIsClearedOnPageChange.png')
  })

  test('Search tags', async ({ page }) => {
    await page.locator('#filterTags').fill('averting')
    await expectHidingCards(page, 'searchTags.png')
  })

  test('Search tags and tag groups', async ({ page }) => {
    await page.locator('#filterTagGroups ').fill('eyes')
    await page.locator('#filterTags').fill('ing')
    await expectHidingCards(page, 'searchTagsAndTagGroups.png')
  })

  test('Collapse all', async ({ page }) => {
    await page.locator('#collapseAllPill').first().click()
    await expectHidingCards(page, 'collapseAll.png')
  })

  test('Expand all', async ({ page }) => {
    await page.locator('#collapseAllPill').first().click()
    await page.locator('#expandAllPill').first().click()
    await expectHidingCards(page, 'expandAll.png')
  })

  test('Artist order', async ({ page }) => {
    await page.getByRole('link', { name: /artists/i }).click()
    await page.selectOption('#artistOrder', 'FaveCount')
    await expect(page).toHaveScreenshot('artistOrder.png')
  })

  test('Artist settings are persistent', async ({ page }) => {
    await page.getByRole('link', { name: /artists/i }).click()
    await page.selectOption('#artistOrder', 'FaveCount')
    await page.selectOption('#gensPerPage', '100')
    await page.getByRole('link', { name: /heads/i }).click()
    await page.getByRole('link', { name: /artists/i }).click()
    await expect(page).toHaveScreenshot('persistentArtistSettings.png')
  })
})

