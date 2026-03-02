'use client'
import { Todo } from "@/src/app/generated/prisma/client"
import { TodosItem } from "./TodosItem"

interface TodosGridProps {
  todos?: Todo[]
}
export const TodosGrid = ({ todos = [] }: TodosGridProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
      {todos.map((todo) => (
        <TodosItem key={todo.id} todo={todo} />
      ))}
    </div>
  )
}
