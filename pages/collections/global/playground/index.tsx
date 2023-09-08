import { Title, Grid, Loader, Alert } from "@mantine/core";
import { useEffect } from "react";

import GlobalPortfolioSwitch from "@/components/Layout/GlobalPortfolioSwitch";

import AppLayout from "@/components/Layout/AppLayout";
import PageHeader from "@/components/Pages/Collections/PageHeader";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";

import {
  selectGlobalCollections,
  selectIsGlobalCollectionsLoading,
  selectGlobalCollectionsError,
} from "@/redux/globalCollections/selectors";
import { fetchGlobalCollections } from "@/redux/globalCollections/thunks";

import CollectionCard from "./CollectionCard";

export default function Collections() {
  const dispatch = useAppDispatch();

  const globalCollections = useAppSelector(selectGlobalCollections);
  const isGlobalCollectionsLoading = useAppSelector(
    selectIsGlobalCollectionsLoading
  );
  const globalCollectionsLoadingError = useAppSelector(
    selectGlobalCollectionsError
  );

  useEffect(() => {
    dispatch(fetchGlobalCollections());
  }, []);

  return (
    <AppLayout title="Emerging Collections">
      <PageHeader>
        <GlobalPortfolioSwitch selectedLink="global" />
        <Title order={2} fw={300}>
          Collections
        </Title>
      </PageHeader>
      {isGlobalCollectionsLoading && <Loader />}
      {globalCollectionsLoadingError && (
        <Alert title="Error of getting global collections!" color="red">
          {globalCollectionsLoadingError?.message}
        </Alert>
      )}
      <Grid maw={900} gutter="lg" m={0} p={0}>
        {globalCollections.map((colState) => (
          <Grid.Col span={6} key={`col-${colState.collection?.id}`} p={0}>
            <CollectionCard collectionState={colState} entitiesLength={500} />
          </Grid.Col>
        ))}
      </Grid>
    </AppLayout>
  );
}
