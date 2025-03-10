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
      <Header></Header>
      <div className="relative flex grow size-full p-4">
        {children}
        <ScannerButton></ScannerButton>
      </div>
      <Footer></Footer>
    </>
  );
}
