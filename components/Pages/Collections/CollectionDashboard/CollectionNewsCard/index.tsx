import { Text, Image, Flex, Loader, Center } from "@mantine/core";
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

export default function CollectionNewsCard() {
  const lastNewsPost = useAppSelector(selectLastNewsPost);
  const lastNewsPostError = useAppSelector(selectLastNewsPostError);
  const isLastNewsPostLoading = useAppSelector(selectLastNewsPostLoading);
  const collectionId = useValueFromRouter("collectionId");

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchLastNewsPost());
  }, []);

  if (isLastNewsPostLoading) {
    return (
      <PageBlock title="NEWS">
        <Center mih={267} pb={40}>
          <Loader />
        </Center>
      </PageBlock>
    );
  }
  if (!lastNewsPost) {
    return (
      <PageBlock title="NEWS">
        <Center mih={267} pb={40}>
          <Text size="sm" color="red">
            {lastNewsPostError}
          </Text>
        </Center>
      </PageBlock>
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
      <Link href={lastNewsPost.url}>
        <Flex mih={267} direction="column" gap={8}>
          <Image
            src={lastNewsPost?.feature_image}
            alt="news story image"
            height={170}
          />
          <Text fw={800} size="sm">
            {dateToDayMonthYear(lastNewsPost?.published_at)}
          </Text>
          <Text size="md">{lastNewsPost?.title}</Text>
        </Flex>
      </Link>
    </PageBlock>
  );
}
