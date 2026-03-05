'use client'
import { Todo } from "@/src/app/generated/prisma/client"
import { TodosItem } from "./TodosItem"
import * as todosApi from "../helpers/todos"
import { useRouter } from "next/navigation"
import { toggleTodo } from "../actions/todo-actions"

interface TodosGridProps {
  todos?: Todo[]
}
export const TodosGrid = ({ todos = [] }: TodosGridProps) => {
  const router = useRouter()

  /* const toggleTodo = async (id: string, complete: boolean) => {
    try {
      await todosApi.updateTodo(id, complete)
      router.refresh()
    } catch (error) {
      console.error("Error updating todo:", error)
    }
  } */

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
      {todos.map((todo) => (
        <TodosItem key={todo.id} todo={todo} /* toggleTodo={toggleTodo} */ toggleTodo={toggleTodo} />
      ))}
    </div>
  )
}
