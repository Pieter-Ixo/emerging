import { Text } from "@mantine/core";
import { MouseEventHandler } from "react";

import { palette } from "@/theme/palette";
import DownArrow from "@/assets/icons/down-arrow.svg";
import BaseIcon from "@/components/Presentational/BaseIcon";

type Props = {
  name: string;
  isColumnActive: boolean;
  onClick: MouseEventHandler<any>;
};

function CollectionAssetsHeadCell({ isColumnActive, name, onClick }: Props) {
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
      <Text style={{ display: "flex" }}>
        {`${name}`}
        {isColumnActive && (
          <BaseIcon
            Icon={DownArrow}
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

export default CollectionAssetsHeadCell;
