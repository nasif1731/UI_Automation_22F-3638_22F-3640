const { Given, When, Then, After } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const XLSX = require('xlsx');

let browser, context;

function loadTestData() {
    const workbook = XLSX.readFile('testData.xlsx');
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    return XLSX.utils.sheet_to_json(worksheet);
}

Given('I navigate to the login page', { timeout: 10000 }, async function () {
    browser = await chromium.launch({ headless: true });
    context = await browser.newContext();
    this.page = await context.newPage(); 
    await this.page.goto('https://github.com/login', { waitUntil: 'networkidle' });
});

When('I fill in the username {string} and password {string}', async function (username, password) {
    await this.page.fill('input[name="login"]', username);
    await this.page.fill('input[name="password"]', password);
});

When('I click the login button', async function () {
    await Promise.all([
        this.page.click('input[name="commit"]'),
        this.page.waitForNavigation({ waitUntil: 'networkidle' }),
    ]);
});

Then('I should see an error message indicating that the login failed', async function () {
    await this.page.waitForSelector('.js-flash-alert', { timeout: 5000 }); 
    const errorMessage = await this.page.innerText('.js-flash-alert');
    if (!errorMessage.includes('Incorrect username or password')) {
        await this.page.screenshot({ path: 'error-screenshot.png' });
        throw new Error('Expected error message not found');
    }
});

After(async () => {
    if (browser) {
        await browser.close();
    }
});
