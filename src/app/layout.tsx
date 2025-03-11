import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Head from "next/head";

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
    <html lang="en" className="m-0">
      <Head>
        <link rel="manifest" href="/manifest.json" />
      </Head>
      <body
        className={`${poppins.variable} antialiased flex flex-col max-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
