import { DbUserProvider } from "@/app/context/DbUserContext";
import Footer from "@/components/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
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
      <DbUserProvider>
      <BooksSearchProvider>
        <html lang="en">
          <body className="flex flex-col bg-neutral-100">
            <Header />
            <body className={inter.className}>{children}</body>
          </body>
        </html>
      </BooksSearchProvider>
      </DbUserProvider>
    </ClerkProvider>
  );
}
