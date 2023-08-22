import { Card, Text, Badge, Image, Flex, Center, Loader } from "@mantine/core";
import { useEffect } from "react";

import { palette } from "@/theme/palette";
import { ICollectionExtended } from "@/types/entityCollections";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { fetchCollectionTokenIpfs } from "@/redux/entityCollections/thunks";
import {
  selectCollectionTokenIpfsError,
  selectCollectionsTokensIpfs,
  selectCollectionsTokensIpfsLoading,
} from "@/redux/entityCollections/selectors";

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
  const dispatch = useAppDispatch();

  const collectionTokenIpfs = useAppSelector((state) =>
    selectCollectionsTokensIpfs(state, collection.id)
  );
  const collectionTokenIpfsError = useAppSelector(
    selectCollectionTokenIpfsError
  );
  const collectionTokenIpfsLoading = useAppSelector(
    selectCollectionsTokensIpfsLoading
  );

  useEffect(() => {
    if (!collection._tokenIpfs) dispatch(fetchCollectionTokenIpfs(collection));
  }, [collection.id]);

  const activeCardBg = isActive ? palette.fullBlue : palette.Neutral100;

  const activeCardFont = isActive ? palette.White : palette.Black;

  if (collectionTokenIpfsLoading) {
    return (
      <Center w="100%" mih={223}>
        <Loader />
      </Center>
    );
  }
  
  if (collectionTokenIpfsError) {
    return (
      <Center w="100%" mih={223}>
        <Text size="md" color={palette.redFull}>
          {collectionTokenIpfsError}
        </Text>
      </Center>
    );
  }

  return (
    <Card padding="none" sx={{ color: activeCardFont }} radius={16}>
      <Card.Section>
        <Image
          src={collection._profile?.imageUrl}
          height={150}
          alt="Collection's asset item"
        />
      </Card.Section>

      <Flex gap="md" justify="space-between" p={12} bg={activeCardBg}>
        <Flex direction="column">
          <Text size="md">{collection._profile?.brand}</Text>
          <Text size="md">{collection._profile?.name}</Text>
        </Flex>
        <Flex align="end">
          <Flex align="center" gap={8}>
            <Text size="md">{entitiesLength}</Text>
            <Badge
              sx={{ background: palette.greenFull }}
              radius="md"
              variant="filled"
            >
              <Text size="md" fw={500}>
                {collectionTokenIpfs?.properties.denom}
              </Text>
            </Badge>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
}
