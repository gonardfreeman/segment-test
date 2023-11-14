import { faker } from "@faker-js/faker";

import type { Address } from "@/typings";

import { ZIP_CODE_FORMAT } from "@/constants";

export function createRandomAddress(): Address {
  const state = faker.location.state({
    abbreviated: true,
  });
  const zip_code = faker.location.zipCode(ZIP_CODE_FORMAT);

  return {
    zip_code,
    address: [
      faker.location.streetAddress(),
      faker.location.city(),
      `${state} ${zip_code}`,
    ].join(", "),
  };
}
