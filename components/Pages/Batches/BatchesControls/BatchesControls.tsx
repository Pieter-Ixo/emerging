import { useState } from "react";
import { Text, Flex, ActionIcon } from "@mantine/core";

import { palette } from "@/theme/palette";

import TabsIcon from "@/icons/batches/TabsIcon";
import FilterIcon from "@/icons/batches/FilterIcon";
import CollectionIcon from "../../../../icons/collections/CollectionIcon";

export default function BatchesControls() {
  const [isCollectionActive, setCollectionActive] = useState(false);
  const [isTabsActive, setTabsActive] = useState(false);

  return (
    <Flex gap={8}>
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
