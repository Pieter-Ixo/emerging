import { useEffect, useRef } from "react";
import { useIntersection } from "@mantine/hooks";
import { Center, Loader, Title } from "@mantine/core";
import Link from "next/link";

import AppLayout from "@/components/Layout/AppLayout";
import GlobalPortfolioSwitch from "@/components/Layout/GlobalPortfolioSwitch";
import PageBlock from "@/components/Pages/Collections/CollectionDashboard/PageBlock";
import PageHeader from "@/components/Pages/Collections/PageHeader";
import BaseIcon from "@/components/Presentational/BaseIcon";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  selectCollectionById,
  selectIsNewsPostsLoading,
  selectNewsPosts,
  selectNewsPostsPagination,
} from "@/redux/entityCollections/selectors";
import {
  fetchAndFillCollections,
  fetchNewsPosts,
} from "@/redux/entityCollections/thunks";
import { palette } from "@/theme/palette";
import useValueFromRouter from "@/utils/useValueFromRouter";
import ArrowLeft from "@/assets/icons/arrow-left.svg";
import NewsPosts from "@/components/Pages/Collections/News/NewsPosts";

export default function News() {
  const collectionId = useValueFromRouter("collectionId");
  const dispatch = useAppDispatch();
  const collection = useAppSelector((state) =>
    selectCollectionById(state, collectionId)
  );

  const newsPosts = useAppSelector(selectNewsPosts);
  const newsPostsPagination = useAppSelector(selectNewsPostsPagination);

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

  const isNewsPostsLoading = useAppSelector(selectIsNewsPostsLoading);

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
          collectionId ? (
            <Link href={`/collections/${collectionId}`} color={palette.Black}>
              <BaseIcon isPointer Icon={ArrowLeft} />
            </Link>
          ) : null
        }
      >
        <NewsPosts newsPosts={newsPosts} />
        <Center ref={ref} h={100}>
          {entry?.isIntersecting && isNewsPostsLoading ? <Loader /> : null}
        </Center>
      </PageBlock>
    </AppLayout>
  );
}
