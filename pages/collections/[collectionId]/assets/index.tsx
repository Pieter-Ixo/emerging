import { Flex, Text, Title } from "@mantine/core";
import { useEffect } from "react";
import Link from "next/link";

import AppLayout from "@/components/Layout/AppLayout";
import GlobalPortfolioSwitch from "@/components/Layout/GlobalPortfolioSwitch";
import PageBlock from "@/components/Pages/Collections/CollectionDashboard/PageBlock";
import PageHeader from "@/components/Pages/Collections/PageHeader";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  selectCollectionById,
  selectEntitiesByCollectionId,
} from "@/redux/entityCollections/selectors";
import {
  fetchAndFillCollectionById,
  fetchCollectionEntityBatchesTotalByAdminAccount,
} from "@/redux/entityCollections/thunks";
import useValueFromRouter from "@/utils/useValueFromRouter";
import { palette } from "@/theme/palette";
import AssetsTable from "@/components/Pages/Collections/CollectionAssets";
import AssetsControls from "@/components/Pages/Collections/CollectionAssets/components/AssetsControls";
import ArrowLeftIcon from "@/assets/icons/arrow-left.svg";
import BaseIcon from "@/components/Presentational/BaseIcon";
import CollectionAssetModal from "@/components/Pages/Collections/CollectionDashboard/CollectionAssetsCard/components/CollectionAssetModal";

export default function Assets() {
  const dispatch = useAppDispatch();
  const collectionId = useValueFromRouter("collectionId");
  const collection = useAppSelector((state) =>
    selectCollectionById(state, collectionId)
  );
  const collectionEntities = useAppSelector((state) =>
    selectEntitiesByCollectionId(state, collectionId)
  );

  useEffect(() => {
    if (collectionId && !collection) {
      dispatch(fetchAndFillCollectionById(collectionId));
    }
  }, [collectionId]);

  useEffect(() => {
    if (collectionId && collectionEntities?.length) {
      dispatch(
        fetchCollectionEntityBatchesTotalByAdminAccount({
          entities: collectionEntities,
          collectionId,
        })
      );
    }
  }, [collection]);

  const collectionDateYear = collection?.startDate.split("-")[0];
  const collectionTitle = `${collection?._profile?.brand} - ${collection?._profile?.name} ${collectionDateYear}`;

  return (
    <AppLayout title="Collection News">
      <PageHeader>
        <GlobalPortfolioSwitch selectedLink="global" />
        <Title order={2} fw={300} color={palette.Neutral800}>
          Collections
        </Title>
        <Title order={2} fw={300}>
          {collection ? collectionTitle : "Collection"}
        </Title>
      </PageHeader>
      <PageBlock
        title="Assets"
        rightSide={
          collectionId ? (
            <Link href={`/collections/${collectionId}`} color={palette.Black}>
              <BaseIcon cursorMode="pointer" Icon={ArrowLeftIcon} />
            </Link>
          ) : null
        }
      >
        <Flex direction="column" gap={32} pb={16}>
          <AssetsControls />
          <Text size="sm" color={palette.Neutral500}>
            {collectionTitle}
          </Text>
        </Flex>
        <AssetsTable />
      </PageBlock>
      <CollectionAssetModal />
    </AppLayout>
  );
}
