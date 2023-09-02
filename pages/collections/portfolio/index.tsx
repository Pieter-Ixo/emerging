import { useEffect, useState } from "react";
import { Box, Container, Loader, Text, Title } from "@mantine/core";
import dynamic from "next/dynamic";
import { Carousel } from "@mantine/carousel";

import { useAppSelector } from "@/hooks/redux";
import {
  selectAllEntities,
  selectIsEntityCollectionsLoading,
  selectUserEntityCollections,
} from "@/redux/entityCollections/selectors";
import { palette } from "@/theme/palette";
import { ICollectionEntities } from "@/types/entityCollections";
import GlobalPortfolioSwitch from "@/components/Layout/GlobalPortfolioSwitch";
import AppLayout from "@/components/Layout/AppLayout";
import PageHeader from "@/components/Pages/Collections/PageHeader";
import { ContentViewMods } from "@/types";
import Controls from "@/components/Containers/Controls";

const CollectionsItem = dynamic(
  () => import("@/components/Pages/Collections/Portfolio/CollectionsItem")
);
const EntitiesList = dynamic(
  () => import("@/components/Pages/Collections/Portfolio/EntitiesList")
);

export default function Collections() {
  const [activeCardId, setActiveCardId] = useState<string>();
  const [activeEntityCollection, setActiveEntityCollection] =
    useState<ICollectionEntities>();

  const userEntityCollections = useAppSelector(selectUserEntityCollections);
  const entitiesArrayLength = useAppSelector(selectAllEntities)?.length;
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

    /** We need 2 dependencies here because when activeCardId is chosen, the find function will be called,
     * then we pass activeCollection to EntitiesList. Inside EntitiesList, the useEffect activates
     * fillUserCollectionEntities, and after userEntityCollection is filled, we need to call find again
     * so that now activeCollection will be re-rendered and set to the filled collection instead of the previous one.
     */
  }, [activeCardId, userEntityCollections]);

  return (
    <AppLayout title="Emergency Portfolio">
      <PageHeader>
        <GlobalPortfolioSwitch selectedLink="portfolio" />
        <Title order={2} fw={300}>
          My Portfolio
        </Title>
      </PageHeader>
      <Container fluid bg="white" sx={{ borderRadius: 16 }} p="xl" m={0}>
        <Box mb={28} sx={{ borderBottom: `1px solid ${palette.Black}` }}>
          <Text size="md">MY ASSETS</Text>
        </Box>
        {/* FIXME: EMERGING-177 implement search, filtering, view mods */}
        <Controls
          activeViewMode={ContentViewMods.gridView}
          toggleViewMode={() => null}
        />
        <Carousel
          mih={223}
          slideGap="xl"
          loop
          slideSize="270px"
          py={20}
          align="start"
        >
          {userEntityCollections?.map(({ collection, entities }) => (
            <Carousel.Slide
              key={collection.id}
              onClick={() => onCollectionCardClick(collection.id)}
            >
              <CollectionsItem
                collectionId={collection.id}
                isActive={collection.id === activeCardId}
                entitiesLength={entities.length}
              />
            </Carousel.Slide>
          ))}
        </Carousel>
        <Box mb={28} sx={{ borderBottom: `1px solid ${palette.Neutral500}` }} />
        {isEntityCollectionsLoading && <Loader w="100%" mx="auto" />}
        {activeEntityCollection && (
          <EntitiesList
            activeEntityCollection={activeEntityCollection}
            totalAssets={entitiesArrayLength}
          />
        )}
      </Container>
    </AppLayout>
  );
}
