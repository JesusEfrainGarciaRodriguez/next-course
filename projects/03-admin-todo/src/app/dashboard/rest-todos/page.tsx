import prisma from "@/src/lib/prisma";
import { TodosGrid } from "@/src/todos/components/TodosGrid";

export const metadata = {
  title: "Rest Todos Page",
  description: "This is the Rest Todos Page",
};

export default async function PageTodosPage() {
  const todos = await prisma.todo.findMany({ orderBy: { description: "asc" } });

  return (
    <>
      <TodosGrid todos={todos} />
    </>
  );
}