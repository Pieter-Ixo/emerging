import { Card, Text, Badge, Image, Flex } from "@mantine/core";
import { palette } from "@/theme/palette";
import { ICollectionExtended } from "@/types/entityCollections";

type CollectionsItemProps = {
  id: string;
  collection: ICollectionExtended;
  entitiesLength?: number;
  activeCardId: string | null;
  toggleCard: Function;
};

export default function CollectionsItem({
  id,
  collection,
  entitiesLength,
  activeCardId,
  toggleCard,
}: CollectionsItemProps) {
  const isCardActive = () => activeCardId === id;

  const activeCardBg = () =>
    isCardActive() ? palette.fullBlue : palette.Neutral100;

  const activeCardFont = () => (isCardActive() ? palette.White : palette.Black);

  // TODO: emit active card id, and handle it inside collectionsList
  // (setCardActive exists, in case we want to add something, to handle entity section on open)

  function setCardActive(cardId: string) {
    toggleCard(cardId);
  }

  return (
    <Card
      onClick={() => setCardActive(id)}
      padding="none"
      sx={{ fontSize: "", color: activeCardFont() }}
      radius={16}
    >
      <Card.Section>
        <Image
          src={collection._profile?.imageUrl}
          height={150}
          width={240}
          alt="Norway"
        />
      </Card.Section>

      <Flex gap="md" justify="space-between" p={12} bg={activeCardBg()}>
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
              {collection._profile?.location}
            </Badge>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
}
