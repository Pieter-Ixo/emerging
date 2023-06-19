import { Box, Text, Avatar, BackgroundImage, Title, Flex } from "@mantine/core";

import styles from "@/styles/pages/collections/CollectionCard.module.scss";
import { ICollectionExtended } from "@/types/entityCollections";

type Props = { collection: ICollectionExtended };

export default function CollectionCard({ collection }: Props) {
  if (!collection?._profile) return null;

  const { brand, name, imageUrl, logoUrl } = collection._profile;

  return (
    <Box className={styles.CollectionCard} m="lg">
      <BackgroundImage src={imageUrl || ""} p="md" mih="260px" radius="lg">
        <Flex justify="space-between" align="flex-end" mih="inherit">
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
      </BackgroundImage>
    </Box>
  );
}
