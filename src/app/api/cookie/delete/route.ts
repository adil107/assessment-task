import { NextResponse } from "next/server";

type DeleteCookieBody = {
  name: string;
};

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<DeleteCookieBody>;

  if (!body.name) {
    return NextResponse.json(
      { success: false, message: "name is required" },
      { status: 400 }
    );
  }

  const response = NextResponse.json({
    success: true,
    name: body.name,
  });

  // Delete by setting maxAge 0
  response.cookies.set({
    name: body.name,
    value: "",
    maxAge: 0,
    path: "/",
  });

  return response;
}

