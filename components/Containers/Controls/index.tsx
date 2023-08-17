import { Text, Flex, Input, Button, Tooltip } from "@mantine/core";
import { palette } from "@/theme/palette";
import { PortfolioViewMods } from "@/types/stove";
import { useState } from "react";

import BaseIcon from "@/components/Presentational/BaseIcon";
import SearchIcon from "@/assets/icons/search.svg";
import CollectionIcon from "@/assets/icons/collection.svg";
import TabsIcon from "@/assets/icons/tabs.svg";
import FilterIcon from "@/assets/icons/filter.svg";

type Props = {
  isSearchVisible?: boolean;
};

export default function Controls({ isSearchVisible = true }: Props) {
  const [viewMode, setViewMode] = useState(PortfolioViewMods.iconView);

  // TODO: uncomment when functionality will be implemented
  // const isListViewMode = viewMode === PortfolioViewMods.listView;
  // const isIconViewMode = viewMode === PortfolioViewMods.iconView;

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
            // variant="filled"
            variant="unstyled"
            radius="xl"
          />
        </Tooltip>
      )}
      <Tooltip label="This functionality is under development" withArrow>
        <Button
          variant="unstyled"
          px={0}
          h="100%"
          onClick={() => setViewMode(PortfolioViewMods.iconView)}
        >
          <BaseIcon
            fill="transparent"
            isPointer
            isStroke
            variant="circle"
            status="disabled"
            // status={isIconViewMode ? "selected" : "notSelected"}
            theme={{
              notSelected: {
                bgColor: palette.Neutral200,
                stroke: palette.Black,
              },
              selected: {
                stroke: palette.White,
              },
            }}
            width={24}
            height={25}
            Icon={CollectionIcon}
          />
        </Button>
      </Tooltip>
      <Tooltip label="This functionality is under development" withArrow>
        <Button
          variant="unstyled"
          px={0}
          h="100%"
          onClick={() => setViewMode(PortfolioViewMods.listView)}
        >
          <BaseIcon
            isPointer
            Icon={TabsIcon}
            width={24}
            status="disabled"
            // status={isListViewMode ? "selected" : "notSelected"}
            variant="circle"
            height={25}
            // fill={isListViewMode ? palette.White : palette.Black}
            theme={{
              notSelected: {
                bgColor: palette.Neutral200,
              },
            }}
          />
        </Button>
      </Tooltip>

      <Tooltip label="This functionality is under development" withArrow>
        <Button
          h={44}
          variant="unstyled"
          w={100}
          radius="xl"
          bg={palette.Neutral200}
        >
          <BaseIcon isPointer width={24} height={25} Icon={FilterIcon} />
          <Text fw={400} size={16} ml={10} color={palette.Black}>
            Filter
          </Text>
        </Button>
      </Tooltip>
    </Flex>
  );
}
