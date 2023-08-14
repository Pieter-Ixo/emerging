import AppLayout from "@/components/Layout/AppLayout";
import GlobalPortfolioSwitch from "@/components/Layout/GlobalPortfolioSwitch";
import PageBlock from "@/components/Pages/Collections/CollectionDashboard/PageBlock";
import PageHeader from "@/components/Pages/Collections/PageHeader";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { selectCollections } from "@/redux/entityCollections/selectors";
import { fetchAndFillCollections } from "@/redux/entityCollections/thunks";
import { Title } from "@mantine/core";
import React, { useEffect } from "react";

export default function News() {
  const dispatch = useAppDispatch();
  const collections = useAppSelector(selectCollections);

  useEffect(() => {
    dispatch(fetchAndFillCollections());
  }, []);

  return (
    <AppLayout title="Collection News">
      <PageHeader>
        <GlobalPortfolioSwitch selectedLink="global" />
        <Title order={2} fw={300} color="#9A9A9A">
          Collections
        </Title>
        <Title order={2} fw={300}>
          {collections?.length
            ? `${collections?.[0]?._profile?.brand} ${collections?.[0]?._profile?.name}`
            : "Collection"}
        </Title>
      </PageHeader>
      <PageBlock title="News">Test</PageBlock>
    </AppLayout>
  );
}
