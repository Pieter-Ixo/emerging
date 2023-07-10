import { Flex } from "@mantine/core";

import { FieldText, FieldsGroupTitle } from "../styledComponents";
import { ProjectProps } from "./props";
import ProjectName from "./ProjectName";

export default function Project({
  projectName,
  profile,
  developer,
  country,
  impactProducer,
  emissionsAvoided,
}: ProjectProps) {
  return (
    <Flex direction="column">
      <FieldsGroupTitle icon="/images/icon-projects.svg">
        Project
      </FieldsGroupTitle>

      <Flex direction="column" gap="md">
        <ProjectName projectName={projectName} profile={profile} />
        <Flex justify="space-between" align="center">
          <FieldText>Developer</FieldText>
          <FieldText>{developer}</FieldText>
        </Flex>
        <Flex justify="space-between" align="center">
          <FieldText>Country</FieldText>
          <FieldText>{country}</FieldText>
        </Flex>
        <Flex justify="space-between" align="center">
          <FieldText>Impact Producers</FieldText>
          <FieldText>{impactProducer}</FieldText>
        </Flex>
        <Flex justify="space-between" align="center">
          <FieldText>Emissions Avoided</FieldText>
          <FieldText>{emissionsAvoided}</FieldText>
        </Flex>
      </Flex>
    </Flex>
  );
}
