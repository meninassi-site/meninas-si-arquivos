/**
 * @types/node types Buffer as Uint8Array<ArrayBufferLike>, but Prisma's
 * generated input types for Bytes columns want Uint8Array<ArrayBuffer>
 * specifically. A Buffer satisfies that shape at runtime; this just tells
 * TypeScript so.
 */
export function toPrismaBytes(buffer: Buffer): Uint8Array<ArrayBuffer>;
export function toPrismaBytes(buffer: Buffer | undefined): Uint8Array<ArrayBuffer> | undefined;
export function toPrismaBytes(buffer: Buffer | undefined): Uint8Array<ArrayBuffer> | undefined {
  if (!buffer) return undefined;
  return buffer as unknown as Uint8Array<ArrayBuffer>;
}
