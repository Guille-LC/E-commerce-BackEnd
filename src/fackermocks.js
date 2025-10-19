import { faker } from "@faker-js/faker";
import bcrypt from 'bcrypt'

faker.locale = 'es';

export const generateMockUser = () => {
    return {
        name: faker.person.fullName(),
        age: faker.number.int({ min: 18, max: 80 }),
        email: faker.internet.email(),
        pets: [],
        role: faker.helpers.arrayElement(["user", "admin"]),
        password: bcrypt.hashSync("coder123",10),
        id: faker.database.mongodbObjectId()
    }
}

export const generateMockPet = () => {
    return {
        name: faker.animal.petName(),
        specie: faker.animal.type()
    }
}