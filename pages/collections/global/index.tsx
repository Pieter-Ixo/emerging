import { Title } from "@mantine/core";

import GlobalPortfolioSwitch from "@/components/HeaderControls";

import CollectionsLayout from "../components/Layout";
import PageHeader from "../components/PageHeader";

import CollectionsGrid from "./components/CollectionsGrid";
import CollectionListFilteringControls from "./components/CollectionListFilteringControls";

export default function Collections() {
  return (
    <CollectionsLayout>
      <PageHeader>
        <GlobalPortfolioSwitch selectedLink="global" />
        <Title order={1} fw={300} size="40px">
          Collections
        </Title>
        <CollectionListFilteringControls />
      </PageHeader>

      <CollectionsGrid />
    </CollectionsLayout>
  );
}
