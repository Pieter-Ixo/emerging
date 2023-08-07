import { Flex } from "@mantine/core";

import { FieldText, FieldsGroupTitle } from "../styledComponents";

import Protocol from "./Oracle";
import { OracleVerificationProps } from "./props";

export default function ImpactEvaluator({ oracle }: OracleVerificationProps) {
  const attributes = oracle?._profile?.attributes;

  return (
    <Flex direction="column">
      <FieldsGroupTitle icon="/images/icon-cd-disk.svg">
        Impact Evaluator
      </FieldsGroupTitle>

      <Flex direction="column" gap="md">
        <Protocol oracle={oracle} />
        <Flex justify="space-between" align="center">
          <FieldText>Claims Processed</FieldText>
          <FieldText>2,913</FieldText>
        </Flex>
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
