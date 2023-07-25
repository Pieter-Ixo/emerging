import { Text,  Flex, ActionIcon, Input } from "@mantine/core";
import { palette } from "@/theme/palette";
import { useState } from "react";
import CollectionIcon from "../icons/CollectionIcon";
import SearchIcon from "../icons/SearchIcon";
import FilterIcon from "../icons/FilterIcon";
import TabsIcon from "../icons/TabsIcon";

export default function Controls() {
  const [isCollectionActive, setCollectionActive] = useState(false);
  const [isTabsActive, setTabsActive] = useState(false);

  return (
    <Flex gap={8}>
    <Input
        icon={<SearchIcon />}
        placeholder="search"
        size="md"
        variant="filled"
        radius="xl"
      />
      <ActionIcon
        size="xl"
        radius="xl"
        color="dark"
        variant="transparent"
        sx={{
          background: isCollectionActive
            ? palette.fullBlue
            : palette.Neutral200,
        }}
        onClick={() => setCollectionActive((prev) => !prev)}
      >
        <CollectionIcon
          fill="transparent"
          stroke={isCollectionActive ? palette.White : palette.Black}
        />
      </ActionIcon>
      <ActionIcon
        size="xl"
        radius="xl"
        color="dark"
        variant="transparent"
        sx={{
          background: isTabsActive ? palette.fullBlue : palette.Neutral200,
        }}
        onClick={() => setTabsActive((prev) => !prev)}
      >
        <TabsIcon fill={isTabsActive ? palette.White : palette.Black} />
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
