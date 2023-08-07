import { Container, Flex, Title } from "@mantine/core";

import GlobalPortfolioSwitch from "@/components/Layout/GlobalPortfolioSwitch";

import BatchesControls from "../BatchesControls/BatchesControls";

export default function BatchesPageHeader() {
  return (
    <Container fluid mb="xl" px="0" sx={{ width: "100%" }}>
      <Flex align="center" gap={24}>
        <GlobalPortfolioSwitch selectedLink="portfolio" />
        <Title order={1} fw={300} size="40px">
          Carbon Certificates
        </Title>
        <BatchesControls />
      </Flex>
    </Container>
  );
}
