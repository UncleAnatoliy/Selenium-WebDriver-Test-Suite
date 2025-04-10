const { By, until } = require('selenium-webdriver');
const BaseTest = require('../Base_Test');

class CheckoutNegativeTest extends BaseTest {
    constructor() {
        super('Checkout Negative Test');
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

        await page.click(By.css('#add-to-cart-sauce-labs-backpack'));
        await page.log('Add to cart: "Sauce Labs Backpack"');

        await page.click(By.css('#add-to-cart-sauce-labs-bike-light'));
        await page.log('Add to cart: "Sauce Labs Bike Light"');

        await page.click(By.css('.shopping_cart_link'));
        await page.driver.wait(until.urlContains('/cart.html'), 5000);

        const cartUrl = await page.driver.getCurrentUrl();
        if (!cartUrl.includes('/cart.html')) {
            throw new Error(`Unexpected URL: ${cartUrl}`);
        }
        await page.log('Page Cart is present (taken screenshot)');
        await page.takeScreenshot('Cart_Opened');

        await page.click(By.css('#checkout'));
        await page.driver.wait(until.urlContains('/checkout-step-one.html'), 5000);
        await page.log('Moved to the first step of the checkout process (taken screenshot)');
        await page.takeScreenshot('Checkout_Step_One');

        // Вводимо лише Last Name та Postal Code, пропускаючи First Name
        await page.typeText(By.css('#last-name'), 'LastName');
        await page.log('Entered Last Name: LastName');

        await page.typeText(By.css('#postal-code'), '123456');
        await page.log('Entered Postal Code: 123456');
        
        await page.click(By.css('#continue'));
        await page.log('Clicked continue button');

        // Перевіряємо наявність повідомлення про помилку
        try {
            const errorElement = await page.driver.wait(until.elementLocated(By.css('.error-message-container')), 3000);
            const errorMessage = await errorElement.getText();
            await page.log(`Error message displayed: ${errorMessage} (taken screenshot)`);
            await page.takeScreenshot('Error_Message_Displayed');
        } catch (error) {
            throw new Error('Error message was NOT displayed, but should be! Test failed.');
        }
    }
}

module.exports = CheckoutNegativeTest;
