import { Container, Flex, Text } from "@mantine/core";

import PortfolioIcon from "@/components/icons/portfolio-icon";
import GlobalIcon from "@/components/icons/global-icon";
import getCurrentRoute from "@/utils/getCurrentRoute";
import Link from "next/link";

export default function Header() {
  const currentPage = getCurrentRoute().at(1);

  return (
    <Container fluid sx={{ width: "100%" }}>
      <Flex align="center" gap={24} sx={{ padding: 16, paddingLeft: 32 }}>
        <Flex align="center" gap={16}>
          <Link href="/collections/global">
            <GlobalIcon selected={currentPage === "global"} />
          </Link>
          <Link href="/collections/portfolio">
            <PortfolioIcon selected={currentPage === "portfolio"} />
          </Link>
        </Flex>
        <Text fw={300} sx={{ fontSize: 40 }}>
          Collections
        </Text>
        <Text>Search</Text>
        <Text>Filter</Text>
      </Flex>
    </Container>
  );
}
