const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { allure } = require('allure-cucumberjs'); // Include Allure for reporting
const XLSX = require('xlsx');

let page;
let loginData;
allure.setOptions({
    outputDir: 'allure-results', // Ensure this directory exists or is correctly set
});
// Function to read data from the Excel file
const readLoginData = () => {
  const workbook = XLSX.readFile('loginData.xlsx');
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  return XLSX.utils.sheet_to_json(worksheet);
};

loginData = readLoginData(); // Read login data once

Given('I navigate to the login page', async () => {
  allure.addLabel('feature', 'Login');
  allure.addLabel('story', 'User Login'); // Add story label
  const { chromium } = require('playwright');
  const browser = await chromium.launch({ headless: false });
  page = await browser.newPage();
  await page.goto('https://github.com/login');
});

// Scenario Outline step to fill in username and password
When('I fill in the username {string} and password {string}', async (username, password) => {
  allure.addStep(`Attempting to login with username: ${username}`); // Log attempt
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
  await expect(errorMessage).toBeVisible();
});
