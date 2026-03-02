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

export const createTodo = async (description: string): Promise<Todo> => {
  const response = await fetch(`/api/todos`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ description }),
  })
    if (!response.ok) {
        throw new Error('Failed to create todo')
    }
    return response.json()
}

export const deleteCompleted = async (): Promise<void> => {
  const response = await fetch(`/api/todos`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  if (!response.ok) {
      throw new Error('Failed to delete completed todos')
  }
  return response.json()
}