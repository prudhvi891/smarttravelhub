import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const slug = body?.slug;

    if (!slug) {
      return NextResponse.json(
        { message: "No slug provided" },
        { status: 400 }
      );
    }

    // Revalidate specific trip page
    revalidatePath(`/trips/${slug}`);

    // Revalidate trips listing page
    revalidatePath("/trips");

    // Revalidate homepage (if trips appear there)
    revalidatePath("/");

    return NextResponse.json({
      revalidated: true,
      slug,
      time: new Date().toISOString(),
    });

  } catch (error) {
    return NextResponse.json(
      { message: "Revalidation failed", error },
      { status: 500 }
    );
  }
}
