import React, { useEffect, useRef } from "react";
import { useIntersection } from "@mantine/hooks";
import { Anchor, Center, Loader, Title } from "@mantine/core";

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
  selectNewsPostsPagination,
} from "@/redux/entityCollections/selectors";
import {
  fetchAndFillCollections,
  fetchNewsPosts,
} from "@/redux/entityCollections/thunks";
import { palette } from "@/theme/palette";
import useValueFromRouter from "@/utils/useValueFromRouter";
import ArrowLeft from "@/assets/icons/arrow-left.svg";
import NewsError from "@/components/Pages/Collections/News/NewsError";


export default function News() {
  const collectionId = useValueFromRouter("collectionId");
  const dispatch = useAppDispatch();
  const collection = useAppSelector((state) =>
    selectCollectionById(state, collectionId)
  );

  const newsPosts = useAppSelector(selectNewsPosts);
  const newsPostsPagination = useAppSelector(selectNewsPostsPagination);
  const isNewsPostsLoading = useAppSelector(selectIsNewsPostsLoading);

  const paginationContainerRef = useRef<HTMLDivElement | null>(null);
  const { ref, entry } = useIntersection({
    root: paginationContainerRef.current,
    threshold: 1,
  });

  useEffect(() => {
    const isNotFirstRequest =
      newsPostsPagination?.next && newsPostsPagination?.next !== 1;
    if (entry?.isIntersecting && isNotFirstRequest)
      dispatch(fetchNewsPosts(newsPostsPagination?.next));
  }, [entry]);

  useEffect(() => {
    dispatch(fetchAndFillCollections());
    if (!newsPosts?.length) dispatch(fetchNewsPosts(1));
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
        {newsPosts?.map((post) => (
          <NewsPost
            imageUrl={post?.feature_image}
            date={post?.published_at}
            key={post?.id}
            title={post?.title}
            description={post?.excerpt}
          />
        ))}
        <Center ref={ref} h={100}>
          {entry?.isIntersecting && isNewsPostsLoading ? <Loader /> : null}
        </Center>
      </PageBlock>
    </AppLayout>
  );
}
