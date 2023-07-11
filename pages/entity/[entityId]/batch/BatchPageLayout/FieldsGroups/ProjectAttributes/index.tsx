import { Flex } from "@mantine/core";

import { FieldText, FieldsGroupTitle } from "../styledComponents";

import { ProjectAttributesProps } from "./props";
import ProjectName from "./ProjectName";

export default function ProjectAttributes({
  entityProfile,
  deviceCredSubject,
}: ProjectAttributesProps) {
  const attributes = entityProfile?.attributes;

  return (
    <Flex direction="column">
      <FieldsGroupTitle icon="/images/icon-leaf-solid.svg">
        Project
      </FieldsGroupTitle>

      <Flex direction="column" gap="md">
        <ProjectName
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
