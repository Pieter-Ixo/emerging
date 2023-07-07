import { Flex } from "@mantine/core";

import { FieldText, FieldsGroupTitle } from "../styledComponents";

type Props = {
  name?: string;
  developer?: string;
  country?: string;
  impactProducer?: string;
  emissionsAvoided?: string;
};

export default function Project({
  name,
  developer,
  country,
  impactProducer,
  emissionsAvoided,
}: Props) {
  return (
    <Flex direction="column">
      <FieldsGroupTitle icon="/images/icon-projects.svg">
        Project
      </FieldsGroupTitle>

      <Flex direction="column" gap="md">
        <Flex justify="space-between" align="center">
          <FieldText>Name</FieldText>
          <FieldText>{name}</FieldText>
        </Flex>
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
