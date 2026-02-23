import prisma from '@/lib/prisma'
import { NextResponse } from 'next/server'

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