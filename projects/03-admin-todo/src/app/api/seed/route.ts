import { NextResponse } from "next/server";
import prisma from "@/src/lib/prisma";
import bcrypt from "bcryptjs";

export async function GET() {

    await prisma.todo.deleteMany(); // delete * from todo
    await prisma.user.deleteMany(); // delete * from todo

    await prisma.user.create({
        data: {
        email: 'test1@google.com',
        password: bcrypt.hashSync('123456'),
        roles: ['admin','client','super-user'],
        todos: {
            create: [
            { description: 'Piedra del alma', completed: true },
            { description: 'Piedra del poder' },
            { description: 'Piedra del tiempo' },
            { description: 'Piedra del espacio' },
            { description: 'Piedra del realidad' },
            ]
        }
        }
    });

    /* await prisma.todo.createMany({
        data: [
            {
                description:"Default description",
                completed: false,
            },
            {
                description: "Another default description",
                completed: true,
            },
            {
                description: "Yet another default description",
            },
            {
                description: "One more default description",
            }
        ]
    }); */

    return NextResponse.json({
        message: "Seeded successfully",
    });
}
