export function isTrue(val: string | undefined): boolean {
  if (!val) {
    return false;
  }
  return /^true$/i.test(val);
}
