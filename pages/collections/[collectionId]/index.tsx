import { Grid, Stack, Title } from "@mantine/core";
import dynamic from "next/dynamic";
import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  selectCollectionById,
  selectEntitiesByCollectionId,
  selectTotalCollectionEntitiesToken,
} from "@/redux/entityCollections/selectors";
import useValueFromRouter from "@/utils/useValueFromRouter";

import {
  fetchAndFillCollectionById,
  fetchCollectionEntityBatchesTotalByAdminAccount,
  fetchTotalCollectionEntities,
} from "@/redux/entityCollections/thunks";

import GlobalPortfolioSwitch from "@/components/Layout/GlobalPortfolioSwitch";

import AppLayout from "@/components/Layout/AppLayout";
import PageHeader from "@/components/Pages/Collections/PageHeader";
import { palette } from "@/theme/palette";
import Link from "next/link";

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
  const collection = useAppSelector((state) =>
    selectCollectionById(state, collectionId)
  );
  const collectionEntities = useAppSelector((state) =>
    selectEntitiesByCollectionId(state, collectionId)
  );
  const totalCollectionEntitiesTokens = useAppSelector(
    selectTotalCollectionEntitiesToken
  );

  useEffect(() => {
    if (collectionId) {
      dispatch(fetchAndFillCollectionById(collectionId));
      dispatch(fetchTotalCollectionEntities(collectionId));
    }
  }, [collectionId]);

  useEffect(() => {
    if (collectionId && collectionEntities?.length) {
      dispatch(
        fetchCollectionEntityBatchesTotalByAdminAccount({
          entities: collectionEntities,
          collectionId,
        })
      );
    }
  }, [collection]);

  const collectionDateYear = collection?.startDate.split("-")[0];
  const collectionTitle = `${collection?._profile?.brand} - ${collection?._profile?.name} ${collectionDateYear}`;

  return (
    <AppLayout title="Impacts">
      <PageHeader>
        <GlobalPortfolioSwitch selectedLink="global" />
        <Link href="/collections">
          <Title order={2} fw={300} color={palette.Neutral800}>
            Collections
          </Title>
        </Link>
        <Title order={2} fw={300}>
          {collection ? collectionTitle : "Collection"}
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
