import { Flex } from "@mantine/core";

import { FieldText, FieldsGroupTitle } from "../styledComponents";
import { ImpactClaimProps } from "./props";
import ClaimIssuer from "./ClaimIssuer";
import ClaimId from "./ClaimId";
import ConversionFactor from "./ConversionFactor";

export default function ImpactClaim({
  fuelType,
  fuelAmount,
  conversionFactor,
  period,
  emissionsAvoided,
  claimIssuer,
  claimCer,
  verifiableCred,
}: ImpactClaimProps) {
  const startDate = period?.startDate
    ? new Date(period?.startDate).toLocaleDateString()
    : "...";
  const endDate = period?.endDate
    ? new Date(period?.endDate).toLocaleDateString()
    : "...";
  const periodFormatted: string = `${startDate} - ${endDate}`;

  const fuelTypeFormatted = Array.isArray(fuelType)
    ? fuelType.join(", ")
    : fuelType;

  return (
    <Flex direction="column">
      <FieldsGroupTitle icon="/images/icon-leaf-solid.svg">
        Impact Claim
      </FieldsGroupTitle>

      <Flex direction="column" gap="md">
        <Flex justify="space-between" align="center">
          <FieldText>Fuel Type</FieldText>
          <FieldText>{fuelTypeFormatted}</FieldText>
        </Flex>
        <Flex justify="space-between" align="center">
          <FieldText>Fuel Amount</FieldText>
          <FieldText>{fuelAmount}</FieldText>
        </Flex>
        <ConversionFactor
          conversionFactor={conversionFactor}
          verifiableCred={verifiableCred}
        />
        <Flex justify="space-between" align="center">
          <FieldText>Period</FieldText>
          <FieldText>{periodFormatted}</FieldText>
        </Flex>
        <Flex justify="space-between" align="center">
          <FieldText>Emissions Avoided</FieldText>
          <FieldText>{emissionsAvoided}</FieldText>
        </Flex>
        <ClaimIssuer claimIssuer={claimIssuer} />
        <ClaimId claimCer={claimCer} />
      </Flex>
    </Flex>
  );
}
