import request from "@/requests/request";
import { IClaimCer, IFuelPurchase } from "@/types/certificates/claimCer";
import { IClaimVer } from "@/types/certificates/claimVer";

export default async function getClaimCer(
  claimVer: IClaimVer
): Promise<IClaimCer | undefined> {
  const claimCerId = claimVer?.outcome.linkedClaim.id.split(":")?.[1];
  const cellnodeURL = claimVer["@context"][1]?.cellnode;

  const claimCer = await request<IClaimCer>(`${cellnodeURL}${claimCerId}`);

  const fuelPurchaseId =
    claimCer?.credentialSubject.claim.evidence[0].linkedClaim.id.split(":")[1];

  const fuelPurchase = await request<IFuelPurchase>(
    `${cellnodeURL}${fuelPurchaseId}`
  );

  // @ts-ignore
  return { ...claimCer, _fuelPurchase: fuelPurchase };
}
