import { Flex, Text, Title } from "@mantine/core";
import { useEffect } from "react";
import Link from "next/link";

import AppLayout from "@/components/Layout/AppLayout";
import GlobalPortfolioSwitch from "@/components/Layout/GlobalPortfolioSwitch";
import PageBlock from "@/components/Pages/Collections/CollectionDashboard/PageBlock";
import PageHeader from "@/components/Pages/Collections/PageHeader";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { selectCollectionById } from "@/redux/entityCollections/selectors";
import { fetchAndFillCollections } from "@/redux/entityCollections/thunks";
import useValueFromRouter from "@/utils/useValueFromRouter";
import { palette } from "@/theme/palette";
import ArrowLeft from "@/assets/icons/arrow-left.svg";
import BaseIcon from "@/components/Presentational/BaseIcon";
import Controls from "@/components/Containers/Controls";
import AssetsTable from "@/components/Pages/Collections/CollectionAssets";

export default function Assets() {
  const dispatch = useAppDispatch();
  const collectionId = useValueFromRouter("collectionId");
  const collection = useAppSelector((state) =>
    selectCollectionById(state, collectionId)
  );
  useEffect(() => {
    dispatch(fetchAndFillCollections());
  }, []);

  const collectionDateYear = collection?.startDate.split("-")[0];
  const collectionTitle = `${collection?._profile?.brand} - ${collection?._profile?.name} ${collectionDateYear}`;

  return (
    <AppLayout title="Collection News">
      <PageHeader>
        <GlobalPortfolioSwitch selectedLink="global" />
        <Title order={2} fw={300} color="#9A9A9A">
          Collections
        </Title>
        <Title order={2} fw={300}>
          {collection
            ? `${collection?._profile?.brand} ${collection?._profile?.name}`
            : "Collection"}
        </Title>
      </PageHeader>
      <PageBlock
        title="Assets"
        rightSide={
          collectionId ? (
            <Link href={`/collections/${collectionId}`} color={palette.Black}>
              <BaseIcon isPointer Icon={ArrowLeft} />
            </Link>
          ) : null
        }
      >
        <Flex direction="column" gap={32} pb={16}>
          <Controls isViewsModsVisible={false} />
          <Text size="sm" color={palette.Neutral500}>
            {collectionTitle}
          </Text>
        </Flex>
        <AssetsTable />
      </PageBlock>
    </AppLayout>
  );
}
