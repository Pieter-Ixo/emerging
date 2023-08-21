import { Flex, Text, TextInput, Tooltip } from "@mantine/core";

import SearchGlass from "@/assets/icons/search-glass.svg";
import FilterSettings from "@/assets/icons/filter-settings.svg";
import { palette } from "@/theme/palette";
import BaseIcon from "@/components/Presentational/BaseIcon";

export default function CollectionListFilteringControls() {
  return (
    <>
      <Tooltip label="This functionality is under development" withArrow>
        <TextInput
          variant="unstyled"
          size="sm"
          radius="xl"
          placeholder="search"
          icon={<BaseIcon fill={palette.Neutral800} Icon={SearchGlass} />}
          bg={palette.Neutral200}
          sx={{
            borderRadius: "2rem",
            caretColor: "transparent",
          }}
        />
      </Tooltip>
      <Tooltip label="This functionality is under development" withArrow>
        <Flex
          h={36}
          px="20px"
          sx={{ borderRadius: "2rem" }}
          bg={palette.Neutral200}
          align="center"
          gap={10}
        >
          <BaseIcon fill={palette.Neutral800} Icon={FilterSettings} />
          <Text size="md" color={palette.Neutral800}>
            Filter
          </Text>
        </Flex>
      </Tooltip>
    </>
  );
}
