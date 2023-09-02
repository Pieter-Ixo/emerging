import { Text, Flex, Input, Button, Tooltip } from "@mantine/core";

import { palette } from "@/theme/palette";
import BaseIcon from "@/components/Presentational/BaseIcon";
import SearchIcon from "@/assets/icons/search.svg";
import FilterIcon from "@/assets/icons/filter.svg";
import { ContentViewMods } from "@/types";

import GridViewIcon from "./components/icons/GridViewIcon";
import ListViewIcon from "./components/icons/ListViewIcon";

type Props = {
  isSearchVisible?: boolean;
  activeViewMode: ContentViewMods;
  toggleViewMode: (viewMod: ContentViewMods) => void;
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
              caretColor: palette.transparent,
            }}
            variant="unstyled"
            radius="xl"
          />
        </Tooltip>
      )}

      <Button
        variant="unstyled"
        onClick={() => toggleViewMode(ContentViewMods.gridView)}
        px={0}
        h="100%"
      >
        <GridViewIcon isActive={activeViewMode === ContentViewMods.gridView} />
      </Button>
      <Button
        variant="unstyled"
        onClick={() => toggleViewMode(ContentViewMods.listView)}
        px={0}
        h="100%"
      >
        <ListViewIcon isActive={activeViewMode === ContentViewMods.listView} />
      </Button>

      <Tooltip label="This functionality is under development" withArrow>
        <span
          // TODO: Temporary solution, because of broken Mantine Tooltip, when
          // the Button disabled tooltip is hidden if we are not using span
          style={{
            display: "flex",
            alignItems: "center",
          }}
        >
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
