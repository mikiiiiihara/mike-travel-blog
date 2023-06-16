import React, { ReactElement } from "react";
import { Header } from "../header";
import { Footer } from "../footer";

type Props = {
  children: ReactElement;
};

const LayoutComponent: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

LayoutComponent.displayName = "Layout";
export const Layout = React.memo(LayoutComponent);
