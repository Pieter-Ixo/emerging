import dateToDayMonthYear from "@/utils/dates/dateTo";
import { Box, Flex, Image, Text, Title } from "@mantine/core";
import React from "react";

type Props = {
  imageUrl: string;
  date: string;
  title: string;
  description: string;
};

export default function NewsPost({
  imageUrl,
  date,
  title,
  description,
}: Props) {
  return (
    <Flex justify="flex-start" gap={40} mb={28}>
      <Image
        width={300}
        height={200}
        src={imageUrl}
        fit="contain"
        alt="Image of a news item"
        withPlaceholder
      />
      <Box sx={{ flex: 1 }}>
        <Text lh={0.8} mb={4} size="xs" fw={800}>
          {dateToDayMonthYear(date)}
        </Text>
        <Title mb={16} order={4} fw={300}>
          {title}
        </Title>
        <Text maw={400} size="md">
          {description}
        </Text>
      </Box>
    </Flex>
  );
}
