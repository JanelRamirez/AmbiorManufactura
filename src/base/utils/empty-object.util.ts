export function isEmptyObject(obj: Record<string, any>): boolean {
  if (!obj) return true;
  return Object.keys(obj).length === 0;
}
