import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.json();

  // Security check
  if (body.secret !== process.env.SANITY_REVALIDATE_SECRET) {
    return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
  }

  const type = body._type;
  const slug = body.slug?.current;

  try {
    // ===== Trips =====
    if (type === "trip") {
      revalidatePath("/trips", "page");
      if (slug) revalidatePath(`/trips/${slug}`, "page");
      revalidatePath("/", "page"); // if trips appear on homepage
    }

    // ===== Blog (future example) =====
    if (type === "post") {
      revalidatePath("/blog", "page");
      if (slug) revalidatePath(`/blog/${slug}`, "page");
    }

    // ===== Global Settings =====
    if (type === "siteSettings") {
      revalidatePath("/", "page");
    }

    return NextResponse.json({ revalidated: true });
  } catch (err) {
    return NextResponse.json(
      { message: "Revalidation failed" },
      { status: 500 }
    );
  }
}
