import { Flex } from "@mantine/core";

import { FieldText, FieldsGroupTitle } from "../styledComponents";
import { OutcomeProps } from "./props";
import Claim from "./Claim";

export default function Outcome({
  claimCer,
  claimDescription,
  quantity,
}: OutcomeProps) {
  const quantityType = quantity?.type[1]?.split(":")?.[1] || quantity?.type[1];
  const quantityString = `${quantity?.amount} ${quantity?.units} ${quantityType}`;

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
      </Flex>
    </Flex>
  );
}
