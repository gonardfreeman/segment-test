export type CARS_SOLD_PER_MONTH_TYPE =
  | "10 or less"
  | "11 - 25"
  | "26 - 50"
  | "50+";
export type BUSINESS_TYPE_TYPE =
  | "New Car"
  | "Used Car"
  | "Used Car Superstore"
  | "Buy Here Pay Here"
  | "Wholesaler"
  | "Online Retailer"
  | "Other";

export type BusinessTypeA = Array<BUSINESS_TYPE_TYPE>;
export type CarsSoldPerMonthA = Array<CARS_SOLD_PER_MONTH_TYPE>;
export type BusinessTypeOrCarsSoldPerMonthA = BusinessTypeA | CarsSoldPerMonthA;
export type BusinessTypeOrCarsSoldPerMonth =
  | BUSINESS_TYPE_TYPE
  | CARS_SOLD_PER_MONTH_TYPE;
