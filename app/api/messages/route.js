import { NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

export async function GET() {
  try {
    const messages = await prisma.message.findMany({
      orderBy: {
        created_at: "desc",
      },
    });

    return NextResponse.json({
      success: true,
      messages,
    });
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        message: err.message,
      },
      {
        status: 500,
      },
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();

    const last = await prisma.message.findFirst({
      orderBy: {
        id: "desc",
      },
    });

    const message = await prisma.message.create({
      data: {
        id: (last?.id || 0) + 1,
        name: body.name,
        phone: body.phone || null,
        email: body.email,
        subject: body.subject,
        message: body.message,
        created_at: new Date(),
        is_read: false,
      },
    });

    return NextResponse.json({
      success: true,
      message,
    });
  } catch (err) {
    return NextResponse.json(
      {
        success: false,
        message: err.message,
      },
      {
        status: 500,
      },
    );
  }
}
