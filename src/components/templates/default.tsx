import React, { ReactElement } from "react";
import Navbar from "../molecules/Navbar";

const DefaultLayout = ({ children }: { children: ReactElement }) => {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
};

export default DefaultLayout;
