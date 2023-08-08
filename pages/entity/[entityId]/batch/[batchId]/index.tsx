import GlobalPortfolioSwitch from "@/components/Layout/GlobalPortfolioSwitch";
import BatchPageLayout from "@/components/Pages/Batch";
import AppLayout from "@/components/Layout/AppLayout";
import PageHeader from "@/components/Pages/Collections/PageHeader";
import { Title } from "@mantine/core";

export default function BatchPage() {
  return (
    <AppLayout title="Carbon Certificate">
      <PageHeader>
        <GlobalPortfolioSwitch selectedLink="portfolio" />
        <Title order={1} fw={300} size="40px">
          Carbon certificate
        </Title>
      </PageHeader>
      <BatchPageLayout />
    </AppLayout>
  );
}
