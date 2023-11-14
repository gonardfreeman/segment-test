import { faker } from "@faker-js/faker";
import type { Person } from "@/typings";

export function createRandomPerson(): Person {
  return {
    name: faker.person.fullName(),
    email: faker.internet.email(),
  };
}
