const Page = require('./page');

class Index extends Page {

    get btn () {
        return $('#toggle');
    }

    async toCatalog () {
        await this.btn.click();
    }


    open () {
        return super.open('/basket');
    }
}

module.exports = new Index();
