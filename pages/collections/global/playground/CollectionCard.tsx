import { useRouter } from "next/router";
import { useEffect } from "react";
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

import { palette } from "@/theme/palette";
import TagIcon from "@/components/Pages/Collections/Global/CollectionsGrid/TagIcon";

import { getEntityTagsFromTags } from "@/helpers/transformData/getEntityTagsByCategory";
import { ICollectionState } from "@/redux/globalCollections/types";
import fetchCollectionsProfile from "@/redux/globalCollections/thunks/fetchCollectionsProfile";
import fetchCollectionsTags from "@/redux/globalCollections/thunks/fetchCollectionsTags";

type Props = { collectionState: ICollectionState; entitiesLength: number };

export default function CollectionCard({
  collectionState,
  entitiesLength,
}: Props) {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { collection, profile, tags } = collectionState;
  const sdgTags = getEntityTagsFromTags(tags);
  const { brand, name, imageUrl, logoUrl } = profile || {};

  useEffect(() => {
    if (collection.id) {
      dispatch(fetchCollectionsProfile(collection.id));
      dispatch(fetchCollectionsTags(collection.id));
    }
  }, [collection.id]);


  useEffect(() => {
    if (collection.id) {
      dispatch(fetchCollectionsProfile(collection.id));
      dispatch(fetchCollectionsTags(collection.id));
    }
  }, [collection.id]);

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
            {sdgTags?.map((tagText) => (

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
                DENOM
              </Text>
            </Badge>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
}
