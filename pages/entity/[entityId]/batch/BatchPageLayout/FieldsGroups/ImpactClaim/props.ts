import {  IBatchDataFilled } from "@/types/certificates";
import { IClaimCer } from "@/types/certificates/claimCer";
import { IClaimIssuer } from "@/types/certificates/claimVer";

export type ImpactClaimProps = {
  fuelType?: string | string[];
  fuelAmount?: string;
  conversionFactor?: string;
  period?: {
    startDate: string;
    endDate: string;
  };
  emissionsAvoided?: string;
  claimCer?: IClaimCer;
  claimIssuer?: IClaimIssuer["_profile"];
  verifiableCred?: IBatchDataFilled["_verifiableCred"];
};

export type PortalProps = ImpactClaimProps & { _isVisible: boolean };

export default function PagePlug() {
  return null;
}
