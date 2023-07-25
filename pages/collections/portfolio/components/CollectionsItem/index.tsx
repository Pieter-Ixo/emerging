import { Card, Text, Badge, Image, Flex } from "@mantine/core";
import { palette } from "@/theme/palette";
import { ICollectionExtended } from "@/types/entityCollections";

type CollectionsItemProps = {
  collection: ICollectionExtended;
  entitiesLength?: number;
  isActive: boolean;
};

export default function CollectionsItem({
  collection,
  entitiesLength,
  isActive,
}: CollectionsItemProps) {
  const activeCardBg = isActive ? palette.fullBlue : palette.Neutral100;

  const activeCardFont = isActive ? palette.White : palette.Black;

  return (
    <Card
      padding="none"
      sx={{ fontSize: "", color: activeCardFont }}
      radius={16}
    >
      <Card.Section>
        <Image src={collection._profile?.imageUrl} height={150} alt="Norway" />
      </Card.Section>

      <Flex gap="md" justify="space-between" p={12} bg={activeCardBg}>
        <Flex direction="column">
          <Text size="sm">{collection._profile?.brand}</Text>
          <Text size="sm">{collection._profile?.name}</Text>
        </Flex>
        <Flex align="end">
          <Flex align="center" gap={8}>
            <Text size="sm">{entitiesLength}</Text>
            <Badge
              sx={{ background: palette.greenFull }}
              radius="md"
              variant="filled"
            >
              {collection._tokenIpfs?.properties.denom}
            </Badge>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
}
