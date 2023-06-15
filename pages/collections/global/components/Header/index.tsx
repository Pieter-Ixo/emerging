import { Container, Flex, Text, TextInput, Title } from "@mantine/core";

import PortfolioIcon from "@/components/icons/portfolio-icon";
import GlobalIcon from "@/components/icons/global-icon";
import Link from "next/link";

import SearchGlass from "@/assets/icons/search-glass.svg";
import FilterSettings from "@/assets/icons/filter-settings.svg";

export default function Header() {
  return (
    <Container fluid sx={{ width: "100%" }}>
      <Flex align="center" gap={24} pl={32} p={16}>
        <Flex align="center" gap={16}>
          <GlobalIcon selected />
          <Link href="/collections/portfolio">
            <PortfolioIcon />
          </Link>
        </Flex>
        <Title order={1} fw={300} size="40px">
          Collections
        </Title>
        <TextInput
          label=""
          variant="unstyled"
          radius="xl"
          placeholder="search"
          icon={<SearchGlass />}
          bg="#fff"
          sx={{ borderRadius: "2rem" }}
        />
        <Flex
          align="center"
          gap={10}
          px="20px"
          bg="#fff"
          h={36}
          sx={{ borderRadius: "2rem" }}
        >
          <FilterSettings />
          <Text>Filter</Text>
        </Flex>
      </Flex>
    </Container>
  );
}
