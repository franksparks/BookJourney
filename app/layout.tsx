import { DbUserProvider } from "@/app/context/DbUserContext";
import Footer from "@/components/Footer";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

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
        <html lang="en">
          <body className=" h-screen flex flex-col bg-neutral-300">
            <Header />
            <main className="flex-grow">{children}</main>
            <Footer />
          </body>
        </html>
      </DbUserProvider>
    </ClerkProvider>
  );
}
