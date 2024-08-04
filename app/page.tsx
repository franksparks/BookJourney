import Header from "@/components/header";

export default async function Home() {
  return (
    <main>
      <Header />
      <div className="h-screen bg-sky-50 flex items-center justify-center">
        <h1 className="text-4xl text-slate-500">Welcome to BookJourney</h1>
      </div>
    </main>
  );
}
