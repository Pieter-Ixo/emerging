import { Container, Flex, Title } from "@mantine/core";

import PortfolioIcon from "@/components/icons/portfolio-icon";
import GlobalIcon from "@/components/icons/global-icon";
import Link from "next/link";

export default function Header() {
  return (
    <Container fluid mb="xl" sx={{ width: "100%" }} p={0}>
      <Flex align="center" gap={24}>
        <Flex align="center" gap={16}>
          <Link href="/collections/global">
            <GlobalIcon />
          </Link>
          <Link href="/collections/portfolio">
            <PortfolioIcon selected />
          </Link>
        </Flex>
        <Title order={1} fw={300} size="40px">
          My Portfolio
        </Title>
      </Flex>
    </Container>
  );
}
