import { getData } from "@/actions/todoActions";
import { getAllUsers } from "@/actions/userActions";
import Todos from "@/components/Todos";

export default async function Home() {
  const data = await getData();
  const users = await getAllUsers();
  console.log(users);
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <h1 className="text-4xl font-bold">To-Do App</h1>
      <Todos todos={data} user={users} />
    </div>
  );
}
