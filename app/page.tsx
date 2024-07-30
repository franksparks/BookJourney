import {
  actionClerkUser,
  actionCreateUser,
  actionGetOneUser,
  actionGetUsers,
} from "@/actions/users";
import { Header } from "@/components/header";

import { User } from "@/lib/users";

export default async function Home() {
  const userId = "66a215369b094441662c0322";
  const clerkId = "LUIS";
  const newClerkId = "newClerkId";

  let users: User[] = await actionGetUsers();
  let userById: User | null = await actionGetOneUser(userId);
  let userByClerkId: User | null = await actionClerkUser(clerkId);

  let newUser: User | null = await actionCreateUser(newClerkId);

  return (
    <>
      <main>
        <Header />
        <div className="h-screen bg-sky-50 flex items-center justify-center">
          <h1 className="text-4xl text-slate-500">Welcome to BookJourney</h1>
        </div>
      </main>
      <h1>My users</h1>
      <div className="flex flex-wrap p-5 justify-around">
        {users.map((user) => (
          <div key={user.id} className="user-card">
            <p>{user.id}</p>
            <p>{user.clerkId}</p>
            <p>{user.email}</p>
          </div>
        ))}
      </div>
      <h1>User by Id</h1>
      {userById ? (
        <div className="flex flex-wrap p-5 justify-around">
          <div key={userById.id} className="user-card">
            <p>{userById.id}</p>
            <p>{userById.clerkId}</p>
            <p>{userById.email}</p>
          </div>
        </div>
      ) : (
        <h1>userId not found</h1>
      )}
      <h1>User by clerkId</h1>
      {userByClerkId ? (
        <div className="flex flex-wrap p-5 justify-around">
          <div key={userByClerkId.id} className="user-card">
            <p>{userByClerkId.id}</p>
            <p>{userByClerkId.clerkId}</p>
            <p>{userByClerkId.email}</p>
          </div>
        </div>
      ) : (
        <h1>userClerkId not found</h1>
      )}
      <h1>New User</h1>
      {newUser ? (
        <div className="flex flex-wrap p-5 justify-around">
          <div key={newUser.id} className="user-card">
            <p>{newUser.id}</p>
            <p>{newUser.clerkId}</p>
            <p>{newUser.email}</p>
          </div>
        </div>
      ) : (
        <h1>newUser not found</h1>
      )}
    </>
  );
}
