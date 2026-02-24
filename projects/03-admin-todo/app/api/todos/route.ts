import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server'

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


export async function POST(request: Request) { 
    const body = await request.json()

    if (!body.description || typeof body.description !== 'string') {
        return NextResponse.json({ message: 'Description is required and must be a string' }, { status: 400 });
    }

    const todo = await prisma.todo.create({
        data: body
    })

    return new NextResponse(JSON.stringify({
        message: 'Todo created successfully',
        todo
    }), { status: 201 } );
}