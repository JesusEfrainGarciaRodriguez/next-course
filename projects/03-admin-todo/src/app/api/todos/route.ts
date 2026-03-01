import prisma from '@/src/lib/prisma';
import { NextRequest, NextResponse } from 'next/server'
import * as yup from 'yup'

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const take = Number(searchParams.get('take') ?? '10')
    const skip = Number(searchParams.get('skip') ?? '0')

    if (isNaN(take)) {
        return NextResponse.json({ message: 'Invalid take parameter' }, { status: 400 });
    }

    if (isNaN(skip)) {
        return NextResponse.json({ message: 'Invalid skip parameter' }, { status: 400 });
    }

    try {
        const todos = await prisma.todo.findMany({
            skip,
            take,
        });
        return NextResponse.json({ todos }, { status: 200 });
    } catch (error) {
        console.error('Error fetching todos:', error);
        return NextResponse.json({ error: 'Failed to fetch todos' }, { status: 500 });
    }
}

const postSchema = yup.object({
    description: yup.string().required('Description is required'),
    completed: yup.boolean().optional().default(false),
})

export async function POST(request: Request) { 
    try {
        const { description, completed } = await postSchema.validate(await request.json(), { abortEarly: false })

        const todo = await prisma.todo.create({
            data: { description, completed }
        })

        return new NextResponse(JSON.stringify({
            message: 'Todo created successfully',
            todo
        }), { status: 201 } );
    } catch (error) {
        if (error instanceof yup.ValidationError) {
            return NextResponse.json({ errors: error.errors }, { status: 400 });
        }
        console.error('Error validating request body:', error);
        return NextResponse.json({ error: 'Failed to validate request body' }, { status: 500 });
    }
}