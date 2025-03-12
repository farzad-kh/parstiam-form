import { NextRequest, NextResponse } from "next/server";
import { formValidationServerSchemas } from "@/app/zodvalidation/validationSchemas";
import prisma from "@/prisma/client";
import { Inputs } from "@/app/page";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const validation = formValidationServerSchemas.safeParse(body);
    if (!validation.success)
      return NextResponse.json(validation.error.format(), { status: 400 });
    const users = body;

    await prisma.user.createMany({
      data: users.map((user: Inputs) => ({
        name: user?.name ?? null,
        lastName: user?.lastName ?? null,
        age: Number(user.age),
      })),
    });

    return NextResponse.json("succsess", { status: 201 });
  } catch (err) {
    console.log(err);
  }
}
export async function GET(req: NextRequest) {
  try {
    const users = await prisma.user.findMany();
console.log(users);

    return NextResponse.json(users, { status: 200 });
  } catch (err) {
    console.log(err);
  }
}
