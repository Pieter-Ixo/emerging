import { Title } from "@mantine/core";

import GlobalPortfolioSwitch from "@/components/Layout/GlobalPortfolioSwitch";

import CollectionsGrid from "@/components/Pages/Collections/Global/CollectionsGrid";
import AppLayout from "@/components/Layout/AppLayout";
import PageHeader from "@/components/Pages/Collections/PageHeader";
import CollectionListFilteringControls from "@/components/Pages/Collections/Global/CollectionListFilteringControls";

export default function Collections() {
  return (
    <AppLayout title="Emerging Collections">
      <PageHeader>
        <GlobalPortfolioSwitch selectedLink="global" />
        <Title order={2} fw={300}>
          Collections
        </Title>
        <CollectionListFilteringControls />
      </PageHeader>

      <CollectionsGrid />
    </AppLayout>
  );
}
