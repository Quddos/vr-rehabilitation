import { NextResponse } from "next/server";
import {
  getSessions,
  insertSession,
  sessionSchema,
} from "@/lib/sessions";

export const runtime = "edge";
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const sessions = await getSessions();
    return NextResponse.json({ sessions });
  } catch (error) {
    console.error("[sessions][GET]", error);
    return NextResponse.json(
      { error: "Unable to fetch sessions" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const parsed = sessionSchema.safeParse(data);

    if (!parsed.success) {
      return NextResponse.json(
        {
          error: "Invalid payload",
          issues: parsed.error.flatten(),
        },
        { status: 400 },
      );
    }

    await insertSession(parsed.data);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[sessions][POST]", error);
    return NextResponse.json(
      { error: "Unable to store session" },
      { status: 500 },
    );
  }
}


