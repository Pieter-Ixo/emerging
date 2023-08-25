import BaseIcon from "@/components/Presentational/BaseIcon";
import { palette } from "@/theme/palette";
import { Text } from "@mantine/core";
import HeaderActive from "@/assets/icons/header-actvie.svg";
import { IColumnHeader } from "@/types/entityCollections";

type Props = {
  columnHeader: IColumnHeader;
  headerIndex: number;
  onSort: Function;
};

export default function TableHeadCell({
  columnHeader: { isActive, name },
  headerIndex,
  onSort,
}: Props) {
  return (
    <th
      onClick={() => onSort(headerIndex)}
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
            Icon={HeaderActive}
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
