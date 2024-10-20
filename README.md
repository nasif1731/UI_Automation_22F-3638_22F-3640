# Test Automation Project Setup
### Date: 2024-10-18
## Author: 
22F-3638
22F-3640
## Introduction
This document provides an overview of the setup and dependencies required to run the test automation project. It is intended for developers and testers who wish to clone and execute the project.
## Prerequisites
Ensure that the following prerequisites are met before proceeding with the installation:
- Operating System: Windows, macOS, or Linux.
- Node.js and npm should be installed on your machine.
## Dependencies
The following dependencies are required for the project:
1. Playwright: For browser automation.
   - Installation: `npm install playwright`
2. Cucumber.js: For behavior-driven development (BDD).
   - Installation: `npm install @cucumber/cucumber`
3. XLSX: For reading Excel files.
   - Installation: `npm install xlsx`
4. (Optional) dotenv: For managing environment variables.
   - Installation: `npm install dotenv`
5. (Optional) Jest: For additional testing.
   - Installation: `npm install jest`
## Installation Instructions
Follow these steps to install the required dependencies:
1. Ensure that Node.js and npm are installed on your system.
   - Download from [Node.js official website](https://nodejs.org/).
2. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```
   <br/>
https://github.com/nasif1731/UI_Automation_22F-3638_22F-3640.git
3. Install the required dependencies:
   ```bash
   npm install playwright @cucumber/cucumber xlsx
   ```
4. (Optional) Install dotenv:
   ```bash
   npm install dotenv
   ```
5. (Optional) Install Jest:
   ```bash
   npm install jest
   ```
## Running Tests
To run the tests, use the following command:
```bash
npx cucumber-js
```
## Expected outcome: 
The tests should execute, and you should see the results in the console output.
## Conclusion
This document provides the necessary information to set up and run the test automation project. Ensure all dependencies are installed correctly to avoid any runtime issues.
