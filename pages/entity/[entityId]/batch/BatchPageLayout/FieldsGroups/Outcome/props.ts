import { IClaimCer, IFuelPurchase } from "@/types/certificates/claimCer";
import { IQuantity } from "@/types/certificates/claimVer";
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
};

export default function PagePlug() {
  return null;
}
