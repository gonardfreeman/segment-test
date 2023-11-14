import Header from "./header";
import { LayoutProps } from "@/typings/data";

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}
