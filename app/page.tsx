import ReadingList from "@/components/ReadingList";
import UserLists from "@/components/UserLists";
import WantToRead from "@/components/WantToRead";

export default function Home() {
  return (
    <main className="flex justify-center p-8 flex-grow bg-sky-50 h-full">
      <div id="Container" className="w-5/6 flex flex-row justify-center gap-20">
        <div className="w-1/2">
          <ReadingList />
        </div>
        <div className="w-1/2 flex flex-col h-full gap-12">
          <UserLists />
          <WantToRead />
        </div>
      </div>
    </main>
  );
}
