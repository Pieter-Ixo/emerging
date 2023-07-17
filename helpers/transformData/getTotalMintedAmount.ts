import { IEntityExtended } from "@/types/entityCollections";

export default function getTotalMintedAmount(
  entity?: IEntityExtended
): number | undefined {
  if (!entity) return undefined;

  return Object.entries(
    entity?._token?.CARBON._totalMinted?.tokens ?? {}
  )?.[0]?.[1].amount;
}
