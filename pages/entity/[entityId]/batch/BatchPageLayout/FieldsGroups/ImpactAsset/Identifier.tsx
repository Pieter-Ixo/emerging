import {
  Badge,
  Button,
  Card,
  Flex,
  Group,
  Text,
  Image,
  Avatar,
  Title,
  Tooltip,
  Progress,
  Box,
} from "@mantine/core";

import { palette } from "@/theme/palette";
import useDetailPortal from "@/hooks/useDetailPortal";

import { FieldText } from "../styledComponents";
import { ImpactAssetProps } from "./props";

export default function Identifier({ entity }: ImpactAssetProps) {
  const { isVisible, openPortal, closePortal } = useDetailPortal("Identifier");
  const label = entity?.alsoKnownAs;
  const tags = entity?._tags?.entityTags.find(
    (t) => t.category === "Asset Type"
  )?.tags;

  const startDate = entity?.metadata.created
    ? new Date(entity?.metadata.created).toLocaleDateString()
    : entity?.metadata.created;

  const PortalChild = (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image src={entity?._profile?.imageUrl} height={160} alt="" />
      </Card.Section>

      <Flex direction="row" justify="space-between">
        {tags && (
          <Group spacing="4px">
            {tags.map((tag) => (
              <Badge key={tag} bg={palette.redDark} variant="filled">
                {tag}
              </Badge>
            ))}
          </Group>
        )}
        <Avatar src={entity?._profile?.logoUrl} alt="" />
      </Flex>

      <Title order={3} color="#01283B" fw={700} size="20px" lh="lg">
        {entity?._profile?.brand}
      </Title>
      <Text color="dimmed" size="12px" lh="100%">
        {entity?._profile?.name}
      </Text>
      <Box>
        <Progress value={55} mt="xl" />
        <Group spacing="4px" pt="xs">
          <Text>{(1600).toLocaleString()}</Text>
          <Text color="dimmed" size="12px">
            clean cookstoves disctributed
          </Text>
        </Group>
      </Box>
      <Flex direction="row" justify="space-between" mt="lg">
        <Text color="dimmed" size="12px" lh="100%">
          {startDate}
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
