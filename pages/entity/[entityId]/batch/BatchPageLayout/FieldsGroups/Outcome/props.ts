import { IClaimCer, IFuelPurchase } from "@/types/certificates/claimCer";
import {
  IClaimIssuer,
  IQuantity,
  IResult,
} from "@/types/certificates/claimVer";
import { IVerifiableCred } from "@/types/certificates/verifiableCred";

export type OutcomeProps = {
  claimCer?: IClaimCer;
  claimDescription?: string;
  quantity?: IQuantity;
  conversionFactor?: string;
  verifiableCred?: IVerifiableCred;
  period?: {
    startDate: string;
    endDate: string;
  };
  evidence?: string;
  fuelPurchase?: IFuelPurchase;
  result?: IResult;
  claimIssuer?: IClaimIssuer["_profile"];
};

export default function PagePlug() {
  return null;
}
