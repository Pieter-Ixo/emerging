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

  async function getFirstNewsPost() {
    try {
      const newsFirstPostResponse = await fetch(
        `/api/news?limit=${1}&fields=title,excerpt,feature_image,published_at`
      );
      const newsFirstPostData = await newsFirstPostResponse.json();

      setInitialNewsPost(newsFirstPostData);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  }

  useEffect(() => {
    getFirstNewsPost();
  }, []);
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
      {initialNewsPost ? (
        <Flex mih={267} direction="column" gap={8}>
          <Image
            src={initialNewsPost?.posts[0].feature_image}
            alt="news story image"
            height={170}
          />
          <Text fw={800} size="sm">
            {dateToDayMonthYear(initialNewsPost?.posts[0].published_at)}
          </Text>
          <Text size="md">{initialNewsPost?.posts[0].title}</Text>
        </Flex>
      ) : (
        <Center mih={267} pb={40}>
          <Loader />
        </Center>
      )}
    </PageBlock>
  );
}
