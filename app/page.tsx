import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <Header />
      <div className="h-screen bg-sky-50 flex items-center justify-center">
        <h1 className="text-4xl text-slate-500">Welcome to BookJourney</h1>
      </div>
    </main>
  );
}
