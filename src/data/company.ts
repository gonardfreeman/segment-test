import { faker } from "@faker-js/faker";

export function createCompanyName() {
  return faker.company.name();
}
