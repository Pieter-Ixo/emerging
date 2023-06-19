import { Box, Text, Paper, Image } from "@mantine/core";

import styles from "@/styles/pages/collections/CollectionCard.module.scss";
import { ICollectionExtended } from "@/types/entityCollections";

type Props = { collection: ICollectionExtended };

export default function CollectionCard({ collection }: Props) {
  if (collection._profile === undefined) return null;

  const { brand, name, imageUrl, logoUrl } = collection._profile;

  return (
    <Paper shadow="md" radius="md" p="md" m="lg" withBorder>
      <Box className={styles.CollectionCard}>
        <Text>I&apos;m a collection</Text>
        <Text>{brand}</Text>
        <Text>{name}</Text>
        {imageUrl && <Image src={imageUrl} alt="" />}
        {logoUrl && <Image src={logoUrl} alt="" />}
      </Box>
    </Paper>
  );
}
