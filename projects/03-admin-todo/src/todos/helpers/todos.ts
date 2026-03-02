import { Todo } from "@/src/app/generated/prisma/client"

export const updateTodo = async (id: string, complete: boolean): Promise<Todo> => {
  const response = await fetch(`/api/todos/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ completed: complete }),
  })
    if (!response.ok) {
        throw new Error('Failed to update todo')
    }
    return response.json()
}