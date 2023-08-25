import { useEffect } from "react";
import { Grid, Loader } from "@mantine/core";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { fetchAndFillCollections } from "@/redux/entityCollections/thunks";
import {
  selectIsEntityCollectionsLoading,
  selectUserEntityCollections,
} from "@/redux/entityCollections/selectors";

import CollectionCard from "./CollectionCard";

export default function CollectionsGrid() {
  const dispatch = useAppDispatch();
  const entityCollections = useAppSelector(selectUserEntityCollections);
  const isLoading = useAppSelector(selectIsEntityCollectionsLoading);

  useEffect(() => {
    dispatch(fetchAndFillCollections());
  }, [dispatch]);

  if (isLoading) return <Loader m="lg" w="100%" mx="auto" />;

  return (
    <Grid maw={900} gutter="lg" m={0} p={0}>
      {entityCollections.map(({ collection, entities }) => (
        <Grid.Col span={6} key={`collection-${collection?.id}`} p={0}>
          <CollectionCard
            collection={collection}
            entitiesLength={entities.length}
          />
        </Grid.Col>
      ))}
    </Grid>
  );
}
