import Header from "./header";
import { LayoutProps } from "@/typings";

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}
