const { After, Status } = require('@cucumber/cucumber');
const fs = require('fs');

After(async function (scenario) {
  if (scenario.result.status === Status.FAILED) {
    // Capture screenshot for failed scenario
    const screenshot = await this.page.screenshot();
    await fs.writeFileSync(`./allure-results/${scenario.pickle.name}.png`, screenshot);
  }
});
