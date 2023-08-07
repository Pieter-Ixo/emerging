import { useRouter } from "next/router";
import { Box, Text, Avatar, BackgroundImage, Title, Flex } from "@mantine/core";

import { ICollectionExtended } from "@/types/entityCollections";
import getEntityTagsByCategory from "@/helpers/transformData/getEntityTagsByCategory";

import TagIcon from "./TagIcon";

type Props = { collection: ICollectionExtended };

export default function CollectionCard({ collection }: Props) {
  const router = useRouter();
  if (!collection?._profile) return null;

  const { brand, name, imageUrl, logoUrl } = collection._profile;

  const tags = getEntityTagsByCategory(collection, "SDG") ?? [];

  return (
    <BackgroundImage
      src={imageUrl || ""}
      sx={{ cursor: "pointer" }}
      p="md"
      maw="400px"
      mih="260px"
      radius="lg"
      onClick={() => router.push(`/collections/${collection.id}`)}
    >
      <Flex direction="column" mih="inherit" justify="space-between">
        <Flex justify="flex-end" align="flex-start" gap="10px">
          {tags.map((tagText) => (
            <TagIcon name={tagText} key={tagText} />
          ))}
        </Flex>
        <Flex justify="space-between" align="flex-end">
          <Box>
            <Title
              order={3}
              c="white"
              weight={700}
              size="24px"
              fs="normal"
              mb="6px"
            >
              {brand}
            </Title>
            <Text c="white" weight={500} size="14px" fs="normal">
              {name}
            </Text>
          </Box>
          <Avatar
            src={logoUrl || ""}
            alt="Collection Logotype"
            bg="white"
            radius="50%"
          />
        </Flex>
      </Flex>
    </BackgroundImage>
  );
}
