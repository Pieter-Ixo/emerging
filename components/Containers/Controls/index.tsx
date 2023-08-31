import { Text, Flex, Input, Button, Tooltip } from "@mantine/core";

import { palette } from "@/theme/palette";
import BaseIcon from "@/components/Presentational/BaseIcon";
import SearchIcon from "@/assets/icons/search.svg";
import FilterIcon from "@/assets/icons/filter.svg";
import { ViewMods } from "@/types/stove";

import CollectionIcon from "./components/icons/CollectionIcon";
import TabsIcon from "./components/icons/TabsIcon";

type Props = {
  isSearchVisible?: boolean;
  activeViewMode: ViewMods;
  toggleViewMode: (viewMod: ViewMods) => void;
};

export default function Controls({
  isSearchVisible = true,
  toggleViewMode,
  activeViewMode,
}: Props) {
  // FIXME: EMERGING-177 implement search, filtering
  return (
    <Flex gap={8}>
      {isSearchVisible && (
        <Tooltip label="This functionality is under development" withArrow>
          <Input
            icon={<BaseIcon width={24} height={25} Icon={SearchIcon} />}
            placeholder="search"
            size="md"
            sx={{
              caretColor: "transparent",
            }}
            variant="unstyled"
            radius="xl"
          />
        </Tooltip>
      )}

      <span>
        <Button
          variant="unstyled"
          onClick={() => toggleViewMode(ViewMods.gridView)}
          px={0}
          h="100%"
        >
          <CollectionIcon activeViewMode={activeViewMode} />
        </Button>
      </span>
      <span>
        <Button
          variant="unstyled"
          onClick={() => toggleViewMode(ViewMods.listView)}
          px={0}
          h="100%"
        >
          <TabsIcon activeViewMode={activeViewMode} />
        </Button>
      </span>

      <Tooltip label="This functionality is under development" withArrow>
        <span>
          <Button
            h={44}
            variant="unstyled"
            w={100}
            radius="xl"
            // FIXME: EMERGING-177 implement search, filtering
            data-disabled
          >
            <BaseIcon
              cursorMode="pointer"
              width={24}
              height={25}
              Icon={FilterIcon}
            />
            <Text fw={400} size={16} ml={10} color={palette.Black}>
              Filter
            </Text>
          </Button>
        </span>
      </Tooltip>
    </Flex>
  );
}
