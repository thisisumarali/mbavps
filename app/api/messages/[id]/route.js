import { NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

export async function PATCH(request, { params }) {
  try {
    const body = await request.json();

    await prisma.message.update({
      where: {
        id: Number(params.id),
      },
      data: body,
    });

    return NextResponse.json({
      success: true,
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

export async function DELETE(request, { params }) {
  try {
    await prisma.message.delete({
      where: {
        id: Number(params.id),
      },
    });

    return NextResponse.json({
      success: true,
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
