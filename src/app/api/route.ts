import { NextResponse } from "next/server";

// Static export for GitHub Pages — the /api route is unused by the CSS Guide site
// but must be marked force-static to satisfy Next.js "output: export" requirements.
export const dynamic = "force-static";

export async function GET() {
  return NextResponse.json({ message: "Hello, world!" });
}
