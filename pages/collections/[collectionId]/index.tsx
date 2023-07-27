import { useRouter } from "next/router";
import { Grid, Stack } from "@mantine/core";

import { ICollection } from "@/types/entityCollections";
import { useAppSelector } from "@/hooks/redux";
import { selectCollections } from "@/redux/entityCollections/selectors";

import CollectionsLayout from "../components/Layout";
import PageHeader from "./components/Header";
import CollectionAssetsCard from "./components/CollectionAssetsCard";
import CollectionClimateImpactsCard from "./components/CollectionClimateImpactsCard";
import CollectionNewsCard from "./components/CollectionNewsCard";
import CollectionPerformanceCard from "./components/CollectionPerformanceCard";

function useCollectionIdFromRouter(): ICollection["id"] | undefined {
  const router = useRouter();
  const { collectionId } = router.query;
  if (typeof collectionId !== "string") return undefined;
  return collectionId;
}

export default function Collection() {
  const collectionId = useCollectionIdFromRouter();

  const collections = useAppSelector(selectCollections);
  console.log("🦊", collectionId, collections);

  return (
    <CollectionsLayout>
      <PageHeader collectionName={collections?.[0]._profile?.brand} />
      <Grid gutter="xl" sx={{ width: "100%", padding: 16, margin: 0 }}>
        <Grid.Col span={8}>
          <Stack spacing="lg">
            <CollectionClimateImpactsCard />
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
