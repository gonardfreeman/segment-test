import { BUSINESS_TYPE, CARS_SOLD_PER_MONTH } from "@/constants";

import type { BUSINESS_TYPE_TYPE, CARS_SOLD_PER_MONTH_TYPE } from "@/typings";

function getRandomItemFromArray<T>(array: Array<T>): T | null {
  if (array.length === 0) {
    return null;
  }

  const randomIndex = Math.floor(Math.random() * array.length);

  return array[randomIndex];
}

export function getRandomBusinessType(): BUSINESS_TYPE_TYPE {
  return getRandomItemFromArray(BUSINESS_TYPE) ?? "Buy Here Pay Here";
}

export function getRandomCarsSold(): CARS_SOLD_PER_MONTH_TYPE {
  return getRandomItemFromArray(CARS_SOLD_PER_MONTH) ?? "10 or less";
}
