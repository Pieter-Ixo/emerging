import request from "@/requests/request";
import { IClaimCer, IFuelPurchase } from "@/types/certificates/claimCer";
import { IClaimVer } from "@/types/certificates/claimVer";

import { requestEntityWithProfile } from "./requestEntityProfile";

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

  const [fuelPurchase, project] = await Promise.allSettled([
    request<IFuelPurchase>(`${cellnodeURL}${fuelPurchaseId}`),
    requestEntityWithProfile(projectEntityId),
  ]);

  if (fuelPurchase.status === "fulfilled")
    claimCer._fuelPurchase = fuelPurchase.value;
  if (project.status === "fulfilled") claimCer._project = project.value;

  return claimCer;
}
