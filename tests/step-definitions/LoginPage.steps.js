const { Given, When, Then, After } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const XLSX = require('xlsx');

let browser, context;

// Load test data from Excel
function loadTestData() {
    const workbook = XLSX.readFile('testData.xlsx');
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    return XLSX.utils.sheet_to_json(worksheet);
}

// Start browser and navigate to login page
Given('I navigate to the login page', { timeout: 10000 }, async function () {
    browser = await chromium.launch({ headless: false });
    context = await browser.newContext();
    this.page = await context.newPage(); // Use 'this' to set page context
    await this.page.goto('https://github.com/login', { waitUntil: 'networkidle' });
});

// Fill in the login form with valid credentials
When('I fill in the username {string} and password {string}', async function (username, password) {
    await this.page.fill('input[name="login"]', username);
    await this.page.fill('input[name="password"]', password);
});

// Click the login button
When('I click the login button', async function () {
    await Promise.all([
        this.page.click('input[name="commit"]'),
        this.page.waitForNavigation({ waitUntil: 'networkidle' }),
    ]);
});

// Check for an error message indicating login failure
Then('I should see an error message indicating that the login failed', async function () {
    await this.page.waitForSelector('.js-flash-alert', { timeout: 5000 }); // Wait for the error message
    const errorMessage = await this.page.innerText('.js-flash-alert');
    if (!errorMessage.includes('Incorrect username or password')) {
        await this.page.screenshot({ path: 'error-screenshot.png' });
        throw new Error('Expected error message not found');
    }
});

// After hook to close the browser
After(async () => {
    if (browser) {
        await browser.close();
    }
});
