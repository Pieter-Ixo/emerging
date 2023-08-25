import { useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { SegmentedControl } from "@mantine/core";

import { palette } from "@/theme/palette";
import CollectorDistributorModal from "@/components/Modals/CollectorDistributorModal/CollectorDistributorModal";

type ICollectorDistributorTabName = "collector" | "distributor";

export default function CollectorDistributorSwitch() {
  const [collectorDistributorTabName, setCollectorDistributorTabName] =
    useState<ICollectorDistributorTabName>("collector");
  const [opened, { open, close }] = useDisclosure();

  useEffect(() => {
    if (collectorDistributorTabName === "distributor") {
      open();
    }
  }, [collectorDistributorTabName]);

  function onModalClose() {
    setCollectorDistributorTabName("collector");
    close();
  }
  return (
    <>
      <SegmentedControl
        value={collectorDistributorTabName}
        fullWidth
        onChange={(value) =>
          setCollectorDistributorTabName(value as ICollectorDistributorTabName)
        }
        data={[
          { label: "collector", value: "collector" },
          { label: "distributor", value: "distributor" },
        ]}
        color={palette.fullBlue}
        radius={23}
      />
      <CollectorDistributorModal
        isModalOpened={opened}
        closeModal={() => onModalClose()}
      />
    </>
  );
}
