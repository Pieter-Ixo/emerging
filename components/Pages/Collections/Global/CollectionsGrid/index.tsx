import { useEffect } from "react";
import { Grid, Loader } from "@mantine/core";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { fetchAndFillCollections } from "@/redux/entityCollections/thunks";
import {
  selectCollections,
  selectIsEntityCollectionsLoading,
} from "@/redux/entityCollections/selectors";

import CollectionCard from "./CollectionCard";

export default function CollectionsGrid() {
  const dispatch = useAppDispatch();
  const collections = useAppSelector(selectCollections);
  const isLoading = useAppSelector(selectIsEntityCollectionsLoading);

  useEffect(() => {
    dispatch(fetchAndFillCollections());
  }, [dispatch]);

  if (isLoading) return <Loader m="lg" w="100%" mx="auto" />;

  return (
    <Grid maw={900} gutter="lg" m={0} p={0}>
      {collections.map((collection) => (
        <Grid.Col span={6} key={`collection-${collection?.id}`} p={0}>
          <CollectionCard collection={collection} />
        </Grid.Col>
      ))}
    </Grid>
  );
}
