import { useEffect, useState } from "react";
import { Box, Container, Loader, Text } from "@mantine/core";
import { Carousel } from "@mantine/carousel";

import { useAppSelector } from "@/hooks/redux";
import {
  selectEntityCollections,
  selectIsEntityCollectionsLoading,
  selectUserEntityCollections,
} from "@/redux/entityCollections/selectors";

import { palette } from "@/theme/palette";
import { ICollectionEntities } from "@/types/entityCollections";

import CollectionsLayout from "../components/Layout";
import Header from "./components/Header";
import CollectionsItem from "./components/CollectionsItem";
import EntitiesList from "./components/EntitiesList";
import Controls from "./components/Controls";

export default function Collections() {
  const [activeCardId, setActiveCardId] = useState<string>();
  const [activeEntityCollection, setActiveEntityCollection] =
    useState<ICollectionEntities>();

  const userEntityCollections = useAppSelector(selectUserEntityCollections);
  const entityCollections = useAppSelector(selectEntityCollections);
  const isEntityCollectionsLoading = useAppSelector(
    selectIsEntityCollectionsLoading
  );

  function findActiveCollectionEntitiesById(collectionId: string) {
    return userEntityCollections.find(
      (collectionWithEntities: ICollectionEntities) =>
        collectionWithEntities.collection.id === collectionId
    );
  }

  function onCollectionCardClick(collectionId: string) {
    if (activeCardId === collectionId) {
      setActiveCardId(undefined);
      setActiveEntityCollection(undefined);
    } else {
      setActiveCardId(collectionId);
    }
  }

  useEffect(() => {
    if (activeCardId) {
      setActiveEntityCollection(findActiveCollectionEntitiesById(activeCardId));
    }
  }, [activeCardId]);

  const totalAssets = entityCollections?.entityCollections[0]?.entities.length;

  return (
    <CollectionsLayout>
      <Header />
      <Container fluid bg="white" p="xl" mx={0} sx={{ borderRadius: 16 }}>
        <Box mb={28} sx={{ borderBottom: `1px solid ${palette.Black}` }}>
          <Text>MY ASSETS</Text>
        </Box>
        <Controls />
        <Carousel
          slideGap="md"
          loop
          slideSize="27.333333%"
          py={20}
          align="start"
        >
          {userEntityCollections?.map(({ collection, entities }) => (
            <Carousel.Slide
              key={collection.id}
              onClick={() => onCollectionCardClick(collection.id)}
            >
              <CollectionsItem
                collection={collection}
                isActive={collection.id === activeCardId}
                entitiesLength={entities.length}
              />
            </Carousel.Slide>
          ))}
        </Carousel>
        <Box mb={28} sx={{ borderBottom: `1px solid ${palette.Neutral500}` }} />

        {isEntityCollectionsLoading && <Loader w="100%" mx="auto" />}

        <EntitiesList
          entities={activeEntityCollection?.entities}
          totalAssets={totalAssets}
        />
      </Container>
    </CollectionsLayout>
  );
}
