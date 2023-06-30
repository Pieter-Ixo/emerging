import { Flex } from "@mantine/core";

import { FieldText, FieldsGroupTitle } from ".";

type Props = {
  entityIdentifier?: string;
};

export default function ImpactClaim({ entityIdentifier }: Props) {
  return (
    <Flex direction="column">
      <FieldsGroupTitle icon="/images/icon-leaf-solid.svg">
        Impact Claim
      </FieldsGroupTitle>

      <Flex direction="column" gap="md">
        <Flex justify="space-between" align="center">
          <FieldText>Fuel Type</FieldText>
          <FieldText>Fuel Type</FieldText>
        </Flex>
        <Flex justify="space-between" align="center">
          <FieldText>Fuel Amount</FieldText>
          <FieldText>Fuel Amount</FieldText>
        </Flex>
        <Flex justify="space-between" align="center">
          <FieldText>Conversion Factor</FieldText>
          <FieldText>Conversion Factor</FieldText>
        </Flex>
        <Flex justify="space-between" align="center">
          <FieldText>Period</FieldText>
          <FieldText>Period</FieldText>
        </Flex>
        <Flex justify="space-between" align="center">
          <FieldText>Emissions Avoided</FieldText>
          <FieldText>Emissions Avoided</FieldText>
        </Flex>
        <Flex justify="space-between" align="center">
          <FieldText>Claim Issuer</FieldText>
          <FieldText>Claim Issuer</FieldText>
        </Flex>
        <Flex justify="space-between" align="center">
          <FieldText>Claim ID</FieldText>
          <FieldText>Claim ID</FieldText>
        </Flex>
      </Flex>
    </Flex>
  );
}
