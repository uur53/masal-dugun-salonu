import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req) {
  const formData = await req.formData();
  const files = formData.getAll("file");
  const savedFiles = [];
  for (const file of files) {
    if (!file || typeof file === "string") continue;
    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = Date.now() + "-" + file.name.replace(/\s+/g, "-");
    const filePath = path.join(process.cwd(), "public", filename);
    await writeFile(filePath, buffer);
    savedFiles.push("/" + filename);
  }
  return NextResponse.json({ urls: savedFiles });
}
