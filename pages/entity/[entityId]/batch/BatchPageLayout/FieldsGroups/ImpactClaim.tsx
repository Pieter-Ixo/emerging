import { Flex } from "@mantine/core";

import shortStr from "@/utils/shortStr";

import { FieldText, FieldsGroupTitle } from ".";

type Props = {
  fuelType?: string | string[];
  fuelAmount?: string;
  conversionFactor?: string;
  period?: {
    startDate: string;
    endDate: string;
  };
  emissionsAvoided?: string;
  claimIssuer?: string;
  claimId?: string;
};

export default function ImpactClaim({
  fuelType,
  fuelAmount,
  conversionFactor,
  period,
  emissionsAvoided,
  claimIssuer,
  claimId,
}: Props) {
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
        <Flex justify="space-between" align="center">
          <FieldText>Conversion Factor</FieldText>
          <FieldText>{conversionFactor}</FieldText>
        </Flex>
        <Flex justify="space-between" align="center">
          <FieldText>Period</FieldText>
          <FieldText>{periodFormatted}</FieldText>
        </Flex>
        <Flex justify="space-between" align="center">
          <FieldText>Emissions Avoided</FieldText>
          <FieldText>{emissionsAvoided}</FieldText>
        </Flex>
        <Flex justify="space-between" align="center">
          <FieldText>Claim Issuer</FieldText>
          <FieldText>{claimIssuer}</FieldText>
        </Flex>
        <Flex justify="space-between" align="center">
          <FieldText>Claim ID</FieldText>
          <FieldText>{shortStr(claimId)}</FieldText>
        </Flex>
      </Flex>
    </Flex>
  );
}
