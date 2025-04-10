const { By } = require('selenium-webdriver');
const BaseTest = require('../Base_Test');

class FailedLoginTest extends BaseTest {
    constructor() {
        super('Failed Login Test');
    }

    async run(page) {
        await page.openUrl('https://www.saucedemo.com/');

        await page.typeText(By.id('user-name'), 'invalid_user');
        await page.log('Entered invalid User name(invalid_user)');

        await page.typeText(By.id('password'), 'wrong_password');
        await page.log('Entered invalid Password(wrong_password)');

        await page.click(By.id('login-button'));
        await page.log('Clicked on Login button');

        await page.waitForElement(By.xpath("//h3[contains(text(),'Epic sadface')]"));
        await page.takeScreenshot('FailedLoginTest');
        await page.log('Error message is present');

        const errorMessage = await page.findElement(By.xpath("//h3[contains(text(),'Epic sadface')]"));
        const text = await errorMessage.getText();

        if (text !== 'Epic sadface: Username and password do not match any user in this service') {
            throw new Error(`Unexpected error message: ${text}`);
        }
    }
}

module.exports = FailedLoginTest;
