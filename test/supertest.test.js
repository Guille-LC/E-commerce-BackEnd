import * as chai from 'chai'
import { faker } from '@faker-js/faker'
import supertest from 'supertest'
import { logger } from '../src/config/logger.js';

const expect = chai.expect;
const urlServer = 'http://localhost:8080'
const requester = supertest(urlServer);

describe('Testing de APIs', () => {

    describe('Test de usuarios', () => {
        
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

        it('Crear usuario sin nombre', async () => {
            const fakeUser2 = {
                age: faker.number.int({ min: 18, max: 80 }),
                email: faker.internet.email(),
                role: faker.helpers.arrayElement(["user", "admin"]),
                pets: [],
                password: faker.internet.password(),
                loggedBy: 'Facker Mock Test'
            };

            const {statusCode} = await requester.post('/api/users/createuser').send(fakeUser2)
            logger.info(statusCode)
            expect(statusCode).is.equals(400)
        })

        it('Crear usuario sin email', async () => {
            const fakeUser3 = {
                name: faker.person.firstName(),
                age: faker.number.int({ min: 18, max: 80 }),
                role: faker.helpers.arrayElement(["user", "admin"]),
                pets: [],
                password: faker.internet.password(),
                loggedBy: 'Facker Mock Test'
            }

            const {statusCode} = await requester.post('/api/users/createuser').send(fakeUser3)
            logger.info(statusCode)
            expect(statusCode).is.eqls(400)
        })
    })

    describe('Test de productos', () => {
        it('Recibir todos los productos en un array', async () => {
            const {statusCode,_body} = await requester.get('/api/')

            expect(statusCode).is.eqls(200)

            expect(_body.payload).to.be.an('array')

        })

        it('Crear un producto', async () => {
            const fakeProduct = {
                title: faker.lorem.words(3),
                description: faker.lorem.sentences(2),
                code: faker.string.alphanumeric(8).toUpperCase(),
                price: faker.number.int({ min: 500, max: 5000 }),
                status: faker.datatype.boolean(),
                stock: faker.number.int({ min: 0, max: 100 }),
                category: faker.helpers.arrayElement([
                    "Acción",
                    "Comedia",
                    "Drama",
                    "Terror",
                    "Ciencia Ficción",
                    "Aventura",
                    "Animación",
                    "Suspenso"
                ]),
                thumbnails: faker.image.url()
            }

            const {statusCode,_body} = await requester.post('/api/create').send(fakeProduct)

            expect(statusCode).is.eqls(201)
            logger.info(statusCode)
            expect(_body.payload).is.ok.and.is.to.have.property('_id')
        })

        it('Crear producto sin titulo', async () => {
            const fakeProduct2 = {
                description: faker.lorem.sentences(2),
                code: faker.string.alphanumeric(8).toUpperCase(),
                price: faker.number.int({ min: 500, max: 5000 }),
                status: faker.datatype.boolean(),
                stock: faker.number.int({ min: 0, max: 100 }),
                category: faker.helpers.arrayElement([
                    "Acción",
                    "Comedia",
                    "Drama",
                    "Terror",
                    "Ciencia Ficción",
                    "Aventura",
                    "Animación",
                    "Suspenso"
                ]),
                thumbnails: faker.image.url()
            }

            const {statusCode} = await requester.post('/api/create').send(fakeProduct2)

            expect(statusCode).is.eqls(400)
            logger.info(statusCode)
        })
    })
})