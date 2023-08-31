import BaseIcon from "@/components/Presentational/BaseIcon";
import { palette } from "@/theme/palette";
import { Flex, Text } from "@mantine/core";
import HeaderActive from "@/assets/icons/header-actvie.svg";
import { IColumnHeader } from "@/types/entityCollections";

type Props = {
  columnHeader: IColumnHeader;
  headerIndex: number;
  centerHeaders?: boolean;
  onSort?: Function;
};

export default function TableHeadCell({
  columnHeader: { isActive = false, name, isSortable = false },
  headerIndex,
  onSort,
  centerHeaders = false,
}: Props) {
  return (
    <th
      onClick={() => isSortable && onSort?.(headerIndex)}
      style={{
        cursor: "pointer",
        color: isActive ? palette.lightBlue : palette.Black,
        width: 85,
        padding: "0 0 5px 0",
      }}
    >
      <Flex justify={centerHeaders ? "center" : "flex-start"}>
        <Text fw={isActive ? 800 : 300} size="sm" pr={5}>
          {name}
        </Text>
        {isActive && (
          <BaseIcon
            Icon={HeaderActive}
            width={24}
            cursorMode="pointer"
            height={24}
            fill={palette.lightBlue}
          />
        )}
      </Flex>
    </th>
  );
}
