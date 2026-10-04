/**
 * The diagram's photo/cover_photo columns are plain BLOB/MEDIUMBLOB — there is
 * no column to remember the original MIME type. Rather than widen the schema,
 * we sniff the first few bytes when serving an image back out, matching
 * against the handful of formats the admin upload forms accept.
 */
export function sniffImageContentType(bytes: Uint8Array): string {
  const buffer = Buffer.isBuffer(bytes) ? bytes : Buffer.from(bytes);
  if (buffer.length >= 8 && buffer.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) {
    return "image/png";
  }
  if (buffer.length >= 3 && buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) {
    return "image/jpeg";
  }
  if (buffer.length >= 6 && (buffer.toString("ascii", 0, 6) === "GIF87a" || buffer.toString("ascii", 0, 6) === "GIF89a")) {
    return "image/gif";
  }
  if (
    buffer.length >= 12 &&
    buffer.toString("ascii", 0, 4) === "RIFF" &&
    buffer.toString("ascii", 8, 12) === "WEBP"
  ) {
    return "image/webp";
  }
  if (buffer.length >= 2 && buffer.toString("ascii", 0, 2) === "BM") {
    return "image/bmp";
  }
  return "application/octet-stream";
}
