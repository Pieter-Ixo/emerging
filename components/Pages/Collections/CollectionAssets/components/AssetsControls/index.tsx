import { Text, Flex, Input, Button } from "@mantine/core";

import { palette } from "@/theme/palette";
import FilterIcon from "@/components/Icons/FilterIcon";
import SearchIcon from "@/components/Icons/SearchIcon";

export default function AssetsControls() {
  return (
    <Flex gap={8}>
      <Input
        icon={<SearchIcon />}
        placeholder="search"
        size="md"
        variant="filled"
        radius="xl"
      />
      <Button
        h={44}
        variant="unstyled"
        w={100}
        radius="xl"
        bg={palette.Neutral200}
      >
        <FilterIcon />
        <Text fw={400} size={16} ml={10} color={palette.Black}>
          Filter
        </Text>
      </Button>
    </Flex>
  );
}
