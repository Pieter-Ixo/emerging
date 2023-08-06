import { Title } from "@mantine/core";

import GlobalPortfolioSwitch from "@/components/HeaderControls";

import CollectionsGrid from "@/components/Pages/Collections/Global/CollectionsGrid";
import CollectionsLayout from "@/components/Pages/Collections/CollectionsLayout";
import PageHeader from "@/components/Pages/Collections/PageHeader";
import CollectionListFilteringControls from "@/components/Pages/Collections/Global/CollectionListFilteringControls";

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
