import {
  IEntityExtended,
  ICollectionExtended,
} from "@/types/entityCollections";
import { IEntityTags, ITagsSettings } from "@/types/entityCollections/tag";

export default function getEntityTagsByCategory(
  entity: IEntityExtended | ICollectionExtended | undefined,
  category: string
): IEntityTags["tags"] | undefined {
  if (!entity || !category) return undefined;
  return entity?._tags?.entityTags.find((t) => t.category === category)?.tags;
}

export function getEntityTagsFromTags(
  tags: ITagsSettings | undefined,
  category: string = "SDG"
): IEntityTags["tags"] | undefined {
  return tags?.entityTags.find((t) => t.category === category)?.tags;
}
