const { By, until } = require('selenium-webdriver'); // Імпорт необхідних модулів Selenium
const BaseTest = require('../Base_Test'); // Імпорт базового класу тестів

class AlphabeticalSortTest extends BaseTest {
    constructor() {
        super('Sort Alphabetical Test'); // Виклик конструктора базового класу з назвою тесту
    }

    async run(page) {
        await page.openUrl('https://www.saucedemo.com/'); // Відкриття сайту
        
        await page.typeText(By.id('user-name'), 'standard_user'); // Введення логіну
        await page.typeText(By.id('password'), 'secret_sauce'); // Введення паролю
        await page.click(By.id('login-button')); // Натискання кнопки входу
        
        await page.driver.wait(until.urlContains('/inventory.html'), 5000); // Очікування переходу на сторінку інвентарю

        // Логи і скріншот після відкриття інвентарю
        await page.log('Inventory page opened');
        await page.takeScreenshot('Inventory_page_opened');
        
        // Отримуємо список назв товарів перед сортуванням
        let productElements = await page.driver.findElements(By.css('.inventory_item_name'));
        let productNames = await Promise.all(productElements.map(async (el) => await el.getText())); // Отримання текстових назв товарів

        // Перевіряємо сортування Z-A
        await page.selectDropdown(By.css('.product_sort_container'), 'Name (Z to A)'); // Вибір сортування за алфавітом (Z-A)
        let sortedElements = await page.driver.findElements(By.css('.inventory_item_name')); // Отримуємо оновлений список товарів після сортування

        // Логи і скріншот після сортування Z-A
        await page.log('Sorted (Z to A)');
        await page.takeScreenshot('Sorted_Z_to_A');

        let sortedNamesUI = await Promise.all(sortedElements.map(async (el) => await el.getText())); // Отримання текстових назв товарів після сортування
        let expectedSortedNamesDesc = [...productNames].sort((a, b) => b.localeCompare(a)); // Очікуваний результат сортування Z-A
        
        // Перевіряємо, чи співпадає фактичний і очікуваний порядок товарів після сортування Z-A
        if (JSON.stringify(sortedNamesUI) !== JSON.stringify(expectedSortedNamesDesc)) {
            throw new Error('Sorting Z-A is incorrect'); // Викидаємо помилку, якщо сортування неправильне
        }
        await page.log('Sorting Z-A is correct'); // Логуємо успішну перевірку

        // Перевіряємо сортування A-Z
        await page.selectDropdown(By.css('.product_sort_container'), 'Name (A to Z)'); // Вибір сортування за алфавітом (A-Z)
        sortedElements = await page.driver.findElements(By.css('.inventory_item_name')); // Отримуємо оновлений список товарів після сортування

        // Логи і скріншот після сортування A-Z
        await page.log('Sorted (A to Z)');
        await page.takeScreenshot('Sorted_A_to_Z');
        
        sortedNamesUI = await Promise.all(sortedElements.map(async (el) => await el.getText())); // Отримання текстових назв товарів після сортування
        let expectedSortedNamesAsc = [...productNames].sort((a, b) => a.localeCompare(b)); // Очікуваний результат сортування A-Z
        
        // Перевіряємо, чи співпадає фактичний і очікуваний порядок товарів після сортування A-Z
        if (JSON.stringify(sortedNamesUI) !== JSON.stringify(expectedSortedNamesAsc)) {
            throw new Error('Sorting A-Z is incorrect'); // Викидаємо помилку, якщо сортування неправильне
        }
        await page.log('Sorting A-Z is correct'); // Логуємо успішну перевірку
    }
}

module.exports = AlphabeticalSortTest; // Експортуємо клас для використання у тестах
