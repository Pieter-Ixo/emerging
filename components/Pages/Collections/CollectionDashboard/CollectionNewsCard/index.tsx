/* eslint-disable no-nested-ternary */
import { Text, Image, Flex, Loader, Center } from "@mantine/core";
import { useEffect, useState } from "react";

import { INewsPostsResponse } from "@/types/news";
import dateToDayMonthYear from "@/utils/dates/dateTo";

import ArrowRight from "./icons/arrowRight";
import PageBlock from "../PageBlock";

export default function CollectionNewsCard() {
  const [initialNewsPost, setInitialNewsPost] = useState<
    INewsPostsResponse | undefined
  >();
  const [initialNewsPostError, setInitialNewsPostError] = useState<
    string | undefined
  >();

  const [isLoading, setIsLoading] = useState(true);

  const defaultErrorMessage = "An error occurred while fetching data.";

  // eslint-disable-next-line consistent-return
  async function getFirstNewsPost() {
    try {
      const newsFirstPostResponse = await fetch(
        `/api/news?limit=${1}&fields=title,excerpt,feature_image,published_at`
      );
      const newsFirstPostData = await newsFirstPostResponse.json();

      if (newsFirstPostData.message) {
        return setInitialNewsPostError(newsFirstPostData.message);
      }

      setInitialNewsPost(newsFirstPostData);
    } catch (error) {
      setInitialNewsPostError(defaultErrorMessage);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getFirstNewsPost();
  }, []);

  const isPostExists =
    initialNewsPost && initialNewsPost?.posts && initialNewsPost.posts.length;

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
      {isLoading ? (
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
            {initialNewsPostError || defaultErrorMessage}
          </Text>
        </Center>
      )}
    </PageBlock>
  );
}
