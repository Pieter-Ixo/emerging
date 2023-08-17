import { Flex } from "@mantine/core";

import { FieldText, FieldsGroupTitle } from "../styledComponents";

import { ImpactVerificationProps } from "./props";
import Protocol from "./Protocol";

export default function ImpactVerification({
  protocol,
}: ImpactVerificationProps) {
  // @ts-ignore
  const attributes = protocol?._profile?.attributes;

  return (
    <Flex direction="column">
      <FieldsGroupTitle icon="/images/icon-chart-bar-solid.svg">
        IMPACT VERIFICATION
      </FieldsGroupTitle>

      <Flex direction="column" gap="md">
          <Protocol protocol={protocol} />
        {attributes?.map((attr) => (
          <Flex key={attr.key} justify="space-between" align="center">
            <FieldText>{attr.key}</FieldText>
            <FieldText>{attr.value}</FieldText>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
}
