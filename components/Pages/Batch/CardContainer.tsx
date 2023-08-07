import { PropsWithChildren } from "react";
import { Flex } from "@mantine/core";

export default function CardContainer({ children }: PropsWithChildren) {
  return (
    <Flex
      direction="column"
      justify="center"
      gap={20}
      py="1rem"
      px="2rem"
      sx={{
        position: "relative",
        backgroundImage: `url(/images/cert-bg.png)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: 400,
        borderRadius: 16,
      }}
    >
      {children}
    </Flex>
  );
}
