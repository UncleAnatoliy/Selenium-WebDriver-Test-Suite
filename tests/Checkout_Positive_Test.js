const { By, until } = require('selenium-webdriver');
const BaseTest = require('../Base_Test');

class CheckoutPositiveTest extends BaseTest {
    constructor() {
        super('Checkout Positive Test');
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
        await page.log('Page Cart is present(taken screenshot)');
        await page.takeScreenshot('Cart_Opened');

        await page.click(By.css('#checkout'));
        await page.driver.wait(until.urlContains('/checkout-step-one.html'), 5000);
        const checkoutOne_Url = await page.driver.getCurrentUrl();
        if (!checkoutOne_Url.includes('/checkout-step-one.html')) {
            throw new Error(`Unexpected URL: ${checkoutOne_Url}`);
        }

        await page.log('Moved to the first step of the checkout process(taken screenshot)');
        await page.takeScreenshot('Moved to the first step of the checkout process');

        await page.typeText(By.css('#first-name'),'FirstName');
        await page.log('Entered First Name: FirstName');

        await page.typeText(By.css('#last-name'),'LastName');
        await page.log('Entered Last Name: LastName');

        await page.typeText(By.css('#postal-code'),'123456');
        await page.log('Entered Postal Code: 123456');
        
        await page.click(By.css('#continue'));
        await page.log('Clicked continue button');
        await page.driver.wait(until.urlContains('/checkout-step-two.html'), 5000);
        const checkoutTwo_Url = await page.driver.getCurrentUrl();
        if (!checkoutTwo_Url.includes('/checkout-step-two.html')) {
            throw new Error(`Unexpected URL: ${checkoutTwo_Url}`);
        }else{
            await page.log('Page "Checkout Overview" opened(taken screenshot)');
            await page.takeScreenshot('Page_Checkout_Overview_Opened');
        }

        await page.click(By.css('#finish'));
        await page.driver.wait(until.urlContains('/checkout-complete.html'), 5000);
        const checkoutFinish_Url = await page.driver.getCurrentUrl();
        if (!checkoutFinish_Url.includes('/checkout-complete.html')) {
            throw new Error(`Unexpected URL: ${checkoutFinish_Url}`);
        }else{
            await page.log('Checkout completed(taken screenshot)');
            await page.takeScreenshot('Checkout_completed');
        }
}
}

module.exports = CheckoutPositiveTest;
