import BaseIcon from "@/components/Presentational/BaseIcon";
import { palette } from "@/theme/palette";
import { Text } from "@mantine/core";
import SorterActive from "@/assets/icons/sorter-actvie.svg";
import { IAssetColumnSorter } from "@/types/entityCollections";

type Props = {
  columnSorter: IAssetColumnSorter;
  sorterIndex: number;
  onSort: Function;
};

export default function TableHead({
  columnSorter: { isActive, name },
  sorterIndex,
  onSort,
}: Props) {
  return (
    <th
      onClick={() => onSort(sorterIndex)}
      style={{
        cursor: "pointer",
        color: isActive ? palette.lightBlue : palette.Black,
        width: 85,
        padding: "0 0 5px 0",
      }}
    >
      <Text fw={isActive ? 800 : 300} size="sm" style={{ display: "flex" }}>
        <Text pr={5}>{name}</Text>
        {isActive && (
          <BaseIcon
            Icon={SorterActive}
            width={24}
            isPointer
            height={24}
            fill={palette.lightBlue}
          />
        )}
      </Text>
    </th>
  );
}
