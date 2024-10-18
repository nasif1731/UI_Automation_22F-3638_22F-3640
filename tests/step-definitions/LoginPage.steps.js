const { Given, When, Then, Before, After, setDefaultTimeout } = require('@cucumber/cucumber');

setDefaultTimeout(10000); // Set default timeout to 10 seconds

const { chromium } = require('playwright');
const { expect } = require('@playwright/test');
const path = require('path');

let browser;
let page;

// Function to capture screenshots
const captureScreenshot = async (name) => {
    const screenshotPath = path.join(__dirname, '..', 'reports', `${name}.png`);
    await page.screenshot({ path: screenshotPath });
};

// Initialize browser and page before tests with the @Login tag
Before({ tags: "@Login" }, async () => {
    browser = await chromium.launch({ headless: false });
    page = await browser.newPage();
});

// Navigate to the login page
Given('I navigate to the login page', async () => {
    await page.goto('https://github.com/login');
});

// Fill in the username and password fields
When('I fill in the username and password', async () => {
    await page.fill('input[name="login"]', 'nasif1731');
    await page.fill('input[name="password"]', 'Cumin432');
});

// Click the login button
When('I click the login button', async () => {
    await page.click('input[name="commit"]');
});

// Verify the dashboard page after successful login
Then('I should see the dashboard page', async () => {
    await page.waitForURL('https://github.com/'); // Wait until URL changes to dashboard

    // Verify that a specific element on the dashboard is visible
    const dashboardElement = await page.locator('summary[aria-label="View profile and more"]');
    await expect(dashboardElement).toBeVisible();
});

// Capture screenshot and close browser after tests
After(async () => {
    if (page) {
        await captureScreenshot('login_page');
        await page.close();
        await browser.close(); // Ensure browser is closed to avoid memory leaks
    }
});
