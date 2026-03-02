import { Todo } from "@/src/app/generated/prisma/client";
import styles from "./TodoItem.module.css";
import { IoCheckboxOutline, IoSquareOutline } from "react-icons/io5";

interface TodosItemProps {
  todo: Todo;
  toggleTodo: (id: string, complete: boolean) => Promise<Todo | void>;
}
export const TodosItem = ({ todo, toggleTodo }: TodosItemProps) => {
  return (
    <div className={todo.completed ? styles.todoDone : styles.todoPending}>
      <div className="flex flex-col sm:flex-row justify-start items-center gap-4">
        <div
          className={`flex p-2 rounded-md cursor-pointer hover:bg-opacity-60 bg-blue-100 ${todo.completed ? "bg-blue-100" : "bg-red-100"}`}
          onClick={() => toggleTodo(todo.id, !todo.completed)}
        >
          {todo.completed ? (
            <IoCheckboxOutline size={30} className="text-blue-500" />
          ) : (
            <IoSquareOutline size={30} className="text-gray-400" />
          )}
        </div>

        <div className="text-center sm:text-left">{todo.description}</div>
      </div>
    </div>
  );
};
