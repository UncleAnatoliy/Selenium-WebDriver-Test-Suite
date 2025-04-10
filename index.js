const Page = require('./Base_Page');

const AddToCartTest = require('./tests/Add_to_cart_Test');
const LoginPositiveTest = require('./tests/Login_Positive_Test');
const RemoveFromCartTest = require('./tests/Remove_From_Cart_Test');
const FailedLoginTest = require('./tests/Failed_Login_Test');
const LockedOutUserLoginTest = require('./tests/Locked_Out_User_Login_Test');
const CheckoutPositiveTest = require('./tests/Checkout_Positive_Test');
const CheckoutNegativeTest = require('./tests/Checkout_Negative_Test');
const AlphabeticalSortTest = require('./tests/Alphabetical_Sort_Test');

(async function () {
    // Масив значень для конструктора класу Page(додаємо браузер, файли для логів, директорію для скріншотів і тести)
    const testData = [
        { browser: 'chrome', logFileName: 'Add_To_Cart_Test.txt', screenshotDir: 'Add_To_Cart_Test', testClass: new AddToCartTest() },
        { browser: 'chrome', logFileName: 'Login_Positive_Test.txt', screenshotDir: 'Login_Positive_Test', testClass: new LoginPositiveTest() },
        { browser: 'chrome', logFileName: 'Failed_Login_Test.txt', screenshotDir: 'Failed_Login_Test', testClass: new FailedLoginTest() },
        { browser: 'chrome', logFileName: 'Locked_Out_User_Login_Test.txt', screenshotDir: 'Locked_Out_User_Login_Test', testClass: new LockedOutUserLoginTest() },
        { browser: 'chrome', logFileName: 'Remove_From_Cart_Test.txt', screenshotDir: 'Remove_From_Cart_Test', testClass: new RemoveFromCartTest() },
        { browser: 'chrome', logFileName: 'Checkout_Positive_Test.txt', screenshotDir: 'Checkout_Positive_Test', testClass: new CheckoutPositiveTest() },
        { browser: 'chrome', logFileName: 'Checkout_Negative_Test.txt', screenshotDir: 'Checkout_Negative_Test', testClass: new CheckoutNegativeTest() },
        { browser: 'chrome', logFileName: 'Alphabetical_Sort_Test.txt', screenshotDir: 'Alphabetical_Sort_Test', testClass: new AlphabeticalSortTest() },
    ];

    // Виконання тестів
    for (let i = 0; i < 1; i++) { // Вказуємо кількість тестів
        const { browser, logFileName, screenshotDir, testClass } = testData[i];
        let page;
        try {
            page = new Page(browser, logFileName, screenshotDir); // Тепер екземпляр page визначений тут

            await page.clearScreenshots();
            await page.clearLog();

            page.addTest(testClass); // Додаємо тест до сторінки

            await page.runTests();
            console.log(`Test "${testClass.constructor.name}" completed successfully.`);
        } catch (error) {
            console.error(`Test "${testClass.constructor.name}" failed:`, error);
        } finally {
            // Перевіряємо, чи існує page, перед тим як закрити
            if (page) {
                await page.close();
            }
        }
    }
})();
