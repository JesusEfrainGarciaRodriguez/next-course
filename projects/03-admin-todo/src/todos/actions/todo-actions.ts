'use server';

import prisma from "@/src/lib/prisma";
import { Todo } from "@/src/app/generated/prisma/client";
import { revalidatePath } from "next/cache";

export const toggleTodo = async (id: string, complete: boolean): Promise<Todo> => {
    try {
        const todo = await prisma.todo.findFirst({ where: { id } });
        if (!todo) {
            throw new Error("Todo not found");
        }
        const updateTodo = await prisma.todo.update({
            where: { id },
            data: { completed: complete },
        });

        revalidatePath("/dashboard/server-todos");
        return updateTodo;
    } catch (error) {
        console.error("Error toggling todo:", error);
        throw error;
    }
}

export const addTodo = async (description: string): Promise<Todo> => {
    try {
        const newTodo = await prisma.todo.create({
            data: { description },
        });
        revalidatePath("/dashboard/server-todos");
        return newTodo;
    } catch (error) {
        console.error("Error adding todo:", error);
        throw error;
    }
}
