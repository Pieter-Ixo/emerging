import React from "react";
import { Anchor, Text, Title } from "@mantine/core";

import GlobalPortfolioSwitch from "@/components/Layout/GlobalPortfolioSwitch";
import { ICollectionExtended } from "@/types/entityCollections";
import { palette } from "@/theme/palette";
import { selectNewsPostsError } from "@/redux/entityCollections/selectors";
import BaseIcon from "@/components/Presentational/BaseIcon";
import { useAppSelector } from "@/hooks/redux";
import ArrowLeft from "@/assets/icons/arrow-left.svg";
import AppLayout from "@/components/Layout/AppLayout";

import PageHeader from "../../PageHeader";
import PageBlock from "../../CollectionDashboard/PageBlock";

type Props = {
  collection?: ICollectionExtended;
};

export default function NewsError({ collection }: Props) {
  const newsPostsError = useAppSelector(selectNewsPostsError);

  if (!collection?.id) {
    return null;
  }

  return (
    <AppLayout title="Collection News">
      <PageHeader>
        <GlobalPortfolioSwitch selectedLink="global" />
        <Title order={2} fw={300} color={palette.Neutral800}>
          Collections
        </Title>
        <Title order={2} fw={300}>
          {collection
            ? `${collection?._profile?.brand} ${collection?._profile?.name}`
            : "Collection"}
        </Title>
      </PageHeader>
      <PageBlock
        title="News"
        rightSide={
          <Anchor
            href={`/collections/${collection?.id}`}
            underline={false}
            color={palette.Black}
          >
            <BaseIcon isPointer Icon={ArrowLeft} />
          </Anchor>
        }
      >
        <Text color={palette.redFull} size="md">
          Error: {newsPostsError}
        </Text>
      </PageBlock>
    </AppLayout>
  );
}
