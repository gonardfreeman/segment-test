import type { BusinessTypeA, CarsSoldPerMonthA } from "./typings";
export const BUTTON_CLASS =
  "bg-blue-500 text-white border border-blue-500 py-2 px-4 rounded hover:bg-blue-600 hover:border-blue-600";

export const DEFAULT_EVENT_NAME = "Signup request";

export const PHONE_FORMAT = "###-###-####";
export const ZIP_CODE_FORMAT = "#####";
export const USER_ID_FORMAT = ZIP_CODE_FORMAT;

export const CARS_SOLD_PER_MONTH: CarsSoldPerMonthA = [
  "10 or less",
  "11 - 25",
  "26 - 50",
  "50+",
];

export const BUSINESS_TYPE: BusinessTypeA = [
  "New Car",
  "Used Car",
  "Used Car Superstore",
  "Buy Here Pay Here",
  "Wholesaler",
  "Online Retailer",
  "Other",
];
