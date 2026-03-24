import { randomUUID } from "crypto";
import { put } from "@vercel/blob";

export async function uploadPaymentScreenshot(file: File) {
  const extension =
    file.name.split(".").pop()?.replace(/[^a-zA-Z0-9]/g, "").toLowerCase() || "png";
  const safeName = `${randomUUID()}.${extension}`;

  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const blob = await put(`payments/${safeName}`, file, {
      access: "public",
      addRandomSuffix: false
    });

    return blob.url;
  }

  const arrayBuffer = await file.arrayBuffer();
  const base64 = Buffer.from(arrayBuffer).toString("base64");
  return `data:${file.type || "image/png"};base64,${base64}`;
}
