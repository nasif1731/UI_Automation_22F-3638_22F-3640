const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const { allure } = require('allure-cucumberjs'); 

let page;
allure.setOptions({
    outputDir: 'allure-results', 
});
Given('I navigate to the Google homepage', async () => {
  const { chromium } = require('playwright');
  const browser = await chromium.launch({ headless: true });
  page = await browser.newPage();
  await page.goto('https://www.google.com');
  
  allure.step('Navigate to Google homepage'); 
});

When('I search for {string}', async (searchTerm) => {
  await page.waitForSelector('input[name="q"]');
  await page.fill('input[name="q"]', searchTerm); 
  await page.press('input[name="q"]', 'Enter'); 

  allure.step(`Search for "${searchTerm}"`); 
});

Then('I should see search results related to {string}', async (searchTerm) => {
  await page.waitForSelector('h3.LC20lb.MBeuO.DKV0Md'); 

  const resultTitles = await page.locator('h3.LC20lb.MBeuO.DKV0Md').allTextContents();
  
  console.log('Search Result Titles:', resultTitles);

  const hasResult = resultTitles.some(title => title.toLowerCase().includes(searchTerm.toLowerCase()));
  
  console.log('Does any title contain the search term?', hasResult); // Log the result of the check

  expect(hasResult).toBe(true); 
  
  allure.step(`Verify search results contain "${searchTerm}"`); // Add Allure step
  await page.close();
});


const { Before, After } = require('@cucumber/cucumber');

Before(() => {
  allure.label('feature', 'Google Search'); 
  allure.label('owner', 'Your Name'); 
  allure.tag('smoke'); 
});

After(async () => {
  if (page) {
    const screenshot = await page.screenshot();
    allure.addAttachment('Screenshot', screenshot, 'image/png'); 
  }
});
