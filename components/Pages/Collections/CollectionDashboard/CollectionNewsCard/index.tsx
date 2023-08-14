/* eslint-disable no-nested-ternary */
import { Text, Image, Flex, Loader, Center, Anchor } from "@mantine/core";
import { useEffect } from "react";

import dateToDayMonthYear from "@/utils/dates/dateTo";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { fetchLastNewsPost } from "@/redux/entityCollections/thunks";
import {
  selectLastNewsPost,
  selectLastNewsPostError,
  selectLastNewsPostLoading,
} from "@/redux/entityCollections/selectors";

import { palette } from "@/theme/palette";
import useValueFromRouter from "@/utils/useValueFromRouter";
import ArrowRight from "./icons/arrowRight";
import PageBlock from "../PageBlock";

export default function CollectionNewsCard() {
  const lastNewsPost = useAppSelector(selectLastNewsPost);
  const lastNewsPostError = useAppSelector(selectLastNewsPostError);
  const isLastNewsPostLoading = useAppSelector(selectLastNewsPostLoading);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchLastNewsPost());
  }, []);

  const isPostExists = lastNewsPost?.posts?.length;

  const collectionId = useValueFromRouter("collectionId");

  return (
    <PageBlock
      title="NEWS"
      rightSide={
        <Anchor
          href={`/collections/${collectionId}/news`}
          underline={false}
          color={palette.Black}
        >
          SEE ALL
          <ArrowRight pathFill="#000" />
        </Anchor>
      }
    >
      {isLastNewsPostLoading ? (
        <Center mih={267} pb={40}>
          <Loader />
        </Center>
      ) : isPostExists ? (
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
      ) : (
        <Center mih={267} pb={40}>
          <Text size="sm" color="red">
            {lastNewsPostError}
          </Text>
        </Center>
      )}
    </PageBlock>
  );
}
