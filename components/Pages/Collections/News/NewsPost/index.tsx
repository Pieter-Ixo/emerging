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
      <Image maw={300} src={imageUrl} alt="Image of a news item" />
      <Box sx={{ flex: 1 }}>
        <Text lh={0.8} mb={4} size="sm" fw={800}>
          {date}
        </Text>
        <Title mb={16} order={4} fw={300}>
          {title}
        </Title>
        <Text size="md">{description}</Text>
      </Box>
    </Flex>
  );
}
