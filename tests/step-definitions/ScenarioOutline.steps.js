const { Given, When, Then, Before, After, setDefaultTimeout } = require('@cucumber/cucumber');

setDefaultTimeout(10000); // Set default timeout to 10 seconds

const { expect } = require('@playwright/test');
const XLSX = require('xlsx');
const { chromium } = require('playwright');
const path = require('path');

let page;
let browser;
let loginData;

// Function to read data from the Excel file
const readLoginData = () => {
    try {
        const workbook = XLSX.readFile('loginData.xlsx');
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        return XLSX.utils.sheet_to_json(worksheet);
    } catch (error) {
        console.error('Error reading login data:', error);
        return [];
    }
};

loginData = readLoginData(); // Read login data once

// Function to capture screenshots
const captureScreenshot = async (name) => {
    const screenshotPath = path.join(__dirname, '..', 'reports', `${name}.png`);
    await page.screenshot({ path: screenshotPath });
};

// Launch browser before scenarios with the @InvalidLogin tag
Before({ tags: "@InvalidLogin" }, async () => {
    browser = await chromium.launch({ headless: false });
    page = await browser.newPage();
});

Given('I navigate to the login page', async () => {
    await page.goto('https://github.com/login');
});

// Step definition to fill in username and password
When('I fill in the username {string} and password {string}', async (username, password) => {
    await page.fill('input[name="login"]', username);
    await page.fill('input[name="password"]', password);
});

// Click the login button
When('I click the login button', async () => {
    await page.click('input[name="commit"]');
});

// Validate that an error message appears for failed login
Then('I should see an error message indicating that the login failed', async () => {
    const errorMessage = await page.locator('.js-flash-alert');
    await errorMessage.waitFor({ state: 'visible' }); // Wait for the error message to be visible
    await expect(errorMessage).toBeVisible();
});

// Capture screenshot and close browser after tests
After(async () => {
    if (page) {
        await captureScreenshot('login_page');
        await page.close();
        await browser.close(); // Close the browser
    }
});
