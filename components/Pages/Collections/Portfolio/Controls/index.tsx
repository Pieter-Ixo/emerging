import { Text, Flex, ActionIcon, Input } from "@mantine/core";
import { palette } from "@/theme/palette";
import { PortfolioViewMods } from "@/types/stove";
import { useState } from "react";

import SearchIcon from "@/icons/collections/SearchIcon";
import CollectionIcon from "@/icons/collections/CollectionIcon";
import TabsIcon from "@/icons/collections/TabsIcon";
import FilterIcon from "@/icons/collections/FilterIcon";

type Props = {
  isSearchVisible?: boolean;
};

export default function Controls({ isSearchVisible = true }: Props) {
  const [viewMode, setViewMode] = useState(PortfolioViewMods.iconView);

  const isListViewMode = viewMode === PortfolioViewMods.listView;
  const isIconViewMode = viewMode === PortfolioViewMods.iconView;

  return (
    <Flex gap={8}>
      {isSearchVisible && (
        <Input
          icon={<SearchIcon />}
          placeholder="search"
          size="md"
          variant="filled"
          radius="xl"
        />
      )}
      <ActionIcon
        size="xl"
        radius="xl"
        color="dark"
        variant="transparent"
        sx={{
          background: isIconViewMode ? palette.fullBlue : palette.Neutral200,
        }}
        onClick={() => setViewMode(PortfolioViewMods.iconView)}
      >
        <CollectionIcon
          fill="transparent"
          stroke={isIconViewMode ? palette.White : palette.Black}
        />
      </ActionIcon>
      <ActionIcon
        size="xl"
        radius="xl"
        color="dark"
        variant="transparent"
        sx={{
          background: isListViewMode ? palette.fullBlue : palette.Neutral200,
        }}
        onClick={() => setViewMode(PortfolioViewMods.listView)}
      >
        <TabsIcon fill={isListViewMode ? palette.White : palette.Black} />
      </ActionIcon>
      <ActionIcon
        size="xl"
        radius="xl"
        color="dark"
        variant="transparent"
        sx={{
          width: 100,
          background: palette.Neutral200,
        }}
      >
        <Flex gap={10}>
          <FilterIcon fill={palette.Black} />
          <Text>Filter</Text>
        </Flex>
      </ActionIcon>
    </Flex>
  );
}
