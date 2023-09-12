import { Flex } from "@mantine/core";

import { FieldText, FieldsGroupTitle } from "../styledComponents";

import { AssetAttributesProps } from "./props";
import AssetName from "./Asset";

export default function Outcome({
  entityProfile,
  deviceCredSubject,
}: AssetAttributesProps) {
  const attributes = entityProfile?.attributes.map((attr) =>
    attr.key === "Product" ? { key: "Impact Credits", value: "CARBON" } : attr
  );

  return (
    <Flex direction="column">
      <FieldsGroupTitle icon="/images/icon-young-tree.svg">
        ASSET ATTRIBUTES
      </FieldsGroupTitle>

      <Flex direction="column" gap="md">
        <AssetName
          deviceCredSubject={deviceCredSubject}
          entityProfile={entityProfile}
        />
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
