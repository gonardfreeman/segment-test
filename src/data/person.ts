import { faker } from "@faker-js/faker";

export function createRandomPerson(): Person {
  return {
    name: faker.person.fullName(),
    email: faker.internet.email(),
  };
}
