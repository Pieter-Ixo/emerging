import { Grid, Stack, Title } from "@mantine/core";
import dynamic from "next/dynamic";
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

import AppLayout from "@/components/Layout/AppLayout";
import PageHeader from "@/components/Pages/Collections/PageHeader";

const CollectionClimateImpactsCard = dynamic(
  () =>
    import(
      "@/components/Pages/Collections/CollectionDashboard/CollectionClimateImpactsCard"
    )
);
const CollectionAssetsCard = dynamic(
  () =>
    import(
      "@/components/Pages/Collections/CollectionDashboard/CollectionAssetsCard"
    )
);
const CollectionNewsCard = dynamic(
  () =>
    import(
      "@/components/Pages/Collections/CollectionDashboard/CollectionNewsCard"
    )
);
const CollectionPerformanceCard = dynamic(
  () =>
    import(
      "@/components/Pages/Collections/CollectionDashboard/CollectionPerformanceCard"
    )
);

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

  const collectionTitle =
    collections?.[0]?._profile?.brand || collections?.[0]?._profile?.name
      ? `${collections?.[0]?._profile?.brand} ${collections?.[0]?._profile?.name}`
      : "Collection";

  return (
    <AppLayout title="Emerging Collections">
      <PageHeader>
        <GlobalPortfolioSwitch selectedLink="global" />
        <Title order={2} fw={300} color="#9A9A9A">
          Collections
        </Title>
        <Title order={2} fw={300}>
          {collectionTitle}
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
