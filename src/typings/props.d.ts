import type { ReactNode } from "react";
import type { InputConfig } from "./fieldConfig";

export interface InputProps {
  readonly label: string;
  readonly value: string;
  readonly name: string;
  readonly onChange: (newValue: string) => void;
}

export interface MainComponentProps {
  readonly inputs: InputConfig[];
}

export interface LayoutProps {
  readonly children: ReactNode;
}
