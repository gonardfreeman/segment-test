import type { Address } from "./track";
export interface InputConfig {
  readonly key: string;
  readonly label: string;
  readonly name: string;
  readonly handleGenerate: () => string | Address;
}
