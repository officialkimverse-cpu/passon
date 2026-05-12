import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PassOn — Sell and furnish your rental without pickup runs.",
  description:
    "PassOn is the renter marketplace for move-out and move-in. Sellers list from photos; buyers shop the last tenant's place—items stay in the unit for the next resident.",
  icons: {
    icon: "/passon-logo.svg",
    apple: "/passon-logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
          <CartProvider>{children}</CartProvider>
        </body>
    </html>
  );
}
