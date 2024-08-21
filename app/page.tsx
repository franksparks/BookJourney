import ReadingList from "@/components/ReadingList";
import UserLists from "@/components/UserLists";

export default function Home() {
  return (
    <main className="flex justify-center p-8 flex-grow bg-sky-50 h-full">
      <div id="Container" className="w-5/6 flex flex-row justify-center gap-20">
        <div className="w-1/2">
          <ReadingList />
        </div>
        <div className="w-1/2">
          <UserLists />
        </div>
      </div>
    </main>
  );
}
