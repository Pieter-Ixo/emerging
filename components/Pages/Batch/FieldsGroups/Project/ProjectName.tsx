import {
  Image,
  Button,
  Card,
  Flex,
  Avatar,
  Title,
  Text,
  Progress,
  Badge,
  Group,
  Tooltip,
} from "@mantine/core";

import useDetailPortal from "@/hooks/useDetailPortal";
import { palette } from "@/theme/palette";

import { ProjectProps } from "./props";
import { FieldText } from "../styledComponents";

export default function ProjectName({ projectName, profile }: ProjectProps) {
  const { isVisible, openPortal, closePortal } = useDetailPortal("ProjectName");

  const PortalChild = (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image src={profile?.imageUrl} height={160} alt="" />
      </Card.Section>
      <Flex direction="row" justify="space-between">
        <Group spacing="4px">
          <Badge bg={palette.redDark} variant="filled">
            Inventory
          </Badge>
          <Badge bg={palette.orangeFull} variant="filled">
            CARBON
          </Badge>
        </Group>
        <Avatar src={profile?.logoUrl} alt="" />
      </Flex>
      <Title order={3} color="#01283B" fw={700} size="20px" lh="lg">
        {profile?.name}
      </Title>
      *<Progress color="green" radius="xl" value={70} />
      <Text color="dimmed" size="12px" lh="100%">
        *Distributed 1,600
      </Text>
      <Flex direction="row" justify="space-between" mt="lg">
        <Text color="dimmed" size="12px" lh="100%">
          *31/09/2022
        </Text>
        <Tooltip label="MOCKED VALUE">
          <Text color="dimmed" size="12px" lh="100%">
            ${(189.0).toLocaleString()}
          </Text>
        </Tooltip>
      </Flex>
    </Card>
  );

  return (
    <Flex justify="space-between" align="center">
      <FieldText>Name</FieldText>
      <Button
        compact
        size="xs"
        radius="xl"
        onClick={() => (isVisible ? closePortal() : openPortal(PortalChild))}
        variant={isVisible ? "outline" : "subtle"}
      >
        {projectName}
      </Button>
    </Flex>
  );
}
