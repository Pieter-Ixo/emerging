import AppLayout from "@/components/Layout/AppLayout";
import React from "react";
import GlobalPortfolioSwitch from "@/components/Layout/GlobalPortfolioSwitch";
import { Anchor, Text, Title } from "@mantine/core";
import { palette } from "@/theme/palette";
import { selectNewsPostsError } from "@/redux/entityCollections/selectors";
import BaseIcon from "@/components/Presentational/BaseIcon";
import useValueFromRouter from "@/utils/useValueFromRouter";
import { useAppSelector } from "@/hooks/redux";
import ArrowLeft from "@/assets/icons/arrow-left.svg";
import { ICollectionExtended } from "@/types/entityCollections";
import PageHeader from "../../PageHeader";
import PageBlock from "../../CollectionDashboard/PageBlock";

type Props = {
  collections: ICollectionExtended[];
};

export default function NewsErrorBoundary({ collections }: Props) {
  const newsPostsError = useAppSelector(selectNewsPostsError);
  const collectionId = useValueFromRouter("collectionId");

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
      <PageBlock
        title="News"
        rightSide={
          collectionId ? (
            <Anchor
              href={`/collections/${collectionId}`}
              underline={false}
              color={palette.Black}
            >
              <BaseIcon isPointer Icon={ArrowLeft} />
            </Anchor>
          ) : null
        }
      >
        <Text color={palette.redFull} size="md">
          Error: {newsPostsError}
        </Text>
      </PageBlock>
    </AppLayout>
  );
}
