import { IEntityExtended } from "@/types/entityCollections";

export default function getEntityTotalTokenAmount(
  entity?: IEntityExtended
): number | undefined {
  if (!entity) return undefined;

  return Object.entries(
    entity?._adminToken?.CARBON?._totalMinted?.tokens ?? {}
  )?.[0]?.[1].amount;
}

export function getEntityTotalMintedAmount(
  entity?: IEntityExtended
): number | undefined {
  if (!entity) return undefined;

  return Object.entries(
    entity?._adminToken?.CARBON?._totalMinted?.tokens ?? {}
  )?.[0]?.[1].minted;
}

export function getEntityTotalRetiredAmount(
  entity?: IEntityExtended
): number | undefined {
  if (!entity) return undefined;

  return Object.entries(
    entity?._adminToken?.CARBON?._totalMinted?.tokens ?? {}
  )?.[0]?.[1].retired;
}
