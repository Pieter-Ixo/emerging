import { requestBlocksyncAPI } from "@/requests/blocksync";
import {
  IEntityExtended,
  ITokenWhateverItMean,
} from "@/types/entityCollections";

export default async function getEntityToken(
  entity: IEntityExtended
): Promise<ITokenWhateverItMean | undefined> {
  const tokenAddress = entity?.accounts.find(
    (acc) => acc.name === "admin"
  )?.address;

  if (!tokenAddress) throw new Error("Panica!");

  const tokenData = await requestBlocksyncAPI<ITokenWhateverItMean>(
    `/api/token/byAddress/${tokenAddress}`
  );

  if (!tokenData) throw new Error("Panica!");

  tokenData.CARBON._totalMinted = Object.values(
    tokenData.CARBON?.tokens || []
  ).reduce((acc, token) => acc + token.minted, 0);

  return tokenData;
}
