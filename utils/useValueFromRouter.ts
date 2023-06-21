import { useRouter } from "next/router";

export default function useValueFromRouter<T extends string>(
  name: string
): T | undefined {
  const router = useRouter();
  const value = router.query[name];
  if (typeof value !== "string") return undefined;
  return value as unknown as T;
}
