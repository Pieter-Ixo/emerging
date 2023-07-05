import { IClaimIssuer } from "@/types/certificates/claim";

export type ImpactClaimProps = {
  fuelType?: string | string[];
  fuelAmount?: string;
  conversionFactor?: string;
  period?: {
    startDate: string;
    endDate: string;
  };
  emissionsAvoided?: string;
  claimId?: string;
  claimIssuer?: IClaimIssuer["_profile"];
};

export type PortalProps = ImpactClaimProps & { _isVisible: boolean };

export default function PagePlug() {
  return null;
}
