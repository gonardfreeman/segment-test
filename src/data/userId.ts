import { faker } from "@faker-js/faker";

import { USER_ID_FORMAT } from "@/constants";

export function createRandomUserId() {
  return faker.helpers.replaceSymbolWithNumber(USER_ID_FORMAT);
}
