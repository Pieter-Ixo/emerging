import { ElementType, HTMLAttributes, Ref, forwardRef } from "react";

import { Flex, Text } from "@mantine/core";
import { palette } from "@/theme/palette";

type ImageTextCardProps = {
  Img: ElementType;
  text: string;
  vertical?: boolean;
} & HTMLAttributes<HTMLDivElement>;

function ImageTextCard(
  { text, Img, vertical = false }: ImageTextCardProps,
  ref: Ref<HTMLDivElement>
) {
  return (
    <Flex
      ref={ref}
      bg={palette.whiteTransparentSecondary}
      p={15}
      h="100%"
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

export default forwardRef(ImageTextCard);
