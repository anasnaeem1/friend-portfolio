import { NextResponse } from "next/server";

import PortfolioContent from "../../../models/PortfolioContent";

export async function GET() {
  try {
    const doc = await PortfolioContent.getOrCreate();
    return NextResponse.json(doc.toContent());
  } catch (err) {
    console.error("GET /api/content:", err);
    return NextResponse.json({ error: "Failed to load content" }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const doc = await PortfolioContent.saveContent(body);
    return NextResponse.json(doc.toContent());
  } catch (err) {
    console.error("PUT /api/content:", err);
    return NextResponse.json({ error: "Failed to save content" }, { status: 500 });
  }
}
