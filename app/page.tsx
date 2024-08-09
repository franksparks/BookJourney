import UserLists from "@/components/UserLists";

export default function Home() {
  return (
    <main>
      <div className="h-full bg-sky-50 flex justify-center m-10">
        <UserLists />
      </div>
    </main>
  );
}
