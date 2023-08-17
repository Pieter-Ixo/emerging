import { MouseEventHandler } from "react";

import BaseIcon from "@/components/Presentational/BaseIcon";
import { palette } from "@/theme/palette";
import { Text } from "@mantine/core";
import SorterActive from "@/assets/icons/sorter-actvie.svg";

type Props = {
  name: string;
  isColumnActive: boolean;
  onClick: MouseEventHandler<any>;
};

export default function AssetsTableHeadCell({
  isColumnActive,
  name,
  onClick,
}: Props) {
  return (
    <th
      onClick={onClick}
      style={{
        cursor: "pointer",
        color: isColumnActive ? palette.lightBlue : palette.Black,
        width: 85,
        padding: "0 0 5px 0",
      }}
    >
      <Text
        fw={isColumnActive ? 800 : 300}
        size="sm"
        style={{ display: "flex" }}
      >
        <Text pr={5}>{`${name}`}</Text>
        {isColumnActive && (
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
