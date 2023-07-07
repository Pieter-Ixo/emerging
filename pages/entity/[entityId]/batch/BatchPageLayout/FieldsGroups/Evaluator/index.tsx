import { Flex } from "@mantine/core";

import shortStr from "@/utils/shortStr";

import { FieldAnchor, FieldText, FieldsGroupTitle } from "../styledComponents";

type Props = {
  oracle?: string;
  methodologyName?: string;
  methodologyLink?: string;
  model?: string;
  version?: string;
  claimsProcessed?: string;
};

export default function Evaluator({
  oracle,
  methodologyName,
  methodologyLink,
  model,
  version,
  claimsProcessed,
}: Props) {
  return (
    <Flex direction="column">
      <FieldsGroupTitle icon="/images/icon-chart-bar-solid.svg">
        Evaluator
      </FieldsGroupTitle>

      <Flex direction="column" gap="md">
        <Flex justify="space-between" align="center">
          <FieldText>Oracle</FieldText>
          <FieldText>{shortStr(oracle)}</FieldText>
        </Flex>
        <Flex justify="space-between" align="center">
          <FieldText>Methodology</FieldText>
          <FieldAnchor href={methodologyLink || ""} target="_blank">
            {methodologyName}
          </FieldAnchor>
        </Flex>
        <Flex justify="space-between" align="center">
          <FieldText>Model</FieldText>
          <FieldText>{model}</FieldText>
        </Flex>
        <Flex justify="space-between" align="center">
          <FieldText>Version</FieldText>
          <FieldText>{version}</FieldText>
        </Flex>
        <Flex justify="space-between" align="center">
          <FieldText>Claims Processed</FieldText>
          <FieldText>{claimsProcessed}</FieldText>
        </Flex>
      </Flex>
    </Flex>
  );
}
