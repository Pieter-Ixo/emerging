import { Flex } from "@mantine/core";

import { FieldText, FieldsGroupTitle } from "../styledComponents";

import { ProjectAttributesProps } from "./props";
import ProjectName from "./ProjectName";

export default function ProjectAttributes({
  projectProfile,
}: ProjectAttributesProps) {
  const attributes = projectProfile?.attributes;

  return (
    <Flex direction="column">
      <FieldsGroupTitle icon="/images/icon-projects.svg">
        Project
      </FieldsGroupTitle>

      <Flex direction="column" gap="md">
        <ProjectName projectProfile={projectProfile} />
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
