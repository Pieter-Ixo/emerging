import { Text, Flex, Input, Button, Tooltip, ActionIcon } from "@mantine/core";

import { palette } from "@/theme/palette";
import BaseIcon from "@/components/Presentational/BaseIcon";
import SearchIcon from "@/assets/icons/search.svg";
import FilterIcon from "@/assets/icons/filter.svg";
import { ControlsDisplayMods } from "@/types";

import GridViewIcon from "./components/icons/GridViewIcon";
import ListViewIcon from "./components/icons/ListViewIcon";

type Props = {
  isSearchVisible?: boolean;
  activeViewMode: ControlsDisplayMods;
  toggleViewMode: (viewMod: ControlsDisplayMods) => void;
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

      <ActionIcon
        w="100%"
        h="100%"
        onClick={() => toggleViewMode(ControlsDisplayMods.gridView)}
      >
        <GridViewIcon
          isActive={activeViewMode === ControlsDisplayMods.gridView}
        />
      </ActionIcon>
      <ActionIcon
        w="100%"
        h="100%"
        onClick={() => toggleViewMode(ControlsDisplayMods.listView)}
      >
        <ListViewIcon
          isActive={activeViewMode === ControlsDisplayMods.listView}
        />
      </ActionIcon>

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
