import { NextResponse } from "next/server";
import { db } from "@/db";
import { images as imagesTable } from "@/db/schema";

export async function GET() {
  try {
    const images = await db.select().from(imagesTable);
    return NextResponse.json(images);
  } catch (error) {
    console.error("Error fetching gallery items:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
