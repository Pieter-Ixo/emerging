import { ITokenMap } from "@/types/entityCollections";

export default function filterCarbonTokens(
  carbonTokensFirst: ITokenMap,
  carbonTokensSecond: ITokenMap
): ITokenMap | {} {
  const tokenEntries = Object.entries(carbonTokensFirst);

  const filteredEntries = tokenEntries.filter(
    ([tokenId]) => tokenId in carbonTokensSecond
  );

  return Object.fromEntries(filteredEntries);
}
