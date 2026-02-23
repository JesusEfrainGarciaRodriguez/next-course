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