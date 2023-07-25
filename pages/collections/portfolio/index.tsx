import { useContext, useEffect, useState } from "react";
import {
  ActionIcon,
  Box,
  Container,
  Flex,
  Input,
  Loader,
  Text,
} from "@mantine/core";
import { Carousel } from "@mantine/carousel";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  fetchCollectionsByOwnerAddres,
  fillEntitiesForUserCollections,
} from "@/redux/entityCollections/thunks";
import {
  selectEntityCollections,
  selectIsEntityCollectionsLoading,
  selectUserEntityCollections,
} from "@/redux/entityCollections/selectors";
import { WalletContext } from "@/context/wallet";

import { palette } from "@/theme/palette";
import { ICollectionEntities } from "@/types/entityCollections";

import CollectionsLayout from "../components/Layout";
import Header from "./components/Header";
import SearchIcon from "./components/icons/SearchIcon";
import CollectionIcon from "./components/icons/CollectionIcon";
import FilterIcon from "./components/icons/FilterIcon";
import TabsIcon from "./components/icons/TabsIcon";
import CollectionsItem from "./components/CollectionsItem";
import EntitiesList from "./components/EntitiesList";
import Controls from "./components/Controls";

export default function Collections() {
  const dispatch = useAppDispatch();

  const [activeCardId, setActiveCardId] = useState<string | undefined>(
    undefined
  );

  const userEntityCollections = useAppSelector(selectUserEntityCollections);

  const entityCollections = useAppSelector(selectEntityCollections);

  const isLoading = useAppSelector(selectIsEntityCollectionsLoading);

  const [activeEntityCollection, setActiveEntityCollection] = useState<
    ICollectionEntities | undefined
  >();

  const { wallet } = useContext(WalletContext);

  const userAddress =
    "ixo1xwn45d6xhe3egcz3nqlfc2elpc3h6usy6yw3uk" || wallet.user?.address;

  useEffect(() => {
    if (userAddress) {
      dispatch(fetchCollectionsByOwnerAddres(userAddress));
    }
  }, [dispatch, userAddress]);

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

  useEffect(() => {
    if (activeEntityCollection) {
      dispatch(fillEntitiesForUserCollections(activeEntityCollection));
    }
  }, [activeEntityCollection, dispatch]);

  const isLoaderVisible = isLoading && <Loader />;

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
        {isLoaderVisible}

        <EntitiesList
          entities={activeEntityCollection?.entities}
          totalAssets={totalAssets}
        />
      </Container>
    </CollectionsLayout>
  );
}
