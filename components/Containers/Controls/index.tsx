import { Text, Flex, Input, Button, Tooltip } from "@mantine/core";
import { palette } from "@/theme/palette";
import { PortfolioViewMods } from "@/types/stove";
import { useState } from "react";

import BaseIcon from "@/components/Presentational/BaseIcon";
import SearchIcon from "@/assets/icons/search.svg";
import FilterIcon from "@/assets/icons/filter.svg";

import CollectionIcon from "./components/icons/CollectionIcon";
import TabsIcon from "./components/icons/TabsIcon";

type Props = {
  isSearchVisible?: boolean;
};

export default function Controls({ isSearchVisible = true }: Props) {
  // FIXME: EMERGING-177 implement search, filtering, and list type (grid or list)
  const [viewMode, setViewMode] = useState(PortfolioViewMods.iconView);

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

      <Tooltip label="This functionality is under development" withArrow>
        <span>
          <Button
            variant="unstyled"
            px={0}
            h="100%"
            data-disabled
            // FIXME: EMERGING-177 implement search, filtering, and list type (grid or list)
            sx={{
              "&[data-disabled]": { backgroundColor: palette.whiteTransparent },
            }}
          >
            <CollectionIcon />
          </Button>
        </span>
      </Tooltip>
      <Tooltip label="This functionality is under development" withArrow>
        <span>
          <Button
            variant="unstyled"
            px={0}
            h="100%"
            data-disabled
            // FIXME: EMERGING-177 implement search, filtering, and list type (grid or list)
            sx={{
              "&[data-disabled]": { backgroundColor: palette.whiteTransparent },
            }}
          >
            <TabsIcon />
          </Button>
        </span>
      </Tooltip>

      <Tooltip label="This functionality is under development" withArrow>
        <span>
          <Button
            h={44}
            variant="unstyled"
            w={100}
            radius="xl"
            // FIXME: EMERGING-177 implement search, filtering, and list type (grid or list)
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
