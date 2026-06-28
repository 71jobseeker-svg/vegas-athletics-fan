import { NextResponse } from "next/server";
import { subscribeToMailchimp } from "@/lib/mailchimp";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const email = typeof body.email === "string" ? body.email : "";

    if (!email.trim()) {
      return NextResponse.json(
        { error: "Email address is required." },
        { status: 400 },
      );
    }

    const result = await subscribeToMailchimp(email);

    if (!result.ok) {
      console.error("[api/subscribe] Failed:", result.error);
      return NextResponse.json({ error: result.error }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown subscribe error";
    console.error("[api/subscribe] Unexpected error:", message);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
