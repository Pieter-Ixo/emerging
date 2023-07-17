import request from "@/requests/request";
import { IClaimCer, IFuelPurchase } from "@/types/certificates/claimCer";
import { IClaimVer } from "@/types/certificates/claimVer";

import { requestEntityWithProfile } from "./getEntityProfile";

export default async function requestClaimCerFilled(
  claimVer: IClaimVer
): Promise<IClaimCer | undefined> {
  const claimCerId = claimVer?.outcome.linkedClaim.id.split(":")?.[1];
  const cellnodeURL = claimVer["@context"][1]?.cellnode;

  const claimCer = await request<IClaimCer>(`${cellnodeURL}${claimCerId}`);
  if (!claimCer) return undefined;

  const fuelPurchaseId =
    claimCer?.credentialSubject.claim.evidence[0].linkedClaim.id.split(":")[1];

  const projectEntityId = claimCer?.credentialSubject.claim.project.id;

  const [fuelPurchase, project] = await Promise.all([
    request<IFuelPurchase>(`${cellnodeURL}${fuelPurchaseId}`),
    requestEntityWithProfile(projectEntityId),
  ]);

  claimCer._fuelPurchase = fuelPurchase;
  claimCer._project = project;

  return claimCer;
}
