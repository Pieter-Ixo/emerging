import { Text } from "@mantine/core";
import { MouseEventHandler } from "react";

import DownArrow from "@/icons/downArrow";
import { palette } from "@/theme/palette";

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
        width: 65,
      }}
    >
      <Text style={{ display: "flex" }}>
        {`${name} `} {isFilterActive ? <DownArrow /> : null}
      </Text>
    </th>
  );
}

export default CollectionAssetsHeadCell;
