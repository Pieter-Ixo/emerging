import { useState } from "react";
import { SegmentedControl } from "@mantine/core";

import { palette } from "@/theme/palette";

type IOwnerTabName = "asset" | "distributor";
export default function OwnerSwitch() {
  const [ownerTabName, setOwnerTabName] = useState<IOwnerTabName>("asset");

  return (
    <SegmentedControl
      value={ownerTabName}
      onChange={(value) => setOwnerTabName(value as IOwnerTabName)}
      data={[
        { label: "asset", value: "asset" },
        { label: "distributor", value: "distributor" },
      ]}
      color={palette.fullBlue}
      radius={23}
    />
  );
}
