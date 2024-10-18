const { Given, When, Then, Before, After, setDefaultTimeout } = require('@cucumber/cucumber');

setDefaultTimeout(10000); // Set default timeout to 10 seconds

const { expect } = require('@playwright/test');
const { chromium } = require('playwright');
const path = require('path');

let page;
let browser;

// Function to capture screenshots
const captureScreenshot = async (name) => {
    const screenshotPath = path.join(__dirname, '..', 'reports', `${name}.png`);
    await page.screenshot({ path: screenshotPath });
};

Before(async () => {
    browser = await chromium.launch({ headless: true });
    page = await browser.newPage();
});

Given('I navigate to the Google homepage',{ timeout: 10000 }, async () => {
    await page.goto('https://www.google.com');
});

When('I search for {string}', async (searchTerm) => {
    await page.waitForSelector('input[name="q"]');
    await page.fill('input[name="q"]', searchTerm);
    await page.press('input[name="q"]', 'Enter');
});

Then('I should see search results related to {string}', async (searchTerm) => {
    await page.waitForSelector('h3.LC20lb.MBeuO.DKV0Md');

    const resultTitles = await page.locator('h3.LC20lb.MBeuO.DKV0Md').allTextContents();
    const hasResult = resultTitles.some(title => title.toLowerCase().includes(searchTerm.toLowerCase()));

    expect(hasResult).toBeTruthy();
});

After(async () => {
    if (page) {
        await captureScreenshot('google_search_results');
        await page.close();
        await browser.close(); // Ensure proper cleanup
    }
});
