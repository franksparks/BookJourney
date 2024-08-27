import ReadingList from "@/components/ReadingList";
import ListsCard from "@/components/lists/ListsCard";
export default function Home() {
  return (
    <main className="flex justify-center p-8 flex-grow bg-sky-50 h-full">
      <div id="Container" className="w-5/6 flex flex-row justify-center gap-20">
        <div className="w-1/2">
          <ReadingList />
        </div>
        <div className="w-1/2">
          <ListsCard />
        </div>
      </div>
    </main>
  );
}
