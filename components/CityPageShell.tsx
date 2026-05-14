import type { ReactNode } from "react";
import { Footer } from "./Footer";
import { Header } from "./Header";

/** Standard chrome for all `/[city]/*` pages (header + footer + optional sticky bar). */
export function CityPageShell({
  children,
  stickyBar,
}: {
  children: ReactNode;
  stickyBar?: ReactNode;
}) {
  return (
    <>
      <Header />
      {children}
      <Footer />
      {stickyBar}
    </>
  );
}
