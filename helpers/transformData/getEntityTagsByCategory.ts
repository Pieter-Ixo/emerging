import {
  IEntityExtended,
  ICollectionExtended,
} from "@/types/entityCollections";
import { IEntityTags } from "@/types/entityCollections/tag";

export default function getEntityTagsByCategory(
  entity: IEntityExtended | ICollectionExtended | undefined,
  category: string
): IEntityTags["tags"] | undefined {
  if (!entity || !category) return undefined;
  return entity?._tags?.entityTags.find((t) => t.category === category)?.tags;
}
