export const dynamic = 'force-dynamic';
export const revalidate = 0;

import prisma from "@/src/lib/prisma";
import { NewTodo } from "@/src/todos/components/Newtodo";
import { TodosGrid } from "@/src/todos/components/TodosGrid";
import { getUserSessionServer } from "../../auth/actions/auth-actions";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Rest Todos Page",
  description: "This is the Rest Todos Page",
};

export default async function PageTodosPage() {
  const user = await getUserSessionServer();

  if(!user) redirect("/api/auth/signin");

  const todos = await prisma.todo.findMany({
    where: { userId: user.id },
    orderBy: { description: "asc" },
  });

  return (
    <>
      <div className="w-full px-3 mx-5 mb-5">
        <NewTodo />
      </div>
      <TodosGrid todos={todos} />
    </>
  );
}