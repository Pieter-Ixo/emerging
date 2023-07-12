import { ReactNode } from "react";
import {
  Badge,
  Card,
  Flex,
  Group,
  Text,
  Image,
  Avatar,
  Title,
  Tooltip,
} from "@mantine/core";

import { palette } from "@/theme/palette";
import {
  ICollectionExtended,
  IEntityExtended,
} from "@/types/entityCollections";

export default function ProfileCard({
  entity,
  measure,
}: {
  entity?: IEntityExtended | ICollectionExtended;
  measure?: ReactNode;
}) {
  const tags = entity?._tags?.entityTags.find(
    (t) => t.category === "Asset Type"
  )?.tags;
  const startDate = entity?.metadata.created
    ? new Date(entity?.metadata.created).toLocaleDateString()
    : entity?.metadata.created;

  return (
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
      <Text color="dimmed" size="12px" lh="100%" mb="50px">
        {entity?._profile?.name}
      </Text>
      {measure || null}
      <Flex mt="md" direction="row" justify="space-between">
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
}
