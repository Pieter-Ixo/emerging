import { requestBlocksyncAPI } from "@/requests/blocksync";
import { IClaimIssuer } from "@/types/certificates/claimVer";

import requestEntityProfile from "./requestEntityProfile";

export default async function requestClaimIssuerFilled(
  claimIssuerId: string
): Promise<IClaimIssuer | undefined> {
  if (!claimIssuerId) return undefined;

  const claimIssuerUri = `/api/entity/byId/${claimIssuerId}`;
  const claimIssuer = await requestBlocksyncAPI<IClaimIssuer>(claimIssuerUri);
  if (!claimIssuer) return undefined;

  const claimIssuerProfile = await requestEntityProfile(claimIssuer);
  claimIssuer._profile = claimIssuerProfile;
  return claimIssuer;
}
