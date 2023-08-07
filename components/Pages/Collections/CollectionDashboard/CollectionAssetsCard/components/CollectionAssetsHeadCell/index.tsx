import { Text } from "@mantine/core";
import React, { MouseEventHandler } from "react";
import DownArrow from "../../icons/downArrow";

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
        color: isFilterActive ? "#5FA8EB" : "black",
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
