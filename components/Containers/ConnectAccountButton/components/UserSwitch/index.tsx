import { useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { SegmentedControl } from "@mantine/core";

import { palette } from "@/theme/palette";
import CollectorDistributorModal from "@/components/Modals/CollectorDistributorModal";

type IUserSwitchTabName = "collector" | "distributor";

export default function UserSwitch() {
  const [collectorDistributorTabName, setCollectorDistributorTabName] =
    useState<IUserSwitchTabName>("collector");
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
        onChange={(value: IUserSwitchTabName) =>
          setCollectorDistributorTabName(value)
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
