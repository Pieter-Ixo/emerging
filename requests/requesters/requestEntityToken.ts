import { requestBlocksyncAPI } from "@/requests/blocksync";
import {
  ICarbonTokens,
  ICarbonsTokenExtended,
} from "@/types/entityCollections";

export default async function requestUsersTokensAndTotal(
  tokenOwner: string
): Promise<ICarbonsTokenExtended | undefined> {
  const [tokenData, tokenDataTotal] = await Promise.all([
    await requestBlocksyncAPI<ICarbonsTokenExtended>(
      `/api/token/byAddress/${tokenOwner}`
    ),
    await requestBlocksyncAPI<ICarbonsTokenExtended>(
      `/api/token/totalByAddress/${tokenOwner}`
    ),
  ]);
  if (!tokenData) throw new Error("Panica!");

  if (tokenData.CARBON && tokenDataTotal)
    tokenData.CARBON._totalMinted = tokenDataTotal?.CARBON;

  return tokenData;
}

export async function requestTokenByAddress(
  tokenOwner: string
): Promise<ICarbonTokens> {
  const tokenData = await requestBlocksyncAPI<ICarbonTokens>(
    `/api/token/byAddress/${tokenOwner}`
  );
  if (!tokenData) throw new Error("Panica!");
  return tokenData;
}

export async function requestTotalTokenByAddress(
  tokenOwner: string
): Promise<ICarbonTokens> {
  const totalTokenData = await requestBlocksyncAPI<ICarbonTokens>(
    `/api/token/totalByAddress/${tokenOwner}`
  );
  if (!totalTokenData) throw new Error("Panica!");

  return totalTokenData;
}
