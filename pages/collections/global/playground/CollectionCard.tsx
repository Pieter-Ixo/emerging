import { useRouter } from "next/router";
import {
  Box,
  Text,
  Avatar,
  Flex,
  Card,
  BackgroundImage,
  Badge,
} from "@mantine/core";

import { useAppDispatch } from "@/hooks/redux";
import { ICollectionExtended } from "@/types/entityCollections";
import getEntityTagsByCategory from "@/helpers/transformData/getEntityTagsByCategory";
import { palette } from "@/theme/palette";
import TagIcon from "@/components/Pages/Collections/Global/CollectionsGrid/TagIcon";

type Props = { collection: ICollectionExtended; entitiesLength: number };

export default function CollectionCard({ collection, entitiesLength }: Props) {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const collectionTokenIpfs = collection._tokenIpfs;

  const brand = collection._profile?.brand;
  const name = collection._profile?.name;
  const imageUrl = collection._profile?.imageUrl;
  const logoUrl = collection._profile?.logoUrl;

  const tags = getEntityTagsByCategory(collection, "SDG") ?? [];

  const badgeTitle = collectionTokenIpfs?.properties.denom;

  return (
    <Card
      onClick={() => router.push(`/collections/${collection.id}`)}
      sx={{ cursor: "pointer" }}
      maw="400px"
      mih="260px"
      padding={0}
      radius="lg"
    >
      <Card.Section>
        <BackgroundImage src={imageUrl || ""} mih={250}>
          <Flex justify="flex-end" align="flex-start" gap="sm" p="md">
            {tags.map((tagText) => (
              <TagIcon name={tagText} key={tagText} />
            ))}
          </Flex>
        </BackgroundImage>
      </Card.Section>
      <Flex gap="md" justify="space-between" p="sm" bg={palette.Neutral200}>
        <Box>
          <Text>{brand}</Text>
          <Text>{name}</Text>
        </Box>
        <Flex align="end" pos="relative">
          <Avatar
            pos="absolute"
            top="-60%"
            left="40%"
            src={logoUrl || ""}
            alt="Collection Logotype"
            bg={palette.White}
            radius="50%"
          />
          <Flex align="center" gap={8}>
            <Text size="md">{entitiesLength || 0}</Text>
            <Badge
              sx={{ background: palette.greenFull }}
              radius="md"
              variant="filled"
            >
              <Text size="md" fw={500}>
                {badgeTitle}
              </Text>
            </Badge>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
}
