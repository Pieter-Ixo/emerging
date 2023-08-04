import { Grid, Stack, Title } from "@mantine/core";
import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  selectCollections,
  selectTotalCollectionEntitiesToken,
} from "@/redux/entityCollections/selectors";
import useValueFromRouter from "@/utils/useValueFromRouter";

import {
  fetchAndFillCollections,
  fetchTotalCollectionEntities,
} from "@/redux/entityCollections/thunks";
import GlobalPortfolioSwitch from "@/components/HeaderControls";

import CollectionsLayout from "../components/Layout";
import PageHeader from "../components/PageHeader";
import CollectionAssetsCard from "./components/CollectionAssetsCard";
import CollectionClimateImpactsCard from "./components/CollectionClimateImpactsCard";
import CollectionNewsCard from "./components/CollectionNewsCard";
import CollectionPerformanceCard from "./components/CollectionPerformanceCard";

export default function Collection() {
  const collectionId = useValueFromRouter("collectionId");
  const dispatch = useAppDispatch();
  const collections = useAppSelector(selectCollections);
  const totalCollectionEntitiesTokens = useAppSelector(
    selectTotalCollectionEntitiesToken
  );

  useEffect(() => {
    if (collectionId) {
      dispatch(fetchTotalCollectionEntities(collectionId));
    }
  }, [collectionId]);

  useEffect(() => {
    dispatch(fetchAndFillCollections());
  }, []);

  return (
    <CollectionsLayout>
      <PageHeader>
        <GlobalPortfolioSwitch selectedLink="global" />
        <Title order={1} fw={300} size="40px" color="#9A9A9A">
          Collections
        </Title>
        <Title order={1} fw={300} size="40px">
          {collections?.[0]?._profile?.brand || "Collection"}
        </Title>
      </PageHeader>

      <Grid gutter="xl" p={0} m={0} sx={{ width: "100%" }}>
        <Grid.Col span={8} p={0} pr={20}>
          <Stack spacing="lg">
            <CollectionClimateImpactsCard
              totalCollectionEntitiesTokens={totalCollectionEntitiesTokens}
            />
            <CollectionPerformanceCard />
          </Stack>
        </Grid.Col>

        <Grid.Col span={4} p={0}>
          <Stack spacing="lg">
            <CollectionNewsCard />
            <CollectionAssetsCard />
          </Stack>
        </Grid.Col>
      </Grid>
    </CollectionsLayout>
  );
}
