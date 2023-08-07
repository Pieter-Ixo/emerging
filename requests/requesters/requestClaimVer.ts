import request from "@/requests/request";
import { IClaimVer } from "@/types/certificates/claimVer";

export default async function requestClaimVer(
  uri: string
): Promise<IClaimVer | undefined> {
  const claimVer = await request<IClaimVer>(uri);

  return claimVer;
}
