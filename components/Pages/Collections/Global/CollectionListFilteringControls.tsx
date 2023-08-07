import { Flex, Text, TextInput } from "@mantine/core";

import SearchGlass from "@/assets/icons/search-glass.svg";
import FilterSettings from "@/assets/icons/filter-settings.svg";

export default function CollectionListFilteringControls() {
  return (
    <>
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
    </>
  );
}
