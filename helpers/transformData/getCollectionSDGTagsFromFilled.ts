import { ICollectionExtended } from "@/types/entityCollections";

export default function getCollectionSDGTagsFromFilled(
  collection: ICollectionExtended
): string[] {
  const entityTags = collection._tags?.entityTags;
  const sdgTags = entityTags?.find((tag) => tag.category === "SDG");
  return sdgTags?.tags ?? [];
}
