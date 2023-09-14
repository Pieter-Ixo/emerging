import { IEntityExtended } from "@/types/entityCollections";
import getEntityTotalTokenAmount, {
  getEntityTotalMintedAmount,
  getEntityTotalRetiredAmount,
} from "@/helpers/transformData/getTotalMintedAmount";

export function transformPortfolioEntitiesToTableView(
  entities: IEntityExtended[]
) {
  return entities.map((entity) => ({
    ...entity,
    id: entity.externalId,
    alsoKnownAs: entity.alsoKnownAs.includes("#")
      ? entity.alsoKnownAs?.replace("{id}", "")
      : `#${entity.alsoKnownAs}`,
    retired: getEntityTotalRetiredAmount(entity) || 0,
    produced: getEntityTotalMintedAmount(entity),
    totalTokenAmount: getEntityTotalTokenAmount(entity),
  }));
}

export function transformPortfolioEntitiesToTableSort(
  entities: IEntityExtended[]
) {
  return entities.map((entity) => ({
    ...entity,
    id: entity.externalId,
    alsoKnownAs: entity.alsoKnownAs?.replace("{id}#", ""),
    retired: getEntityTotalRetiredAmount(entity) || 0,
    produced: getEntityTotalMintedAmount(entity),
    totalTokenAmount: getEntityTotalTokenAmount(entity),
  }));
}
