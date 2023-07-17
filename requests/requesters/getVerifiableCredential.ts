import { IClaimVer } from "@/types/certificates/claimVer";
import { IVerifiableCred } from "@/types/certificates/verifiableCred";
import request from "@/requests/request";

export default async function requestVerifiableCredential(
  claimVer: IClaimVer
): Promise<IVerifiableCred | undefined> {
  if (!claimVer) return undefined;
  const [originCode, idOfSomethingIDunnoWhatItIs] =
    claimVer.outcome.calculation.id.split(":");

  const origin = claimVer["@context"][1][originCode];
  const verifiableCredentialURL = `${origin}${idOfSomethingIDunnoWhatItIs}`;
  const verifiableCredential = await request<IVerifiableCred>(
    verifiableCredentialURL
  );
  if (!verifiableCredential) return undefined;

  return verifiableCredential;
}
