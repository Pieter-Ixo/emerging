import { useContext, useEffect, useState } from "react";
import {
  ActionIcon,
  Box,
  Container,
  Flex,
  Grid,
  Input,
  Loader,
  ScrollArea,
  Text,
} from "@mantine/core";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  fetchCollectionsByOwnerAddres,
  fillEntitiesForUserCollections,
} from "@/redux/entityCollections/thunks";
import {
  selectIsEntityCollectionsLoading,
  selectUserEntityCollection,
} from "@/redux/entityCollections/selectors";
import { WalletContext } from "@/context/wallet";
import {
  ICollectionEntities,
  IEntityExtended,
} from "@/types/entityCollections";

import { palette } from "@/theme/palette";
import Identifier from "@/pages/entity/[entityId]/batch/BatchPageLayout/FieldsGroups/ImpactAsset/Identifier";
import CollectionsLayout from "../components/Layout";
import Header from "./components/Header";
import SearchIcon from "./components/icons/SearchIcon";
import CollectionIcon from "./components/icons/CollectionIcon";
import FilterIcon from "./components/icons/FilterIcon";
import TabsIcon from "./components/icons/TabsIcon";
import CollectionsItem from "./components/CollectionsItem";

export default function Collections() {
  const dispatch = useAppDispatch();
  const userEntityCollections = useAppSelector(selectUserEntityCollection);
  const isLoading = useAppSelector(selectIsEntityCollectionsLoading);
  const { wallet } = useContext(WalletContext);
  const userAddress =
    wallet.user?.address || "ixo1xwn45d6xhe3egcz3nqlfc2elpc3h6usy6yw3uk";

  useEffect(() => {
    if (userAddress) {
      dispatch(fetchCollectionsByOwnerAddres(userAddress));
    }
  }, [dispatch, userAddress]);

  function fillEntities(entityCollection: ICollectionEntities) {
    dispatch(fillEntitiesForUserCollections(entityCollection));
  }

  const isLoaderVisible = isLoading && <Loader />;

  const [isCollectionActive, setCollectionActive] = useState(false);
  const [isTabsActive, setTabsActive] = useState(false);

  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  const [selectedEntities, setSelectedEntities] = useState<
    IEntityExtended[] | null
  >(null);

  function findSelectedCollectionEntities() {
    const selectedCollection = userEntityCollections.find(
      ({ collection }) => collection.id === activeCardId
    );

    if (selectedCollection) {
      fillEntities(selectedCollection);
    }

    return selectedCollection ? selectedCollection.entities : null;
  }

  const handleCard = (cardId: string) => {
    if (activeCardId === cardId) {
      return setActiveCardId(null);
    }
    return setActiveCardId(cardId);
  };

  useEffect(() => {
    setSelectedEntities(findSelectedCollectionEntities());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCardId]);

  return (
    <CollectionsLayout>
      <Header />
      <Container fluid bg="white" p="xl" mx={0} sx={{ borderRadius: 16 }}>
        <Box mb={28} sx={{ borderBottom: `1px solid ${palette.Black}` }}>
          <Text>MY ASSETS</Text>
        </Box>
        <Flex gap={8}>
          <Input
            icon={<SearchIcon />}
            placeholder="search"
            size="md"
            variant="filled"
            radius="xl"
          />
          <ActionIcon
            size="xl"
            radius="xl"
            color="dark"
            variant="transparent"
            sx={{
              background: isCollectionActive
                ? palette.fullBlue
                : palette.Neutral200,
            }}
            onClick={() => setCollectionActive((prev) => !prev)}
          >
            <CollectionIcon
              fill="transparent"
              stroke={isCollectionActive ? palette.White : palette.Black}
            />
          </ActionIcon>
          <ActionIcon
            size="xl"
            radius="xl"
            color="dark"
            variant="transparent"
            sx={{
              background: isTabsActive ? palette.fullBlue : palette.Neutral200,
            }}
            onClick={() => setTabsActive((prev) => !prev)}
          >
            <TabsIcon fill={isTabsActive ? palette.White : palette.Black} />
          </ActionIcon>
          <ActionIcon
            size="xl"
            radius="xl"
            color="dark"
            variant="transparent"
            sx={{
              width: 100,
              background: palette.Neutral200,
            }}
          >
            <Flex gap={10}>
              <FilterIcon fill={palette.Black} />
              <Text>Filter</Text>
            </Flex>
          </ActionIcon>
        </Flex>
        {isLoaderVisible}
        <ScrollArea py={32} sx={{ width: "100%" }}>
          <Flex align="center" gap={24}>
            {userEntityCollections &&
              userEntityCollections.map(({ collection, entities }) => (
                <CollectionsItem
                  key={collection.id}
                  id={collection.id}
                  collection={collection}
                  activeCardId={activeCardId}
                  entitiesLength={entities.length}
                  toggleCard={handleCard}
                />
              ))}
          </Flex>
        </ScrollArea>
        <Box mb={28} sx={{ borderBottom: `1px solid ${palette.Neutral500}` }} />
        <Grid grow gutter="lg">
          {selectedEntities &&
            selectedEntities.map((entity) => (
              <Grid.Col key={entity.id} span={4}>
                {/* TODO: clarify how to show single card, instead of
                 identifier and portal */}
                <Identifier entity={entity} />
              </Grid.Col>
            ))}
        </Grid>
      </Container>
    </CollectionsLayout>
  );
}
