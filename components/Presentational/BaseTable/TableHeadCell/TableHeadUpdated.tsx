import BaseIcon from "@/components/Presentational/BaseIcon";
import { palette } from "@/theme/palette";
import { Flex, Text } from "@mantine/core";
import SortUpIcon from "@/assets/icons/sort-amount-up.svg";
import SortDownIcon from "@/assets/icons/sort-amount-down.svg";

import { IColumnHeader } from "@/types/entityCollections";

type Props = {
  columnHeader: IColumnHeader;
  centerHeaders?: boolean;
  onSort?: Function;
};

export default function TableHeadCellUpdated({
  columnHeader: {
    isActive = false,
    name,
    isSortable = false,
    cellField,
    sortOrder,
  },
  onSort,
  centerHeaders = false,
}: Props) {
  const isSortOrderActive = sortOrder !== "default";
  return (
    <th
      onClick={() => isSortable && onSort?.(cellField)}
      style={{
        cursor: "pointer",
        color: isSortOrderActive ? palette.accentActive : palette.Black,
        width: 85,
        padding: "0 0 5px 0",
      }}
    >
      <Flex justify={centerHeaders ? "center" : "flex-start"}>
        <Text fw={isActive ? 800 : 300} size="sm" pr={5}>
          {name}
        </Text>
        {sortOrder === "ascending" && (
          <BaseIcon
            Icon={SortDownIcon}
            width={24}
            cursorMode="pointer"
            height={20}
            fill={palette.accentActive}
          />
        )}
        {sortOrder === "descending" && (
          <BaseIcon
            Icon={SortUpIcon}
            width={24}
            cursorMode="pointer"
            height={20}
            fill={palette.accentActive}
          />
        )}
      </Flex>
    </th>
  );
}
