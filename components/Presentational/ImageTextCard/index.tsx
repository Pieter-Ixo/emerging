import { ElementType, HTMLAttributes } from "react";

import { Flex, Text } from "@mantine/core";
import { palette } from "@/theme/palette";

type ImageTextCardProps = {
  Img: ElementType;
  text: string;
  vertical?: boolean;
} & HTMLAttributes<HTMLDivElement>;

// TODO: find appropriate place for this file
function ImageTextCard({ text, Img, vertical = false }: ImageTextCardProps) {
  return (
    <Flex
      bg={palette.whiteTransparentSecondary}
      p={15}
      direction={vertical ? "column" : "row"}
      align="center"
      sx={{
        borderRadius: 12,
      }}
    >
      <Img width={45} height={45} />
      <Flex
        direction="column"
        justify="center"
        ml={5}
        mt={vertical ? 6 : 0}
        sx={{
          flex: 1,
          textAlign: vertical ? "center" : "start",
        }}
      >
        <Text>{text}</Text>
      </Flex>
    </Flex>
  );
}

export default ImageTextCard;
