import { Flex } from "@mantine/core";

import { FieldText, FieldsGroupTitle } from "../styledComponents";
import { OutcomeProps } from "./props";
import Claim from "./Claim";
import ConversionFactor from "./ConversionFactor";
import Evidence from "./Evidence";

export default function Outcome({
  claimCer,
  claimDescription,
  quantity,
  conversionFactor,
  verifiableCred,
  period,
  evidence,
  fuelPurchase,
}: OutcomeProps) {
  const quantityType = quantity?.type[1]?.split(":")?.[1] || quantity?.type[1];
  const quantityString = `${quantity?.amount} ${quantity?.units} ${quantityType}`;

  const startDate = period?.startDate
    ? new Date(period?.startDate).toLocaleDateString()
    : "...";
  const endDate = period?.endDate
    ? new Date(period?.endDate).toLocaleDateString()
    : "...";
  const periodFormatted: string = `${startDate} - ${endDate}`;

  return (
    <Flex direction="column">
      <FieldsGroupTitle icon="/images/icon-leaf-solid.svg">
        Outcome
      </FieldsGroupTitle>

      <Flex direction="column" gap="md">
        <Claim claimCer={claimCer} claimDescription={claimDescription} />
        <Flex justify="space-between" align="center">
          <FieldText>Quantity</FieldText>
          <FieldText>{quantityString}</FieldText>
        </Flex>
        <ConversionFactor
          conversionFactor={conversionFactor}
          verifiableCred={verifiableCred}
        />
        <Flex justify="space-between" align="center">
          <FieldText>Period</FieldText>
          <FieldText>{periodFormatted}</FieldText>
        </Flex>
        <Evidence evidence={evidence} fuelPurchase={fuelPurchase} />
      </Flex>
    </Flex>
  );
}
