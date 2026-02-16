import type { Metadata } from "next";
import "./globals.css";
import { MedusaCartProvider } from "@/context/MedusaCartContext";

export const metadata: Metadata = {
  title: "GachaGang | 80s & 90s Anime & Pop Culture Merch",
  description: "The ultimate destination for 80s and 90s anime & pop culture collectibles. Cowboy Bebop, Akira, Godzilla, Back to the Future and more!",
  keywords: ["retro", "80s", "90s", "cowboy bebop", "akira", "godzilla", "nostalgia", "collectibles", "merchandise", "anime", "vintage", "gachagang"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <MedusaCartProvider>
      <html lang="en">
        <body className="antialiased min-h-screen bg-background text-foreground">
          {children}
        </body>
      </html>
    </MedusaCartProvider>
  );
}
