import { IEntityExtended } from "@/types/entityCollections";

export default function extendEntities(sortedEntities: IEntityExtended[]) {
  return sortedEntities.map((entity) => ({
    ...entity,
    owned: entity.owner ? "true" : "false",
  }));
}
