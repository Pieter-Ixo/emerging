import React, { useEffect } from "react";
import AppLayout from "@/components/Layout/AppLayout";
import GlobalPortfolioSwitch from "@/components/Layout/GlobalPortfolioSwitch";
import PageBlock from "@/components/Pages/Collections/CollectionDashboard/PageBlock";
import NewsPost from "@/components/Pages/Collections/News/NewsPost";
import PageHeader from "@/components/Pages/Collections/PageHeader";
import BaseIcon from "@/components/Presentational/BaseIcon";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  selectCollectionById,
  selectIsNewsPostsLoading,
  selectNewsPosts,
  selectNewsPostsError,
} from "@/redux/entityCollections/selectors";
import {
  fetchAndFillCollections,
  fetchNewsPosts,
} from "@/redux/entityCollections/thunks";
import { palette } from "@/theme/palette";
import useValueFromRouter from "@/utils/useValueFromRouter";
import { Anchor, Center, Loader, Title } from "@mantine/core";
import ArrowLeft from "@/assets/icons/arrow-left.svg";
import NewsError from "@/components/Pages/Collections/News/NewsError";

export default function News() {
  const collectionId = useValueFromRouter("collectionId");
  const dispatch = useAppDispatch();
  const collection = useAppSelector((state) =>
    selectCollectionById(state, collectionId)
  );

  const newsPosts = useAppSelector(selectNewsPosts);
  const isNewsPostsLoading = useAppSelector(selectIsNewsPostsLoading);

  useEffect(() => {
    dispatch(fetchAndFillCollections());
    dispatch(fetchNewsPosts());
  }, []);

  const newsPostsError = useAppSelector(selectNewsPostsError);

  if (newsPostsError) {
    return <NewsError collection={collection} />;
  }

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
        {isNewsPostsLoading ? (
          <Center py="xl">
            <Loader />
          </Center>
        ) : (
          newsPosts?.posts.map((post) => (
            <NewsPost
              imageUrl={post?.feature_image}
              date={post?.published_at}
              key={post?.id}
              title={post?.title}
              description={post?.excerpt}
            />
          ))
        )}
      </PageBlock>
    </AppLayout>
  );
}
