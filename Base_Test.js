const Logger = require('./utils/logger');


class BaseTest {
    constructor(name) {
        this.name = name;
        
    }

    async run(page) {

        throw new Error('run method must be implemented');
    }


}

module.exports = BaseTest;
