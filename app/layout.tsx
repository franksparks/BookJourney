import { DbUserProvider } from "@/app/context/DbUserContext";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
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
          <body className="flex flex-col bg-neutral-100">
            <Header />
            <main className={inter.className}>{children}</main>
            <UserLists />
            <Footer />
          </body>
        </html>
      </DbUserProvider>
    </ClerkProvider>
  );
}
