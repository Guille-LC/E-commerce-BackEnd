import * as chai from 'chai'
import { faker } from '@faker-js/faker'
import supertest from 'supertest'
import mongoose from 'mongoose'

const expect = chai.expect;
const urlServer = 'http://localhost:8080'
const requester = supertest(urlServer);

describe('Testing de APIs', () => {

    describe('test de usuarios', () => {
        
        it('Recibir todos los usuarios', async () => {
            const {statusCode,_body} = await requester.get('/api/users/all')
            
            expect(statusCode).is.eqls(200)

            expect(_body.payload).to.be.an('array')
        })

        it('Crear un usuario', async () => {

            const fakeUser = {
                name: faker.person.firstName(),
                age: faker.number.int({ min: 18, max: 80 }),
                email: faker.internet.email(),
                role: faker.helpers.arrayElement(["user", "admin"]),
                pets: [],
                password: faker.internet.password(),
                loggedBy: 'Facker Mock Test'
            };

            const {statusCode, _body} = await requester.post('/api/users/createuser').send(fakeUser)

            expect(statusCode).is.eqls(201)
            expect(_body.payload).is.ok.and.is.to.have.property('_id')
        })
    })
})