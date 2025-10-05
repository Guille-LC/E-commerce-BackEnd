import { faker } from "@faker-js/faker";

faker.locale = 'es';

export const generateMockUser = () => {
    return {
        name: faker.person.fullName(),
        age: faker.number.int({ min: 18, max: 80 }),
        email: faker.internet.email(),
        role: faker.helpers.arrayElement(["user", "admin"]),
        id: faker.database.mongodbObjectId()
    }
}