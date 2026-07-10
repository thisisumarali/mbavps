import { NextResponse } from "next/server";
import { prisma } from "@/utils/prisma";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);

    const page = Number(searchParams.get("page") || 1);
    const pageSize = Number(searchParams.get("pageSize") || 20);

    const v_no = searchParams.get("v_no");
    const name = searchParams.get("name");
    const f_name = searchParams.get("f_name");

    const where = {};

    if (v_no) {
      where.v_no = Number(v_no);
    } else if (name) {
      where.name = {
        contains: name,
        mode: "insensitive",
      };
    } else if (f_name) {
      where.f_name = {
        contains: f_name,
        mode: "insensitive",
      };
    }

    const [advocates, total] = await Promise.all([
      prisma.advocate.findMany({
        where,
        orderBy: {
          id: "asc",
        },
        skip: (page - 1) * pageSize,
        take: pageSize,
      }),

      prisma.advocate.count({
        where,
      }),
    ]);

    return NextResponse.json({
      success: true,
      advocates,
      total,
    });
  } catch (err) {
    console.error(err);

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

    const last = await prisma.advocate.findFirst({
      orderBy: {
        id: "desc",
      },
    });

    const advocate = await prisma.advocate.create({
      data: {
        id: (last?.id || 0) + 1,
        v_no: Number(body.v_no),
        name: body.name,
        f_name: body.f_name || null,
        sbc_enrollment_no: body.sbc_enrollment_no || null,
        mobile: body.mobile || null,
        image: body.image || null,
      },
    });

    return NextResponse.json({
      success: true,
      advocate,
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
