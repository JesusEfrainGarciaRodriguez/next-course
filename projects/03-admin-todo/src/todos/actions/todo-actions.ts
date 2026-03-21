'use server';

import prisma from "@/src/lib/prisma";
import { Todo } from "@/src/generated/prisma/client";
import { revalidatePath } from "next/cache";
import { getUserSessionServer } from "@/src/app/auth/actions/auth-actions";

export const sleep = async (seconds: number = 0) => new Promise(resolve => setTimeout(resolve, seconds * 1000));

export const toggleTodo = async (id: string, complete: boolean): Promise<Todo> => {
    try {
        await sleep(3);
        const user = await getUserSessionServer();
        
        if(!user) throw new Error("User not found");

        const todo = await prisma.todo.findFirst({ where: { id, userId: user?.id} });
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
        const user = await getUserSessionServer();
        
        if(!user) throw new Error("User not found");

        const newTodo = await prisma.todo.create({
            data: { description, userId: user?.id },
        });
        revalidatePath("/dashboard/server-todos");
        return newTodo;
    } catch (error) {
        console.error("Error adding todo:", error);
        throw error;
    }
}

export const deleteCompleted = async (): Promise<void> => {
    try {
        const user = await getUserSessionServer();
        
        if(!user) throw new Error("User not found");

        await prisma.todo.deleteMany({ where: { completed: true, userId: user?.id} });
        revalidatePath("/dashboard/server-todos");
    } catch (error) {
        console.error("Error deleting completed todos:", error);
        throw error;
    }
}
