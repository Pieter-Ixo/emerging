import { useEffect, useState } from "react";
import { Box, Container, Loader, Text, Title } from "@mantine/core";
import { Carousel } from "@mantine/carousel";

import { useAppSelector } from "@/hooks/redux";
import {
  selectEntityCollections,
  selectIsEntityCollectionsLoading,
  selectUserEntityCollections,
} from "@/redux/entityCollections/selectors";

import { palette } from "@/theme/palette";
import { ICollectionEntities } from "@/types/entityCollections";
import GlobalPortfolioSwitch from "@/components/Layout/GlobalPortfolioSwitch";
import CollectionsLayout from "@/components/Pages/Collections/CollectionsLayout";
import PageHeader from "@/components/Pages/Collections/PageHeader";

import CollectionsItem from "@/components/Pages/Collections/Portfolio/CollectionsItem";
import Controls from "@/components/Pages/Collections/Portfolio/Controls";
import EntitiesList from "@/components/Pages/Collections/Portfolio/EntitiesList";

export default function Collections() {
  const [activeCardId, setActiveCardId] = useState<string>();
  const [activeEntityCollection, setActiveEntityCollection] =
    useState<ICollectionEntities>();

  const userEntityCollections = useAppSelector(selectUserEntityCollections);
  const entityCollections = useAppSelector(selectEntityCollections);
  const isEntityCollectionsLoading = useAppSelector(
    selectIsEntityCollectionsLoading
  );

  function onCollectionCardClick(collectionId: string) {
    if (activeCardId === collectionId) {
      setActiveCardId(undefined);
      setActiveEntityCollection(undefined);
    } else {
      setActiveCardId(collectionId);
    }
  }

  useEffect(() => {
    setActiveEntityCollection(
      userEntityCollections.find(
        (collectionWithEntities: ICollectionEntities) =>
          collectionWithEntities.collection.id === activeCardId
      )
    );

    // We need 2 dependencies here because when activeCardId is chosen, the find function will be called,
    // then we pass activeCollection to EntitiesList. Inside EntitiesList, the useEffect activates
    // fillUserCollectionEntities, and after userEntityCollection is filled, we need to call find again
    // so that now activeCollection will be re-rendered and set to the filled collection instead of the previous one.
  }, [activeCardId, userEntityCollections]);

  const totalAssets = entityCollections?.entityCollections[0]?.entities.length;

  return (
    <CollectionsLayout>
      <PageHeader>
        <GlobalPortfolioSwitch selectedLink="portfolio" />
        <Title order={1} fw={300} size="40px">
          My Portfolio
        </Title>
      </PageHeader>
      <Container fluid bg="white" sx={{ borderRadius: 16 }} p="xl" m={0}>
        <Box mb={28} sx={{ borderBottom: `1px solid ${palette.Black}` }}>
          <Text>MY ASSETS</Text>
        </Box>
        <Controls />
        <Carousel slideGap="xl" loop slideSize="250px" py={20} align="start">
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

        {isEntityCollectionsLoading ? (
          <Loader w="100%" mx="auto" />
        ) : (
          <EntitiesList
            activeEntityCollection={activeEntityCollection}
            totalAssets={totalAssets}
          />
        )}
      </Container>
    </CollectionsLayout>
  );
}
