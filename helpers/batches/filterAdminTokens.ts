import { ITokenMap } from "@/types/entityCollections";

export default function filterAdminTokens(
  adminCarbonTokens: ITokenMap,
  ownerCarbonTokens: ITokenMap
): ITokenMap | {} {
  return adminCarbonTokens
    ? Object.keys(adminCarbonTokens).reduce(
        (filteredAdminTokensObject, adminTokenId) => {
          if (adminTokenId in ownerCarbonTokens) {
            return {
              ...filteredAdminTokensObject,
              [adminTokenId]: adminCarbonTokens[adminTokenId],
            };
          }
          return filteredAdminTokensObject;
        },
        {}
      )
    : {};
}
