const { By, until } = require('selenium-webdriver');
const BaseTest = require('../Base_Test');

class AddToCartTest extends BaseTest {
    constructor() {
        super('Add To Cart Test');
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

        const currentUrl = await page.driver.getCurrentUrl();
        if (!currentUrl.includes('/cart.html')) {
            throw new Error(`Unexpected URL: ${currentUrl}`);
        }
        await page.log('Page Cart is ppresent(taken screenshot)');
        await page.takeScreenshot('Cart opened');

        await page.findElement(By.css('#item_4_title_link > div:nth-child(1)'));
        await page.log('Finded Sauce Labs Backpack in cart ');

        await page.findElement(By.css('#item_0_title_link > div:nth-child(1)'));
        await page.log('Finded Sauce Labs Bike Light in cart ');

        await page.takeScreenshot('Items in cart')
        await page.log('Taken screenshot');


        
}
}

module.exports = AddToCartTest;
