import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name");

  if (!name) {
    return NextResponse.json(
      { success: false, message: "name query param is required" },
      { status: 400 }
    );
  }

  const cookieStore = await cookies();
  const cookie = cookieStore.get(name);

  return NextResponse.json({
    success: true,
    name,
    value: cookie?.value ?? null,
  });
}

