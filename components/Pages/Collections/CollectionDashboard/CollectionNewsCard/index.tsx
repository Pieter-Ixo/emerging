import { Text, Image, Flex, Loader } from "@mantine/core";
import { useEffect } from "react";
import Link from "next/link";

import dateToDayMonthYear from "@/utils/dates/dateTo";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { fetchLastNewsPost } from "@/redux/entityCollections/thunks";
import {
  selectLastNewsPost,
  selectLastNewsPostError,
  selectLastNewsPostLoading,
} from "@/redux/entityCollections/selectors";

import { palette } from "@/theme/palette";
import BaseIcon from "@/components/Presentational/BaseIcon";
import useValueFromRouter from "@/utils/useValueFromRouter";
import ArrowRight from "@/assets/icons/arrow-right.svg";

import PageBlock from "../PageBlock";
import NewsPageBlock from "./components/NewsPageBlock";

export default function CollectionNewsCard() {
  const lastNewsPost = useAppSelector(selectLastNewsPost);
  const lastNewsPostError = useAppSelector(selectLastNewsPostError);
  const isLastNewsPostLoading = useAppSelector(selectLastNewsPostLoading);
  const collectionId = useValueFromRouter("collectionId");

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchLastNewsPost());
  }, []);

  const isPostExists = lastNewsPost?.posts?.length;

  if (isLastNewsPostLoading) {
    return (
      <NewsPageBlock>
        <Loader />
      </NewsPageBlock>
    );
  }
  if (!isPostExists) {
    return (
      <NewsPageBlock>
        <Text size="sm" color="red">
          {lastNewsPostError}
        </Text>
      </NewsPageBlock>
    );
  }

  return (
    <PageBlock
      title="NEWS"
      rightSide={
        collectionId ? (
          <Link
            href={`/collections/${collectionId}/news`}
            color={palette.Black}
          >
            <Flex>
              <Text size="md">SEE ALL</Text>
              <BaseIcon width={24} height={25} isPointer Icon={ArrowRight} />
            </Flex>
          </Link>
        ) : null
      }
    >
      <Flex mih={267} direction="column" gap={8}>
        <Image
          src={lastNewsPost?.posts[0]?.feature_image}
          alt="news story image"
          height={170}
        />
        <Text fw={800} size="sm">
          {dateToDayMonthYear(lastNewsPost?.posts[0]?.published_at)}
        </Text>
        <Text size="md">{lastNewsPost?.posts[0]?.title}</Text>
      </Flex>
    </PageBlock>
  );
}
