import { ICollection } from "@/types/entityCollections";
import { useRouter } from "next/router";

function useCollectionIdFromRouter(): ICollection["id"] | undefined {
  const router = useRouter();
  const { collectionId } = router.query;
  if (typeof collectionId !== "string") return undefined;
  return collectionId;
}

export default function Collection() {
  const collectionId = useCollectionIdFromRouter();
  return <p>collectionId: {collectionId}</p>;
}
