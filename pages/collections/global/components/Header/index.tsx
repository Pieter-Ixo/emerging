import { Container, Flex, Text, TextInput } from "@mantine/core";

import PortfolioIcon from "@/components/icons/portfolio-icon";
import GlobalIcon from "@/components/icons/global-icon";
import Link from "next/link";
import SearchGlass from "@/assets/icons/search-glass.svg";
import FilterSettings from "@/assets/icons/filter-settings.svg";

export default function Header() {
  return (
    <Container fluid sx={{ width: "100%" }}>
      <Flex align="center" gap={24} sx={{ padding: 16, paddingLeft: 32 }}>
        <Flex align="center" gap={16}>
          <GlobalIcon selected />
          <Link href="/collections/portfolio">
            <PortfolioIcon />
          </Link>
        </Flex>
        <Text fw={300} sx={{ fontSize: 40 }}>
          Collections
        </Text>
        <TextInput
          label=""
          variant="unstyled"
          radius="xl"
          placeholder="search"
          icon={<SearchGlass />}
          sx={{ backgroundColor: "#fff", borderRadius: "2rem" }}
        />
        <Flex
          align="center"
          gap={10}
          px="20px"
          sx={{
            backgroundColor: "#fff",
            height: 36,
            borderRadius: "2rem",
          }}
        >
          <FilterSettings />
          <Text>Filter</Text>
        </Flex>
      </Flex>
    </Container>
  );
}
