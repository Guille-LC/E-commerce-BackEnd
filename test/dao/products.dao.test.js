//npx mocha test/dao/products.dao.test.js

import mongoose from "mongoose";
import ProductsDao from '../../src/DAO/products.dao.js'
import Assert from 'assert'
import dotenv from "dotenv";
dotenv.config();

mongoose.connect(process.env.MONGO_URL)

const assert = Assert.strict;

describe('Testing de products DAO', () => {
    before(function() {
        this.productsDao = new ProductsDao()
    })
    beforeEach(function() {
        this.timeout(5000)
    })

    it('Devolver los productos en Array', async function() {
        const result = await this.productsDao.getAll();
        assert.strictEqual(Array.isArray(result), true)
    })

})