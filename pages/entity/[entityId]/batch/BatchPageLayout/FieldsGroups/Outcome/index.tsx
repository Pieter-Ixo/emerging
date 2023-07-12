import { Flex } from "@mantine/core";

import splitCamelCase from "@/utils/splitCamelCase";

import { FieldText, FieldsGroupTitle } from "../styledComponents";
import { OutcomeProps } from "./props";
import Claim from "./Claim";
import ConversionFactor from "./ConversionFactor";
import Evidence from "./Evidence";
import ClaimIssuer from "./ClaimIssuer";

export default function Outcome({
  claimCer,
  claimDescription,
  quantity,
  conversionFactor,
  verifiableCred,
  period,
  evidence,
  fuelPurchase,
  result,
  claimIssuer,
}: OutcomeProps) {
  const quantityType = quantity?.type[1]?.split(":")?.[1] || quantity?.type[1];
  const quantityString = `${quantity?.amount} ${quantity?.units} ${quantityType}`;
  const quantityStringWithSpaces = splitCamelCase(quantityString).join(" ");
  const resultString = `${result?.amount} ${result?.units} `;

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
          <FieldText>{quantityStringWithSpaces}</FieldText>
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
        <Flex justify="space-between" align="center">
          <FieldText>Result</FieldText>
          <FieldText>{resultString}</FieldText>
        </Flex>
        <ClaimIssuer claimIssuer={claimIssuer} />
      </Flex>
    </Flex>
  );
}
