import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.redirect(
    new URL("https://wa.me/905054722153"),
    307
  );
}