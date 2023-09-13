import { IEntityExtended } from "@/types/entityCollections";
import { getEntityTotalMintedAmount } from "@/helpers/transformData/getTotalMintedAmount";

export function transformPortfolioEntitiesToTableView(
  entities: IEntityExtended[]
) {
  return entities.map((entity) => ({
    ...entity,
    id: entity.externalId,
    alsoKnownAs: entity.alsoKnownAs.includes("#")
      ? entity.alsoKnownAs?.replace("{id}", "")
      : `#${entity.alsoKnownAs}`,
    retired: (getEntityTotalMintedAmount(entity) || 0) / 2,
    produced: getEntityTotalMintedAmount(entity),
    totalTokenAmount: getEntityTotalMintedAmount(entity),
  }));
}

export function transformPortfolioEntitiesToTableSort(
  entities: IEntityExtended[]
) {
  return entities.map((entity) => ({
    ...entity,
    id: entity.externalId,
    alsoKnownAs: entity.alsoKnownAs?.replace("{id}#", ""),
    retired: (getEntityTotalMintedAmount(entity) || 0) / 2,
    produced: getEntityTotalMintedAmount(entity),
    totalTokenAmount: getEntityTotalMintedAmount(entity),
  }));
}
