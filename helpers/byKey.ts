export default function byKey(
  keyName: string
): (a: Record<string, any>) => boolean {
  return (a) => a.key === keyName;
}
