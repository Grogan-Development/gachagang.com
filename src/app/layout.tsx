import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MedusaCartProvider } from "@/context/MedusaCartContext";

export const metadata: Metadata = {
  title: "RetroVault | 80s & 90s Pop Culture Merch",
  description: "The ultimate destination for 80s and 90s anime & pop culture collectibles. Cowboy Bebop, Akira, Godzilla, Back to the Future and more!",
  keywords: ["retro", "80s", "90s", "cowboy bebop", "akira", "godzilla", "nostalgia", "collectibles", "merchandise", "anime", "vintage"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased min-h-screen flex flex-col font-sans">
        <MedusaCartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </MedusaCartProvider>
      </body>
    </html>
  );
}
