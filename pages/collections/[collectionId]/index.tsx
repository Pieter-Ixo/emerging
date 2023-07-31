import { Grid, Stack } from "@mantine/core";
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

import CollectionsLayout from "../components/Layout";
import PageHeader from "./components/Header";
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
      <PageHeader collectionName={collections?.[0]?._profile?.brand} />
      <Grid gutter="xl" sx={{ width: "100%", padding: 16, margin: 0 }}>
        <Grid.Col span={8}>
          <Stack spacing="lg">
            <CollectionClimateImpactsCard
              totalCollectionEntitiesTokens={totalCollectionEntitiesTokens}
            />
            <CollectionPerformanceCard />
          </Stack>
        </Grid.Col>

        <Grid.Col span={4}>
          <Stack spacing="lg">
            <CollectionNewsCard />
            <CollectionAssetsCard />
          </Stack>
        </Grid.Col>
      </Grid>
    </CollectionsLayout>
  );
}
