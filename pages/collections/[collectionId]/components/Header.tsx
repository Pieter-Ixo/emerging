import { Container, Flex, Title } from "@mantine/core";

import PortfolioIcon from "@/components/icons/portfolio-icon";
import GlobalIcon from "@/components/icons/global-icon";
import Link from "next/link";

export default function PageHeader({
  collectionName = "Collection",
}: {
  collectionName?: string;
}) {
  return (
    <Container fluid sx={{ width: "100%" }}>
      <Flex align="center" gap={24} pl={32} p={16}>
        <Flex align="center" gap={16}>
          <GlobalIcon selected />
          <Link href="/collections/portfolio">
            <PortfolioIcon />
          </Link>
        </Flex>
        <Title order={1} fw={300} size="40px" color="#9A9A9A">
          Collections
        </Title>
        <Title order={1} fw={300} size="40px">
          {collectionName}
        </Title>
      </Flex>
    </Container>
  );
}
