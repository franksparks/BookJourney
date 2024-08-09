import UserLists from "@/components/UserLists";

export default function Home() {
  return (
    <main className="flex justify-center items-center flex-grow bg-sky-50 h-full">
      <div id="Container" className="w-2/3 flex flex-row justify-between">
        <div className="w-1/2 flex justify-center items-center bg-white h-full">
          <UserLists />
        </div>
        <div className="w-1/2 flex justify-center items-center bg-white h-full">
          <UserLists />
        </div>
      </div>
    </main>
  );
}
