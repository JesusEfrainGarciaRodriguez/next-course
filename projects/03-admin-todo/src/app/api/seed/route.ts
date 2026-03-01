import { NextResponse } from "next/server";
import prisma from "@/src/lib/prisma";

export async function GET() {
    await prisma.todo.createMany({
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
    });

    return NextResponse.json({
        message: "Seeded successfully",
    });
}
