import { NextResponse } from "next/server";

export function GET() {
  return NextResponse.redirect(
    new URL(
      "https://www.whatsapp.com/channel/0029Vb8BNoHHwXbBIssG2k1s"
    ),
    307
  );
}