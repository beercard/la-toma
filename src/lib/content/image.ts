const MAX_WIDTH = 2000;
const WEBP_QUALITY = 0.82;

const CONVERTIBLE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/bmp"];

export interface PreparedUpload {
  blob: Blob;
  ext: string;
  contentType: string;
}

const passthrough = (file: File): PreparedUpload => ({
  blob: file,
  ext: (file.name.split(".").pop() || "bin").toLowerCase(),
  contentType: file.type || "application/octet-stream",
});

export async function optimizeImageToWebp(file: File): Promise<PreparedUpload> {
  if (typeof document === "undefined" || !CONVERTIBLE_TYPES.includes(file.type)) {
    return passthrough(file);
  }

  try {
    const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
    const scale = Math.min(1, MAX_WIDTH / bitmap.width);
    const width = Math.round(bitmap.width * scale);
    const height = Math.round(bitmap.height * scale);

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      bitmap.close?.();
      return passthrough(file);
    }

    ctx.drawImage(bitmap, 0, 0, width, height);
    bitmap.close?.();

    const blob = await new Promise<Blob | null>((resolve) =>
      canvas.toBlob(resolve, "image/webp", WEBP_QUALITY),
    );

    if (!blob) return passthrough(file);
    return { blob, ext: "webp", contentType: "image/webp" };
  } catch {
    return passthrough(file);
  }
}
