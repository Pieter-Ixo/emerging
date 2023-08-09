import { Text } from "@mantine/core";
import { MouseEventHandler } from "react";

import { palette } from "@/theme/palette";
import DownArrow from "@/icons/downArrow";

type Props = {
  name: string;
  isFilterActive: boolean;
  onClick: MouseEventHandler<any>;
};

function CollectionAssetsHeadCell({ isFilterActive, name, onClick }: Props) {
  return (
    <th
      onClick={onClick}
      style={{
        cursor: "pointer",
        color: isFilterActive ? palette.lightBlue : "black",
        width: 85,
        padding: "0 0 5px 0",
      }}
    >
      <Text style={{ display: "flex" }}>
        {`${name}`}
        {isFilterActive && <DownArrow fill={palette.lightBlue} />}
      </Text>
    </th>
  );
}

export default CollectionAssetsHeadCell;
