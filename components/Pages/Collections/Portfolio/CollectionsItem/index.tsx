import { Card, Text, Badge, Flex } from "@mantine/core";
import Image from "next/image";
import { useEffect } from "react";

import { palette } from "@/theme/palette";
import { ICollectionExtended } from "@/types/entityCollections";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { fetchCollectionTokenIpfs } from "@/redux/entityCollections/thunks";
import {
  selectCollectionTokenIpfsError,
  selectCollectionById,
} from "@/redux/entityCollections/selectors";

type CollectionsItemProps = {
  collectionId: ICollectionExtended["id"];
  entitiesLength?: number;
  isActive: boolean;
};

export default function CollectionsItem({
  collectionId,
  entitiesLength,
  isActive,
}: CollectionsItemProps) {
  const dispatch = useAppDispatch();

  const collection = useAppSelector((state) =>
    selectCollectionById(state, collectionId)
  );
  const collectionTokenIpfsError = useAppSelector(
    selectCollectionTokenIpfsError
  );

  useEffect(() => {
    if (collection && !collection?._tokenIpfs) {
      dispatch(fetchCollectionTokenIpfs(collection));
    }
  }, [collection?.id]);

  if (!collection) return null;

  const activeCardBg = isActive ? palette.accentActive : palette.Neutral100;
  const activeCardFont = isActive ? palette.White : palette.Black;

  const imageId = collection._profile?.imageUrl.split("/").at(-1);

  return (
    <Card padding="none" sx={{ color: activeCardFont }} radius={16}>
      <Card.Section>
        <Image
          src={`https://ipfs.io/ipfs/${imageId}`}
          width={250}
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
                {collectionTokenIpfsError
                  ? "Error"
                  : collection._tokenIpfs?.properties.denom}
              </Text>
            </Badge>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
}
