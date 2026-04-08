import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const rawBody = await req.text();
    console.log("PAYHIP WEBHOOK RAW:", rawBody);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("PAYHIP WEBHOOK ERROR:", error);
    return NextResponse.json(
      { ok: false, error: "Webhook failed" },
      { status: 500 }
    );
  }
}
