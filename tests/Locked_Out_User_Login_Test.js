const { By } = require('selenium-webdriver');
const BaseTest = require('../Base_Test');

class LockedOutUserLoginTest extends BaseTest {
    constructor() {
        super('Locked Out User Login Test');
    }

    async run(page) {
        await page.openUrl('https://www.saucedemo.com/');

        await page.typeText(By.id('user-name'), 'locked_out_user');
        await page.log('Entered Locked Out User Name(locked_out_user)');

        await page.typeText(By.id('password'), 'secret_sauce');
        await page.log('Entered valid Password(secret_sauce)');
        
        await page.click(By.id('login-button'));
        await page.log('Clicked on Login button');

        await page.waitForElement(By.xpath("//h3[contains(text(),'Epic sadface')]"));
        await page.takeScreenshot('LockedOutUserTest');

        const errorMessage = await page.findElement(By.xpath("//h3[contains(text(),'Epic sadface')]"));
        const text = await errorMessage.getText();

        if (text !== 'Epic sadface: Sorry, this user has been locked out.') {
            throw new Error(`Unexpected error message: ${text}`);
        }
    }
}

module.exports = LockedOutUserLoginTest;
