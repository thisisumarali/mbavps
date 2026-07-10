import { NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

export async function PATCH(request, { params }) {
  try {
    const body = await request.json();

    await prisma.advocate.updateMany({
      where: {
        v_no: Number(params.v_no),
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
    await prisma.advocate.deleteMany({
      where: {
        v_no: Number(params.v_no),
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
