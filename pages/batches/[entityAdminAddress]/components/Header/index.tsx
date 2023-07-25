import GlobalIcon from "@/components/icons/global-icon";
import PortfolioIcon from "@/components/icons/portfolio-icon";
import { Container, Flex, Title } from "@mantine/core";
import Link from "next/link";
import BatchesControls from "../BatchesControls/BatchesControls";

export default function Header() {
  return (
    <Container fluid mb="xl" px="0" sx={{ width: "100%" }}>
      <Flex align="center" gap={24}>
        <Flex align="center" gap={16}>
          <Link href="/collections/global">
            <GlobalIcon />
          </Link>
          <PortfolioIcon selected />
        </Flex>
        <Title order={1} fw={300} size="40px">
          Carbon Certificates
        </Title>
        <BatchesControls />
      </Flex>
    </Container>
  );
}
