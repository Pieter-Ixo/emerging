import { ReactNode } from "react";
import { Badge, Card, Flex, Group, Text, Image, Title } from "@mantine/core";

import { palette } from "@/theme/palette";
import {
  ICollectionExtended,
  IEntityExtended,
} from "@/types/entityCollections";
import getEntityTagsByCategory from "@/helpers/transformData/getEntityTagsByCategory";

type Props = {
  entity?: IEntityExtended | ICollectionExtended;
  measure?: ReactNode;
  tags?: string[];
  isActive?: boolean;
};

export default function ProfileCard({
  entity,
  measure,
  tags: argumentTags,
  isActive,
}: Props) {
  const tags = argumentTags || getEntityTagsByCategory(entity, "Asset Type");

  const isTagEven = (index: number) => index % 2 === 0;

  return (
    <Card
      shadow="sm"
      padding="lg"
      radius="lg"
      withBorder
      sx={{
        outline: isActive ? `solid ${palette.accentActive}` : undefined,
      }}
      w={277}
      h={400}
      mx={0}
    >
      <Card.Section>
        <Image src={entity?._profile?.imageUrl} height={160} alt="" />
      </Card.Section>

      <Flex direction="row" justify="space-between" pt="xs">
        {tags && (
          <Group mb="xs" spacing="4px">
            {tags.map((tag, index) =>
              tag ? (
                <Badge
                  key={tag}
                  bg={isTagEven(index) ? palette.redDark : palette.orangeFull}
                  variant="filled"
                >
                  <Text size="xs">{tag}</Text>
                </Badge>
              ) : null
            )}
          </Group>
        )}
      </Flex>

      <Title order={4} color="#01283B" fw={500} lh="lg">
        {entity?._profile?.brand}
      </Title>
      <Text color="dimmed" size="xs" lh="100%" mb="10px">
        {entity?._profile?.name}
      </Text>
      {measure || null}
    </Card>
  );
}
