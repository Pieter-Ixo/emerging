import { useEffect } from "react";
import { Grid, Loader, Text } from "@mantine/core";

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

  if (!isLoading) console.log("🐸, collections", collections);

  return isLoading ? (
    <Loader m="lg" />
  ) : (
    <Grid>
      {collections.map((collection) => (
        <Grid.Col span={6} key={`collection-${collection?.id}`}>
          <CollectionCard collection={collection} />
        </Grid.Col>
      ))}
    </Grid>
  );
}
