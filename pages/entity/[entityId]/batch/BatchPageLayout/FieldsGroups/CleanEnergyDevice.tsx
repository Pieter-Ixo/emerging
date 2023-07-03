import { Flex } from "@mantine/core";

import { IAttribute } from "@/types/entityCollections/settings";
import shortStr from "@/utils/shortStr";

import { FieldText, FieldsGroupTitle } from ".";

type Props = {
  type?: string;
  model?: string;
  fuelAttribute?: IAttribute;
  manufactureDate?: string;
  manufacturePlace?: string;
};

export default function CleanEnergyDevice({
  type,
  model,
  fuelAttribute,
  manufactureDate,
  manufacturePlace,
}: Props) {
  const fuel = fuelAttribute?.value;

  return (
    <Flex direction="column">
      <FieldsGroupTitle icon="/images/icon-cogs-solid.svg">
        Clean Energy Device
      </FieldsGroupTitle>

      <Flex direction="column" gap="md">
        <Flex justify="space-between" align="center">
          <FieldText>Type </FieldText>
          <FieldText>{shortStr(type)}</FieldText>
        </Flex>
        <Flex justify="space-between" align="center">
          <FieldText>Model </FieldText>
          <FieldText>{model}</FieldText>
        </Flex>
        <Flex justify="space-between" align="center">
          <FieldText>Fuel </FieldText>
          <FieldText>{fuel}</FieldText>
        </Flex>
        <Flex justify="space-between" align="center">
          <FieldText>Manufacture Date </FieldText>
          <FieldText>{manufactureDate}</FieldText>
        </Flex>
        <Flex justify="space-between" align="center">
          <FieldText>Manufacture Place </FieldText>
          <FieldText>{manufacturePlace}</FieldText>
        </Flex>
      </Flex>
    </Flex>
  );
}
