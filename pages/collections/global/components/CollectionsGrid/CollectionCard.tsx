import { Box, Text, Paper } from "@mantine/core";

import styles from "@/styles/pages/collections/CollectionCard.module.scss";
import { ICollectionExtended } from "@/types/entityCollections";

type Props = { collection: ICollectionExtended };

export default function CollectionCard({ collection }: Props) {
  return (
    <Paper shadow="md" radius="md" p="md" m='lg' withBorder>
      <Box className={styles.CollectionCard}>
        <Text>I&apos;m a collection</Text>
        <Text>{collection._profile?.brand}</Text>
        <Text>{collection._profile?.name}</Text>
      </Box>
    </Paper>
  );
}
