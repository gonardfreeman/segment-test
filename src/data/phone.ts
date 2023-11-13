import { faker } from "@faker-js/faker";

import { PHONE_FORMAT } from "@/constants";

export function createPhone() {
  return faker.helpers.replaceSymbolWithNumber(PHONE_FORMAT);
}
