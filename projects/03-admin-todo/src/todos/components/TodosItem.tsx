import { Todo } from "@/src/app/generated/prisma/client";
import styles from "./TodoItem.module.css";
import { IoCheckboxOutline, IoSquareOutline } from "react-icons/io5";
import { startTransition, useOptimistic } from "react";
import { start } from "repl";

interface TodosItemProps {
  todo: Todo;
  toggleTodo: (id: string, complete: boolean) => Promise<Todo | void>;
}
export const TodosItem = ({ todo, toggleTodo }: TodosItemProps) => {
  const [todoOptimistic, toggleTodoOptimistic] = useOptimistic(
    todo, 
    (state, newCompleteValue: boolean) => ({ ...state, completed: newCompleteValue })
  );
  
  const handleToggle = async () => {
    try {
      startTransition(() => toggleTodoOptimistic(!todoOptimistic.completed))

      await toggleTodo(todoOptimistic.id, !todoOptimistic.completed);
    } catch (error) {
      console.error("Error toggling todo:", error);
      startTransition(() => toggleTodoOptimistic(!todoOptimistic.completed))
    }
  }

  return (
    <div className={todoOptimistic.completed ? styles.todoDone : styles.todoPending}>
      <div className="flex flex-col sm:flex-row justify-start items-center gap-4">
        <div
          className={`flex p-2 rounded-md cursor-pointer hover:bg-opacity-60 bg-blue-100 ${todoOptimistic.completed ? "bg-blue-100" : "bg-red-100"}`}
          onClick={() => handleToggle()}
        >
          {todoOptimistic.completed ? (
            <IoCheckboxOutline size={30} className="text-blue-500" />
          ) : (
            <IoSquareOutline size={30} className="text-gray-400" />
          )}
        </div>

        <div className="text-center sm:text-left">{todoOptimistic.description}</div>
      </div>
    </div>
  );
};
