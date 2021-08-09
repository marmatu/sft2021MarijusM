/* eslint-disable no-undef */
const { test, expect } = require('@playwright/test');
const { DuckStartPage } = require('../pages/duckStartPage');
const { DuckResultsPage } = require('../pages/duckResultsPage');


test.describe('', () => {
  let page;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    startPage = new DuckStartPage(page);
    resultsPage = new DuckResultsPage(page);
  });

  test.beforeEach(async () => {
    await startPage.goto();
  });

  test('duckduckgo is loading', async () => {
    const duckLogo = await page.isVisible('#logo_homepage_link');

    expect(duckLogo).toBe(true);
  });

  test('search test', async () => {
    await startPage.initiateSearch('Test');

    const firstResult = await page.textContent('#r1-0');
    expect(firstResult).toContain('test');
  });

  test('cheatsheet test', async () => {
    await startPage.initiateSearch('microsoft word cheat sheet');
    const cheatSheetVisible = await page.isVisible('a[data-zci-link="cheat_sheets"]');
    const cheatSheetTitle = await page.textContent('h3.c-base__title');
    expect(cheatSheetVisible).toBe(true);
    expect(cheatSheetTitle).toContain('Microsoft Word 2010');
  });

  test('short url test', async () => {
    await startPage.initiateSearch('shorten www.wikipedia.com');
    const shortUrl = await page.getAttribute('#shorten-url', 'value');
    await page.goto(shortUrl);
    expect(page.url()).toBe('https://www.wikipedia.org/');
  });

  test('check inTitle functionality', async ({ page }) => {
    await startPage.initiateSearch('intitle:panda');
    const results = await page.evaluate(() => Array.from(document.querySelectorAll('.result__title'), element => element.textContent));
    results.forEach(result => {
      expect(result.toLowerCase()).toContain('panda');
    });
  });

  const passwordsLengths = ['8', '16', '64'];
  passwordsLengths.forEach(passwordLength => {
    test(`Generate ${passwordLength} chracters long password`, async () => {
      await startPage.initiateSearch('password ' + passwordLength);
      const generatedPassword = await resultsPage.getGeneratedPassword();
      expect(generatedPassword.length).toEqual(+passwordLength);
    });
  });

  const invalidPasswordLengths = ['7', '65'];
  invalidPasswordLengths.forEach(passwordLength => {
    test(`Fails to Generate ${passwordLength} chracters long password`, async () => {
      await startPage.initiateSearch('password ' + passwordLength);
      const isPasswordElementVisible = await page.isVisible('.c-base__sub');
      expect(isPasswordElementVisible).toEqual(false);
    });
  });
});