import { ITokenMap } from "@/types/entityCollections";

export default function filterAdminTokens(
  adminCarbonTokens: ITokenMap,
  ownerCarbonTokens: ITokenMap
): ITokenMap | {} {
  if (!adminCarbonTokens) return {};

  const tokenEntries = Object.entries(adminCarbonTokens);
  
  const filteredEntries = tokenEntries.filter(
    ([adminTokenId]) => adminTokenId in ownerCarbonTokens
  );
  
  return Object.fromEntries(filteredEntries);
}
