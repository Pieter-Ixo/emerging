import { IEntityExtended } from "@/types/entityCollections";
import { dateToDayMonthYear } from "@/utils/dates/dateTo";
import shortStr from "@/utils/shortStr";

export function extendEntities(sortedEntities: IEntityExtended[]) {
  return sortedEntities.map((entity) => ({
    ...entity,
    metadata: {
      ...entity.metadata,
      created: dateToDayMonthYear(entity.metadata.created),
    },
    owner: shortStr(entity.owner, 16, 5, "..."),
    owned: entity.owner ? "true" : "false",
  }));
}
export function extendSingleEntity(entity?: IEntityExtended) {
  if (!entity) return undefined;

  return {
    ...entity,
    metadata: {
      ...entity.metadata,
      created: dateToDayMonthYear(entity.metadata.created),
    },
    owner: shortStr(entity.owner, 16, 5, "..."),
    owned: entity.owner ? "true" : "false",
  };
}
