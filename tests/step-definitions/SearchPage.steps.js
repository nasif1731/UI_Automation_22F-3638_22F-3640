const { Given, When, Then, After } = require('@cucumber/cucumber');
const { chromium } = require('playwright');

let browser, context, page;

Given('I navigate to the Google homepage', { timeout: 20000 }, async () => {
  console.log('Launching browser...');
  browser = await chromium.launch({ headless: true });
  context = await browser.newContext();
  page = await context.newPage();

  console.log('Navigating to Google...');
  await page.goto('https://www.google.com', { waitUntil: 'networkidle', timeout: 20000 });

  const isVisible = await page.isVisible('textarea[name="q"]', { timeout: 10000 });
  console.log(`Search input visible: ${isVisible}`);
  if (!isVisible) {
      throw new Error('Google search input is not visible');
  }
});



When('I search for {string}', async (searchTerm) => {
 
  await page.waitForSelector('textarea[name="q"]', { state: 'visible', timeout: 10000 });
  await page.fill('textarea[name="q"]', searchTerm);
  await page.press('textarea[name="q"]', 'Enter'); 
  await page.waitForTimeout(2000); 
});


Then('I should see search results related to {string}', async (searchTerm) => {
    const resultVisible = await page.isVisible(`h3.LC20lb:has-text("${searchTerm}")`);
    if (!resultVisible) {
        throw new Error(`Search results for "${searchTerm}" are not visible`);
    }
});

After(async () => {
    if (browser) {
        await browser.close();
    }
});
