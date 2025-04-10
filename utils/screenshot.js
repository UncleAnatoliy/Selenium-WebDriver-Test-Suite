const fs = require('fs');
const path = require('path');

class Screenshot {
    constructor(screenshotDir) {
        this.screenshotDir = screenshotDir;
        this.ensureScreenshotDirExists();
    }

    ensureScreenshotDirExists() {
        // Створює всі вкладені директорії, якщо вони відсутні
        if (!fs.existsSync(this.screenshotDir)) {
            fs.mkdirSync(this.screenshotDir, { recursive: true });
        }
    }

    async takeScreenshot(driver, prefix) {
        const screenshot = await driver.takeScreenshot();
        const filePath = path.join(this.screenshotDir, `${prefix}_${Date.now()}.png`);
        fs.writeFileSync(filePath, screenshot, 'base64');
    }

    clearScreenshots() {
        if (fs.existsSync(this.screenshotDir)) {
            fs.readdirSync(this.screenshotDir).forEach(file => {
                fs.unlinkSync(path.join(this.screenshotDir, file));
            });
        }
    }
}

module.exports = Screenshot;
