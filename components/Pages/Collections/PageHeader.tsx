import { PropsWithChildren } from "react";
import { Container, Flex } from "@mantine/core";

export default function PageHeader({ children }: PropsWithChildren) {
  return (
    <Container fluid sx={{ width: "100%" }} p={0} mb="xl">
      <Flex align="center" gap={24}>
        {children}
      </Flex>
    </Container>
  );
}
