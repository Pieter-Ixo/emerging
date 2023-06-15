import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Collections() {
  const router = useRouter();

  useEffect(() => {
    router.push("/collections/global", undefined, { shallow: true });
  }, [router]);
}
