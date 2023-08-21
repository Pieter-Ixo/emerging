import { useState } from "react";
import { SegmentedControl } from "@mantine/core";

import { palette } from "@/theme/palette";

type IAssetDistributorTabName = "asset" | "distributor";

export default function AssetDistributorSwitch() {
  const [assetDistributorTabName, setAssetDistributorTabName] =
    useState<IAssetDistributorTabName>("asset");

  return (
    <SegmentedControl
      value={assetDistributorTabName}
      onChange={(value) =>
        setAssetDistributorTabName(value as IAssetDistributorTabName)
      }
      data={[
        { label: "asset", value: "asset" },
        { label: "distributor", value: "distributor" },
      ]}
      color={palette.fullBlue}
      radius={23}
    />
  );
}
