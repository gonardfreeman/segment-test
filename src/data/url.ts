import { faker } from "@faker-js/faker";

export function createURL() {
  return faker.internet.url();
}
