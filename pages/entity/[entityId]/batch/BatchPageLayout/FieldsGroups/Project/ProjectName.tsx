import {
  Image,
  Button,
  Card,
  Flex,
  Avatar,
  Title,
  Text,
  Progress,
} from "@mantine/core";

import useDetailPortal from "@/hooks/useDetailPortal";

import { ProjectProps } from "./props";
import { FieldText } from "../styledComponents";

export default function ProjectName({ projectName, profile }: ProjectProps) {
  const { isVisible, openPortal, closePortal } = useDetailPortal("ProjectName");

  const PortalChild = (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image src={profile?.imageUrl} height={160} alt="" />
      </Card.Section>
      <Flex direction="row" justify="space-between" align="center" pt="xs">
        <Title order={3} color="#01283B" fw={700} size="20px" lh="100%">
          {profile?.name}
        </Title>
        <Avatar src={profile?.logoUrl} alt="" />
      </Flex>
      <Text color="dimmed" size="12px" lh="100%">
        *Zambia Collection 2023
      </Text>
      *<Progress color="green" radius="xl" value={70} />
      <Text my="md" color="dimmed" size="12px" lh="100%">
        *Distributed 1,600
      </Text>
      <Text my="md" color="dimmed" size="12px" lh="100%">
        *Date (31/09/2022)
      </Text>
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
