import { DbUserProvider } from "@/app/context/db-user-context";
import Footer from "@/components/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { BooksSearchProvider } from "./context/books-search-context";
import Header from "@/components/header";
import { Toaster } from "@/components/ui/toaster";

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
            <body className=" h-screen flex flex-col bg-neutral-300 overflow-y-hidden">
              <Header />
              {/* the total height os 100% minus the header and footer */}
              <main style={{ height: 'calc(100% - 130px)'}}>{children}</main>
              <Toaster />
              <Footer />
            </body>
          </html>
        </BooksSearchProvider>
      </DbUserProvider>
    </ClerkProvider>
  );
}
