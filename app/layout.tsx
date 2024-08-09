import { DbUserProvider } from "@/app/context/DbUserContext";
import Footer from "@/components/Footer";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import UserLists from "@/components/UserLists";

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
          <body className=" h-screen flex flex-col bg-neutral-100">
            <Header />
            <main className={`flex-1 ${inter.className}`}>{children}</main>
            <Footer />
          </body>
        </html>
      </DbUserProvider>
    </ClerkProvider>
  );
}
