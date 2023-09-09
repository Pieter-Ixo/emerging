import { useEffect, useState } from "react";
import { useDisclosure } from "@mantine/hooks";
import { SegmentedControl } from "@mantine/core";

import { palette } from "@/theme/palette";
import CollectorDistributorModal from "@/components/Modals/CollectorDistributorModal";

type IUserRoleSwitchTabName = "collector" | "distributor";

export default function UserRoleSwitch() {
  const [collectorDistributorTabName, setCollectorDistributorTabName] =
    useState<IUserRoleSwitchTabName>("collector");
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
        onChange={(value: IUserRoleSwitchTabName) =>
          setCollectorDistributorTabName(value)
        }
        data={[
          { label: "collector", value: "collector" },
          { label: "distributor", value: "distributor" },
        ]}
        // FIXME:EMERGING-248 override and use mantine provider theme
        color="accentActive.0"
        radius={23}
      />
      <CollectorDistributorModal
        isModalOpened={opened}
        closeModal={() => onModalClose()}
      />
    </>
  );
}
