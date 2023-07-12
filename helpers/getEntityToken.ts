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

  const [tokenData, tokenDataTotal] = await Promise.all([
    await requestBlocksyncAPI<ITokenWhateverItMean>(
      `/api/token/byAddress/${tokenAddress}`
    ),
    await requestBlocksyncAPI<ITokenWhateverItMean>(
      `/api/token/totalByAddress/${tokenAddress}`
    ),
  ]);

  if (!tokenData) throw new Error("Panica!");

  tokenData.CARBON._totalMinted = tokenDataTotal?.CARBON;

  return tokenData;
}
