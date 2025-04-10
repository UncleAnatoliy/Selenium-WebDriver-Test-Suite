const fs = require('fs');
const path = require('path');

class Logger {
    constructor(logFilePath) {
        this.logFilePath = logFilePath;

        // Перевіряємо існування файлу, якщо його немає – створюємо
        if (!fs.existsSync(this.logFilePath)) {
            fs.writeFileSync(this.logFilePath, '', { flag: 'w' });
        }
    }

    log(message) {
        try {
            const now = new Date();
            const dayOfWeek = now.toLocaleString('en-US', { weekday: 'long' }); // День тижня англійською
            const date = now.toLocaleDateString('en-GB').replace(/\//g, '/'); // Формат дд/мм/рррр
            const time = now.toLocaleTimeString('en-GB'); // Формат HH:MM:SS
            
            // Формуємо лог у вигляді таблиці
            const logMessage = `${dayOfWeek.padEnd(10)}| ${date} | ${time} | ${message}`;

            fs.appendFileSync(this.logFilePath, logMessage + '\n', { encoding: 'utf8', flag: 'a' });
        } catch (error) {
            console.error('Error in logging message:', error);
        }
    }

    clearLog() {
        try {
            fs.writeFileSync(this.logFilePath, '', { encoding: 'utf8', flag: 'w' });
        } catch (error) {
            console.error('Error while clearing log file:', error);
        }
    }
}

module.exports = Logger;
