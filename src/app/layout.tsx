import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import ScannerButton from "@/components/buttons/scanner-button";

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Planeswalker's Archive",
  description: "The archive for all your spells and enchantments.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full m-0">
      <body
        className={`${poppins.variable} antialiased flex flex-col h-screen`}
      >
        <Header></Header>
        <div className="relative flex grow size-full">
          {children}
          <ScannerButton></ScannerButton>
        </div>
        <Footer></Footer>
      </body>
    </html>
  );
}
