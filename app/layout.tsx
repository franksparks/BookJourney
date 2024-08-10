import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import { BooksSearchProvider } from "./context/books-search-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BookJourney",
  description: "Your books always with you",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <BooksSearchProvider>
        <html lang="en">
          <body className="flex flex-col bg-neutral-100">
            <Header />
            <body className={inter.className}>{children}</body>
          </body>
        </html>
      </BooksSearchProvider>
    </ClerkProvider>
  );
}
