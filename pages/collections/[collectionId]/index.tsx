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

import GlobalPortfolioSwitch from "@/components/Layout/GlobalPortfolioSwitch";
import CollectionClimateImpactsCard from "@/components/Pages/Collections/CollectionDashboard/CollectionClimateImpactsCard";
import CollectionPerformanceCard from "@/components/Pages/Collections/CollectionDashboard/CollectionPerformanceCard";
import CollectionAssetsCard from "@/components/Pages/Collections/CollectionDashboard/CollectionAssetsCard";
import CollectionNewsCard from "@/components/Pages/Collections/CollectionDashboard/CollectionNewsCard";
import AppLayout from "@/components/Layout/AppLayout";
import PageHeader from "@/components/Pages/Collections/PageHeader";

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
    <AppLayout title="Emerging Collections">
      <PageHeader>
        <GlobalPortfolioSwitch selectedLink="global" />
        <Title order={1} fw={300} size="40px" color="#9A9A9A">
          Collections
        </Title>
        <Title order={1} fw={300} size="40px">
          {`${collections?.[0]?._profile?.brand} ${collections?.[0]?._profile?.name}` ||
            "Collection"}
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
    </AppLayout>
  );
}
