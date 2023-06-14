import { Container, Flex, Text } from "@mantine/core";

import PortfolioIcon from "@/components/icons/portfolio-icon";
import GlobalIcon from "@/components/icons/global-icon";
import Link from "next/link";

export default function Header() {
  return (
    <Container fluid sx={{ width: "100%" }}>
      <Flex align="center" gap={24} sx={{ padding: 16, paddingLeft: 32 }}>
        <Flex align="center" gap={16}>
          <Link href="/collections/global">
            <GlobalIcon />
          </Link>
          <PortfolioIcon selected />
        </Flex>
        <Text fw={300} sx={{ fontSize: 40 }}>
          My Portfolio
        </Text>
        <Text>🔴 disconnected</Text>
      </Flex>
    </Container>
  );
}
