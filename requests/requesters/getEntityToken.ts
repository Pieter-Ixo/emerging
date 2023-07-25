import { requestBlocksyncAPI } from "@/requests/blocksync";
import { ITokenWhateverItMean } from "@/types/entityCollections";

export default async function requestUsersToken(
  tokenOwner: string
): Promise<ITokenWhateverItMean | undefined> {
  const [tokenData, tokenDataTotal] = await Promise.all([
    await requestBlocksyncAPI<ITokenWhateverItMean>(
      `/api/token/byAddress/${tokenOwner}`
    ),
    await requestBlocksyncAPI<ITokenWhateverItMean>(
      `/api/token/totalByAddress/${tokenOwner}`
    ),
  ]);

  if (!tokenData) throw new Error("Panica!");
  console.log(tokenOwner);

  if (tokenData.CARBON && tokenDataTotal)
    tokenData.CARBON._totalMinted = tokenDataTotal?.CARBON;

  return tokenData;
}
