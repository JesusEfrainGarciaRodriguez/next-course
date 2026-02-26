import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'
import * as yup from 'yup'

interface RouteParams {
    id: string
}

export async function GET(
    request: Request,
    { params }: { params: Promise<RouteParams> }
) {
    const { id } = await params

    const todo = await prisma.todo
        .findUnique({
            where: { id },
        })

    if (!todo) {
        return NextResponse.json({ message: `Todo ${id} not found` }, { status: 404 })
    }
    return NextResponse.json({ todo }, { status: 200 })
}

const putSchema = yup.object({
    description: yup.string().optional(),
    completed: yup.boolean().optional(),
})
export async function PUT(
    request: Request,
    { params }: { params: Promise<RouteParams> }
) {
    const { id } = await params
    const existingTodo = await prisma.todo.findUnique({ where: { id } })
    if (!existingTodo) {
        return NextResponse.json({ message: `Todo ${id} not found` }, { status: 404 })
    }

    try {
        const { description, completed } = await putSchema.validate(await request.json(), { abortEarly: false })

        const updatedTodo = await prisma.todo
            .update({
                where: { id },
                data: {
                    description,
                    completed,
                },
            })
        return NextResponse.json({ updatedTodo }, { status: 200 })
    } catch (error) {
        if (error instanceof yup.ValidationError) {
            return NextResponse.json({ errors: error.errors }, { status: 400 });
        }
        console.error('Error validating request body:', error);
        return NextResponse.json({ error: 'Failed to validate request body' }, { status: 500 });
    }
    
}