import { NextResponse } from "next/server";

type SetCookieBody = {
  name: string;
  value: string;
  /** Max age in days; defaults to 7 */
  maxAgeDays?: number;
};

export async function POST(request: Request) {
  const body = (await request.json()) as Partial<SetCookieBody>;

  if (!body.name || typeof body.value !== "string") {
    return NextResponse.json(
      { success: false, message: "name and value are required" },
      { status: 400 }
    );
  }

  const maxAgeDays = body.maxAgeDays ?? 7;
  const maxAgeSeconds = maxAgeDays * 24 * 60 * 60;

  const response = NextResponse.json({
    success: true,
    name: body.name,
  });

  response.cookies.set({
    name: body.name,
    value: body.value,
    maxAge: maxAgeSeconds,
    path: "/",
  });

  return response;
}

