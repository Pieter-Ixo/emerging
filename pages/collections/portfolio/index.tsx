import { useContext, useEffect, useState } from "react";
import {
  ActionIcon,
  Badge,
  Box,
  Container,
  Flex,
  Grid,
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
  selectIsEntityCollectionsLoading,
  selectUserEntityCollections,
} from "@/redux/entityCollections/selectors";
import { WalletContext } from "@/context/wallet";

import { palette } from "@/theme/palette";
import ProfileCard from "@/components/ProfileCard";
import ProgressBar from "@/components/progress-bar/ProgressBar";
import { getEntityTotalMintedAmount } from "@/helpers/transformData/getTotalMintedAmount";

import CollectionsLayout from "../components/Layout";
import Header from "./components/Header";
import SearchIcon from "./components/icons/SearchIcon";
import CollectionIcon from "./components/icons/CollectionIcon";
import FilterIcon from "./components/icons/FilterIcon";
import TabsIcon from "./components/icons/TabsIcon";
import CollectionsItem from "./components/CollectionsItem";

export default function Collections() {
  const dispatch = useAppDispatch();

  const [isCollectionActive, setCollectionActive] = useState(false);
  const [isTabsActive, setTabsActive] = useState(false);
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  const userEntityCollections = useAppSelector(selectUserEntityCollections);
  const isLoading = useAppSelector(selectIsEntityCollectionsLoading);
  const activeEntityCollection = userEntityCollections[0];

  const { wallet } = useContext(WalletContext);

  const userAddress =
    "ixo1xwn45d6xhe3egcz3nqlfc2elpc3h6usy6yw3uk" || wallet.user?.address;

  useEffect(() => {
    if (userAddress) {
      dispatch(fetchCollectionsByOwnerAddres(userAddress));
    }
  }, [dispatch, userAddress]);

  function onCollectionCardClick(collectionId: string) {
    if (activeCardId === collectionId) {
      setActiveCardId(null);
    } else {
      setActiveCardId(collectionId);

      if (activeEntityCollection) {
        dispatch(fillEntitiesForUserCollections(activeEntityCollection));
      }
    }
  }

  const isLoaderVisible = isLoading && <Loader />;

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
        <Carousel
          slideGap="md"
          loop
          slideSize="27.333333%"
          py={20}
          align="start"
        >
          {userEntityCollections &&
            userEntityCollections.map(({ collection, entities }) => (
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
        <Grid gutter="lg">
          {activeEntityCollection?.entities &&
            activeEntityCollection.entities.map((entity) => (
              <Grid.Col key={entity.id} span={4}>
                <ProfileCard
                  entity={entity}
                  measure={
                    <Box>
                      <Badge
                        sx={{
                          background: palette.activeBlue,
                          textAlign: "center",
                          textTransform: "none",
                        }}
                        fw="400"
                        mb="xs"
                        radius="md"
                        variant="filled"
                      >
                        0 CARBON to issue
                      </Badge>
                      <ProgressBar
                        retired={(getEntityTotalMintedAmount(entity) || 0) / 2}
                        claimable={
                          (Number(
                            entity?._adminToken?.CARBON.tokens["123" || ""]
                              ?.minted
                          ) || 0) * 2
                        }
                        produced={getEntityTotalMintedAmount(entity)}
                        isAssetView={false}
                      />
                      <Flex gap={6} align="end" pt="xs">
                        <Text
                          c={palette.Black}
                          fw={700}
                          size="23px"
                          sx={{ lineHeight: 1.1 }}
                        >
                          {entity.alsoKnownAs.replace("{id}", "")}
                        </Text>
                        <Text color="dimmed" size="12px">
                          of {500}
                        </Text>
                      </Flex>
                    </Box>
                  }
                />
              </Grid.Col>
            ))}
        </Grid>
      </Container>
    </CollectionsLayout>
  );
}
