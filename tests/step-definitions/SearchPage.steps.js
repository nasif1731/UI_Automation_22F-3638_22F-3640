const { Given, When, Then, After } = require('@cucumber/cucumber');
const { chromium } = require('playwright');

let browser, context, page;

Given('I navigate to the Google homepage', { timeout: 20000 }, async () => {
  console.log('Launching browser...');
  browser = await chromium.launch({ headless: false });
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
  // Wait for the textarea to be visible
  await page.waitForSelector('textarea[name="q"]', { state: 'visible', timeout: 10000 });
  await page.fill('textarea[name="q"]', searchTerm); // Updated to use textarea
  await page.press('textarea[name="q"]', 'Enter'); // Updated to use textarea
  await page.waitForTimeout(2000); // Optional: Wait for results to load
});


Then('I should see search results related to {string}', async (searchTerm) => {
    const resultVisible = await page.isVisible(`h3.LC20lb:has-text("${searchTerm}")`);
    if (!resultVisible) {
        throw new Error(`Search results for "${searchTerm}" are not visible`);
    }
});

// After hook to close the browser
After(async () => {
    if (browser) {
        await browser.close();
    }
});
