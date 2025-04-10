const { By, until } = require('selenium-webdriver');
const BaseTest = require('../Base_Test');

class LoginPositiveTest extends BaseTest {
    constructor() {
        super('Login Positive Test');
    }

    async run(page) {
        await page.openUrl('https://www.saucedemo.com/');

        await page.typeText(By.id('user-name'), 'standard_user');
        await page.log('Entered valid User name');
        
        await page.typeText(By.id('password'), 'secret_sauce');
        await page.log('Entered valid Password');

        await page.click(By.id('login-button'));
        await page.log('Clicked on Login button');

        await page.driver.wait(until.urlContains('/inventory.html'), 5000);
        await page.log('Inventory page is present');
        await page.takeScreenshot('InventoryPage');

        const currentUrl = await page.driver.getCurrentUrl();

        if (!currentUrl.includes('/inventory.html')) {
            throw new Error(`Unexpected URL: ${currentUrl}`);
        }
        await page.log('Inventory page is present');
        await page.log('✅ Successfully logged in');
    }
}

module.exports = LoginPositiveTest;
