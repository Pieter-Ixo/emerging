import { Button, Flex, Group, Text, Progress, Box } from "@mantine/core";

import useDetailPortal from "@/hooks/useDetailPortal";
import ProfileCard from "@/components/ProfileCard";

import { FieldText } from "../styledComponents";
import { ImpactAssetProps } from "./props";

export default function Identifier({ entity }: ImpactAssetProps) {
  const { isVisible, openPortal, closePortal } = useDetailPortal("Identifier");
  const label = entity?.alsoKnownAs.split("}")[1];

  const PortalChild = (
    <ProfileCard
      entity={entity}
      measure={
        <Box>
          <Progress value={55} mt="xl" />
          <Group spacing="4px" pt="xs">
            <Text>{(1600).toLocaleString()}</Text>
            <Text color="dimmed" size="12px">
              clean cookstoves disctributed
            </Text>
          </Group>
        </Box>
      }
    />
  );

  return (
    <Flex justify="space-between" align="center">
      <FieldText>Identifier</FieldText>
      <Button
        compact
        size="xs"
        radius="xl"
        onClick={() => (isVisible ? closePortal() : openPortal(PortalChild))}
        variant={isVisible ? "outline" : "subtle"}
      >
        {label}
      </Button>
    </Flex>
  );
}
