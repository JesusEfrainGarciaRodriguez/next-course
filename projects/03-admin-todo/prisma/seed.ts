import { PrismaClient, Prisma } from "../src/app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
  adapter,
});

const todoData: Prisma.TodoCreateInput[] = [
  {
    id: "1",
    description: "Buy groceries",
    completed: false,
  },
  {
    id: "2",
    description: "Walk the dog",
    completed: true,
}
];

export async function main() {
  for (const u of todoData) {
    await prisma.todo.create({ data: u });
  }
}

main();