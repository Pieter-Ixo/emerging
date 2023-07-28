import { Container, Flex, Text, TextInput, Title } from "@mantine/core";

import SearchGlass from "@/assets/icons/search-glass.svg";
import FilterSettings from "@/assets/icons/filter-settings.svg";
import HeaderControls from "@/components/HeaderControls";

export default function Header() {
  return (
    <Container fluid sx={{ width: "100%" }} p={0}>
      <Flex align="center" gap={24}>
      <HeaderControls selectedLink="global"/>
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
