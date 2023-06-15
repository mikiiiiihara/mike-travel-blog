import React, { ReactElement } from "react";
import { Header } from "../header";

type Props = {
  children: ReactElement;
};

const LayoutComponent: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

LayoutComponent.displayName = "Layout";
export const Layout = React.memo(LayoutComponent);
