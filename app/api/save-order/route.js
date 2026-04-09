import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();

    return NextResponse.json({
      ok: true,
      orderId: "test-order-id",
      received: body
    });
  } catch (error) {
    return NextResponse.json(
      { ok: false, error: "Failed to save order" },
      { status: 500 }
    );
  }
}
