import getSession from "@/lib/auth/get-session";
import { prisma } from "@/lib/prisma";
import { categorySchema } from "@/lib/schemas/add-category";
import { Prisma } from "@/generated/prisma/client";
import { NextResponse } from "next/server";

type CategoryRouteContext = {
  params: Promise<{ id: string }>;
};

export async function PUT(req: Request, { params }: CategoryRouteContext) {
  const { id } = await params;
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

  const existingCategory = await prisma.category.findFirst({
    where: {
      id,
      userId: session.user.id,
    },
    select: { id: true },
  });

  if (!existingCategory) {
    return NextResponse.json({ message: "Category not found" }, { status: 404 });
  }

  const category = await prisma.category.update({
    where: {
      id,
      userId: session.user.id,
    },
    data: result.data,
  });

  return NextResponse.json(category);
}

export async function DELETE(_req: Request, { params }: CategoryRouteContext) {
  const { id } = await params;
  const session = await getSession();

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const existingCategory = await prisma.category.findFirst({
    where: {
      id,
      userId: session.user.id,
    },
    select: { id: true },
  });

  if (!existingCategory) {
    return NextResponse.json({ message: "Category not found" }, { status: 404 });
  }

  try {
    await prisma.category.delete({
      where: {
        id,
        userId: session.user.id,
      },
    });
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2003"
    ) {
      return NextResponse.json(
        { message: "Cannot delete a category that has transactions" },
        { status: 409 }
      );
    }

    throw error;
  }

  return NextResponse.json({ success: true });
}
