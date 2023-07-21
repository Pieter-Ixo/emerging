import { Container, Flex, Title } from "@mantine/core";

import PortfolioIcon from "@/components/icons/portfolio-icon";
import GlobalIcon from "@/components/icons/global-icon";
import Link from "next/link";

export default function Header() {
  return (
    <Container fluid sx={{ width: "100%" }}>
      <Flex align="center" gap={24} pl={32} p={16}>
        <Flex align="center" gap={16}>
          <Link href="/collections/global">
            <GlobalIcon />
          </Link>
          <PortfolioIcon selected />
        </Flex>
        <Title order={1} fw={300} size="40px">
          My Portfolio
        </Title>
      </Flex>
    </Container>
  );
}
