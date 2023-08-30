import { Text, Flex, Input, Button } from "@mantine/core";

import { palette } from "@/theme/palette";
import FilterIcon from "@/assets/icons/filter.svg";
import SearchIcon from "@/assets/icons/search.svg";
import BaseIcon from "@/components/Presentational/BaseIcon";

export default function AssetsControls() {
  return (
    <Flex gap={8}>
      <Input
        icon={<BaseIcon cursorMode="pointer" width={24} height={25} Icon={SearchIcon} />}
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
        <BaseIcon cursorMode="pointer" width={24} height={25} Icon={FilterIcon} />

        <Text fw={400} size={16} ml={10} color={palette.Black}>
          Filter
        </Text>
      </Button>
    </Flex>
  );
}
