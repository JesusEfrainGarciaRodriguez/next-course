import { getUserSessionServer } from '@/src/app/auth/actions/auth-actions'
import { Todo } from '@/src/generated/prisma/client'
import prisma from '@/src/lib/prisma'
import { NextResponse } from 'next/server'
import * as yup from 'yup'

interface RouteParams {
    id: string
}

const getTodo = async( id: string ):Promise<Todo | null> => {

  const user = await getUserSessionServer();

  if ( !user ) {
    return null;
  }

  const todo = await prisma.todo.findFirst({ where: { id } });

  if ( todo?.userId !== user.id ) {
    return null;
  }

  return todo;
}


export async function GET(
    request: Request,
    { params }: { params: Promise<RouteParams> }
) {
    const { id } = await params

    const todo = await getTodo(id);

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
    const existingTodo = await getTodo(id);
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