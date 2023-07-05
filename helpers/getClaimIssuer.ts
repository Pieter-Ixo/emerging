import { requestBlocksyncAPI } from "@/requests/blocksync";
import { IClaimIssuer } from "@/types/certificates/claimVer";

import getEntityProfile from "./getEntityProfile";

export default async function getClaimIssuer(
  claimIssuerId: string
): Promise<IClaimIssuer | undefined> {
  if (!claimIssuerId) return undefined;

  const claimIssuerUri = `/api/entity/byId/${claimIssuerId}`;
  const claimIssuer = await requestBlocksyncAPI<IClaimIssuer>(claimIssuerUri);
  if (!claimIssuer) return undefined;

  const claimIssuerProfile = await getEntityProfile(claimIssuer);
  claimIssuer._profile = claimIssuerProfile;
  return claimIssuer;
}
