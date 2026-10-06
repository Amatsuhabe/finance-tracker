import getSession from "@/lib/auth/get-session";
import { prisma } from "@/lib/prisma";
import { categorySchema } from "@/lib/schemas/add-category";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getSession();

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const categories = await prisma.category.findMany({
    where: { userId: session.user.id },
    select: {
      id: true,
      name: true,
      color: true,
      icon: true,
      type: true,
    },
  });

  return NextResponse.json(categories);
}

export async function POST(req: Request) {
  const session = await getSession();

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ message: "Invalid JSON body" }, { status: 400 });
  }

  const result = categorySchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { message: "Invalid category data", details: result.error.flatten() },
      { status: 400 }
    );
  }

  const category = await prisma.category.create({
    data: {
      ...result.data,
      userId: session.user.id,
    },
  });

  return NextResponse.json(category, { status: 201 });
}
