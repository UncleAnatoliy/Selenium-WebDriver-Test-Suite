const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const path = require('path');
const Logger = require('./utils/logger');
const Screenshot = require('./utils/screenshot');

class BasePage {
    constructor(browser = 'chrome', logFileName = 'logs.txt', screenshotDirName = 'screenshots') {
//обираємо браузер для тестування, ім'я файлу для логів, директорію для скріншотів(використовується у index.js)
        const options = new chrome.Options();
        options.addArguments('--headless'); // Увімкнути headless режим
        options.addArguments('--disable-gpu'); // Вимкнути GPU (рекомендується для стабільності)
        options.addArguments('--window-size=1920,1080'); // Налаштувати розмір вікна

        this.driver = new Builder()
            .forBrowser(browser)
            .setChromeOptions(options)
            .build();
        
        this.logFilePath = path.join('./logs/', logFileName);
        this.screenshotDir = path.join('./logs/', screenshotDirName);
        this.logger = new Logger(this.logFilePath);
        this.screenshotHandler = new Screenshot(this.screenshotDir);
        this.tests = [];
    }

    

    async log(message) {
        await this.logger.log(message);
    }

    async clearLog() {
        await this.logger.clearLog();
    }

    async takeScreenshot(prefix) {
        await this.screenshotHandler.takeScreenshot(this.driver, prefix);
    }

    async clearScreenshots() {
        await this.screenshotHandler.clearScreenshots();
    }

    async openUrl(url) {
        await this.driver.get(url);
    }

    async findElement(locator) {
        return await this.driver.findElement(locator);
    }

    async waitForElement(locator, timeout = 5000) {
        await this.driver.wait(until.elementLocated(locator), timeout);
    }

    async isElementVisible(locator) {
        const element = await this.findElement(locator);
        return await element.isDisplayed();
    }

    async typeText(locator, text) {
        const element = await this.findElement(locator);
        await element.sendKeys(text);
    }

    async click(locator) {
        const element = await this.findElement(locator);
        await element.click();
    }

    async close() {
        await this.driver.quit();
    }

    addTest(test) {
        this.tests.push(test);
    }

    async runTests() {
        
        for (const test of this.tests) {
            try {
                await this.log(`🟢"${test.name}" execution started`);

                await test.run(this);
                await this.log(`✅ Test "${test.name}" passed successfully!`);
            } catch (error) {
                await this.takeScreenshot(`Error_${test.name}`);
                await this.log(`❌ Error in test "${test.name}": ${error.message}`);
                console.log(error.message);
            }
        }
    }

    async selectDropdown(locator, value) {
        // Очікуємо, поки елемент стане доступним
        let dropdown = await this.driver.wait(until.elementLocated(locator), 5000);
        await dropdown.click(); // Клікаємо для відкриття списку
    
        // Отримуємо всі варіанти зі списку
        let options = await dropdown.findElements(By.tagName('option'));
    
        for (let option of options) {
            let text = await option.getText(); // Отримуємо текст опції
            if (text.trim() === value.trim()) {
                await option.click(); // Обираємо потрібний варіант
                return;
            }
        }
        
        throw new Error(`Option "${value}" not found in dropdown`); // Викидаємо помилку, якщо значення не знайдено
    }
    
}

module.exports = BasePage;
