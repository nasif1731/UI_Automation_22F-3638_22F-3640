const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { allure } = require('allure-cucumberjs');

let page;
allure.setOptions({
  outputDir: 'allure-results', 
});
Given('I navigate to the login page', async () => {
  allure.addLabel('feature', 'Login'); 
  allure.addLabel('story', 'User Login'); 
  const { chromium } = require('playwright');
  const browser = await chromium.launch({ headless: false });
  page = await browser.newPage();
  await page.goto('https://github.com/login'); 
});

When('I fill in the username and password', async () => {
  allure.addStep('Filling in username and password'); 
  await page.fill('input[name="login"]', 'nasif1731'); 
  await page.fill('input[name="password"]', 'Cumin432'); 
});

When('I click the login button', async () => {
  allure.addStep('Clicking the login button');
  await page.click('input[name="commit"]'); 
});

Then('I should see the dashboard page', async () => {
  allure.addStep('Verifying dashboard page visibility'); 
  await expect(page).toHaveURL('https://github.com/'); 
  const dashboard = page.locator('span.AppHeader-context-item-label:text("Dashboard")');
  await expect(dashboard).toBeVisible();
});
