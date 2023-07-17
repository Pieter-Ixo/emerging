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
} from "@mantine/core";

import { palette } from "@/theme/palette";
import {
  ICollectionExtended,
  IEntityExtended,
} from "@/types/entityCollections";
import dateLocale from "@/utils/dateLocale";
import getEntityTagsByCategory from "@/helpers/transformData/getEntityTagsByCategory";

export default function ProfileCard({
  entity,
  measure,
  tags: argumentTags,
}: {
  entity?: IEntityExtended | ICollectionExtended;
  measure?: ReactNode;
  tags?: string[];
}) {
  const tags = argumentTags || getEntityTagsByCategory(entity, "Asset Type");

  const startDate = dateLocale(entity?.metadata.created);
  const price = entity?._profile?.metrics[0];

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image src={entity?._profile?.imageUrl} height={160} alt="" />
      </Card.Section>

      <Flex direction="row" justify="space-between" pt="xs">
        {tags && (
          <Group spacing="4px">
            {tags.map((tag) =>
              tag ? (
                <Badge key={tag} bg={palette.redDark} variant="filled">
                  {tag}
                </Badge>
              ) : null
            )}
          </Group>
        )}
        <Avatar src={entity?._profile?.logoUrl} alt="" radius="xl" />
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
        {price && (
          <Text color="dimmed" size="12px" lh="100%">
            {`${price?.prefix} ${price?.metric}`}
          </Text>
        )}
      </Flex>
    </Card>
  );
}
