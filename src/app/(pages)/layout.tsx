import ScannerButton from "@/components/buttons/scanner-button";
import Footer from "@/components/footer/footer";
import Header from "@/components/header/header";
import React from "react";

export default function PagesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div>
        <Header></Header>
      </div>
      <div className="relative flex grow size-full p-4">
        {children}
        <div className="lg:hidden">
          <ScannerButton></ScannerButton>
        </div>
      </div>
      <div className="lg:hidden">
        <Footer></Footer>
      </div>
    </>
  );
}
