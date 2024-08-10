import UserLists from "@/components/UserLists";

export default function Home() {
  return (
    <main className="flex justify-center items-center flex-grow bg-sky-50 h-full">
      <div id="Container" className="w-2/3 flex flex-row justify-center">
        <UserLists />
      </div>
    </main>
  );
}
