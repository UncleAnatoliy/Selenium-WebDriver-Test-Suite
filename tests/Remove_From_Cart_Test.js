const { By, until } = require('selenium-webdriver');
const BaseTest = require('../Base_Test');

class RemoveFromCartTest extends BaseTest {
    constructor() {
        super('Remove From Cart Test');
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

        await page.findElement(By.css('#remove-sauce-labs-backpack'));
        await page.click(By.css('#remove-sauce-labs-backpack'));
        try{
            await page.findElement(By.css('#item_4_title_link > div:nth-child(1)'));
        } catch{
            await page.log('Sauce Labs Backpack removed from cart');
            await page.takeScreenshot('Sauce Labs Backpack removed from cart');
        }

        await page.findElement(By.css('#remove-sauce-labs-bike-light'));
        await page.click(By.css('#remove-sauce-labs-bike-light'));
        try{
            await page.findElement(By.css('#item_0_title_link > div:nth-child(1)'));
        } catch{
            await page.log('Sauce Labs Bike Light removed from cart');
            await page.takeScreenshot('Sauce Labs Bike Light removed from cart');
        }

        await page.click(By.css('#continue-shopping'));
        await page.driver.wait(until.urlContains('https://www.saucedemo.com/'), 5000);
        await page.log('Moved to Main Page');

        try{
            await page.findElement(By.css('#add-to-cart-sauce-labs-bike-light'));
            await page.log('Sauce Labs Bike Light removed from cart, product card has an Add to cart button');
            await page.takeScreenshot('Sauce Labs Bike Light card has an Add to cart button');

            await page.findElement(By.css('#add-to-cart-sauce-labs-backpack'));
            await page.log('Sauce Labs Backpack removed from cart, product card has an Add to cart button');
            await page.takeScreenshot('Sauce Labs Backpack card has an Add to cart button');
        } catch (error){
             await page.log(error);
        }
        

       

      
        

        
}
}

module.exports = RemoveFromCartTest;
