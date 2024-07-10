import React from "react";
import Header from "../components/header/header";
import MobileBar from "../components/mobile-bar/mobilebar";

type RootLayoutProps = {
  children: React.ReactNode;
};

const RootLayout = ({ children }: RootLayoutProps) => {
  return (
    <div>
      <Header />
      {children}
      <MobileBar />
    </div>
  );
};

export default RootLayout;
