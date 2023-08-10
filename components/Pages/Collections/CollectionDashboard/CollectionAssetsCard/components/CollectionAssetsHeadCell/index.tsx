import { Text } from "@mantine/core";
import { MouseEventHandler } from "react";

import { palette } from "@/theme/palette";
import DownArrow from "@/icons/downArrow";

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
        {isColumnActive && <DownArrow fill={palette.lightBlue} />}
      </Text>
    </th>
  );
}

export default CollectionAssetsHeadCell;
