import { Flex } from "@mantine/core";

import { FieldText, FieldsGroupTitle } from "../styledComponents";

import { ImpactVerificationProps } from "./props";
import Protocol from "./Protocol";

export default function ImpactVerification({
  protocolProfile,
}: ImpactVerificationProps) {
  // @ts-ignore
  const attributes = protocolProfile?.attributes;

  return (
    <Flex direction="column">
      <FieldsGroupTitle icon="/images/icon-chart-bar-solid.svg">
        IMPACT VERIFICATION
      </FieldsGroupTitle>

      <Flex direction="column" gap="md">
        <Protocol protocolProfile={protocolProfile} />
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
