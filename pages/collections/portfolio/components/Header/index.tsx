import { Container, Flex, Title } from "@mantine/core";

import HeaderControls from "@/components/HeaderControls";

export default function Header() {
  return (
    <Container fluid mb="xl" sx={{ width: "100%" }} p={0}>
      <Flex align="center" gap={24}>
        <HeaderControls selectedLink="portfolio" />
        <Title order={1} fw={300} size="40px">
          My Portfolio
        </Title>
      </Flex>
    </Container>
  );
}
