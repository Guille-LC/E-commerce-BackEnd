//npx mocha test/dao/users.dao.test.js
import mongoose from "mongoose";
import UsersDAO from "../../src/DAO/users.dao.js";
import dotenv from 'dotenv';
dotenv.config();

mongoose.connect(process.env.MONGO_URL)

describe('Testing de users DAO', () => {
    before(function() {
        this.usersDao = new UsersDAO();
    })
    beforeEach(function() {
        this.timeout(5000)
    })

    it('Devolver todos los usuarios en un Array', async function() {
        const result = await this.usersDao.getAll();

        expect(result.to.be.deep.equal([]))
    })
})