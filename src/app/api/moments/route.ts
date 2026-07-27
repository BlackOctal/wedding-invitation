import { NextResponse } from "next/server";
import { addMoment } from "@/lib/db";
import { uploadImage } from "@/lib/storage";
import { MOMENT_ROTATIONS } from "@/data/wedding";

export const dynamic = "force-dynamic";

const MAX_PHOTOS_PER_SUBMIT = 20;

export async function POST(request: Request) {
  const formData = await request.formData();
  const name = String(formData.get("name") || "").trim().slice(0, 200);
  const photos = formData.getAll("photos").filter((v): v is File => v instanceof File && v.size > 0);

  if (!name) {
    return NextResponse.json({ error: "Name is required." }, { status: 400 });
  }
  if (photos.length === 0) {
    return NextResponse.json({ error: "At least one photo is required." }, { status: 400 });
  }
  if (photos.length > MAX_PHOTOS_PER_SUBMIT) {
    return NextResponse.json({ error: `Please add at most ${MAX_PHOTOS_PER_SUBMIT} photos at a time.` }, { status: 400 });
  }

  const moments = await Promise.all(
    photos.map(async (photo) => {
      const imageUrl = await uploadImage(photo, "moment");
      const rotate = MOMENT_ROTATIONS[Math.floor(Math.random() * MOMENT_ROTATIONS.length)];
      return addMoment({ name, message: "", imageUrl, rotate });
    })
  );

  return NextResponse.json({ moments });
}
