/* eslint-disable no-nested-ternary */
import { Text, Image, Flex, Loader, Center } from "@mantine/core";
import { useEffect } from "react";

import dateToDayMonthYear from "@/utils/dates/dateTo";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import {
  selectInitialNewsPost,
  selectInitialNewsPostError,
  selectInitialNewsPostLoading,
} from "@/redux/entityCollections/selectors";
import { fetchInitialNewsPost } from "@/redux/entityCollections/thunks";

import ArrowRight from "./icons/arrowRight";
import PageBlock from "../PageBlock";

export default function CollectionNewsCard() {
  const initialNewsPost = useAppSelector(selectInitialNewsPost);
  const initialNewsPostError = useAppSelector(selectInitialNewsPostError);
  const isInitialNewsPostLoading = useAppSelector(selectInitialNewsPostLoading);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchInitialNewsPost());
  }, []);

  const isPostExists = initialNewsPost?.posts?.length;

  return (
    <PageBlock
      title="NEWS"
      rightSide={
        <Text>
          SEE ALL
          <ArrowRight pathFill="#000" />
        </Text>
      }
    >
      {isInitialNewsPostLoading ? (
        <Center mih={267} pb={40}>
          <Loader />
        </Center>
      ) : isPostExists ? (
        <Flex mih={267} direction="column" gap={8}>
          <Image
            src={initialNewsPost?.posts[0]?.feature_image}
            alt="news story image"
            height={170}
          />
          <Text fw={800} size="sm">
            {dateToDayMonthYear(initialNewsPost?.posts[0]?.published_at)}
          </Text>
          <Text size="md">{initialNewsPost?.posts[0]?.title}</Text>
        </Flex>
      ) : (
        <Center mih={267} pb={40}>
          <Text size="sm" color="red">
            {initialNewsPostError}
          </Text>
        </Center>
      )}
    </PageBlock>
  );
}
