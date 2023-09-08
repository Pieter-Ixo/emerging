import { PropsWithChildren, ReactNode } from "react";
import { Badge, Group, Text } from "@mantine/core";

import { palette } from "@/theme/palette";

import CO2IssuedIcon from "./icons/CO2IssuedIcon";
import CO2OffsetIcon from "./icons/CO2OffsetIcon";
import CO2Saved from "./icons/CO2Saved";

export enum ClimateImpactTab {
  SAVED = "SAVED",
  ISSUED = "ISSUED",
  OFFSET = "OFFSET",
}

type ImpactTabProps = PropsWithChildren & {
  isActive: boolean;
  activeBGColor: string;
  Icon: ReactNode;
  onClick: () => void;
};

function ImpactTab({
  isActive,
  activeBGColor,
  Icon,
  onClick,
  children,
}: ImpactTabProps) {
  return (
    <Badge
      variant="filled"
      h={46}
      px={20}
      radius={23}
      style={{
        textTransform: "none",
        cursor: "pointer",
      }}
      bg={isActive ? activeBGColor : palette.Neutral100}
      leftSection={<div style={{ paddingTop: 5, paddingRight: 5 }}>{Icon}</div>}
      onClick={onClick}
    >
      <Text
        size={16}
        weight={400}
        color={isActive ? palette.White : palette.Black}
      >
        {children}
      </Text>
    </Badge>
  );
}

type ImpactTabsProps = {
  activeTab: ClimateImpactTab;
  onSetTab: (tab: ClimateImpactTab) => void;
};

export default function ImpactTabs({ activeTab, onSetTab }: ImpactTabsProps) {
  return (
    <Group pb={28}>
      <ImpactTab
        isActive={activeTab === ClimateImpactTab.SAVED}
        activeBGColor={palette.fullBlue}
        onClick={() => onSetTab(ClimateImpactTab.SAVED)}
        Icon={
          <CO2Saved
            fill={
              activeTab === ClimateImpactTab.SAVED
                ? palette.White
                : palette.Black
            }
          />
        }
      >
        GHG avoided
      </ImpactTab>

      <ImpactTab
        isActive={activeTab === ClimateImpactTab.ISSUED}
        activeBGColor={palette.fullBlue}
        onClick={() => onSetTab(ClimateImpactTab.ISSUED)}
        Icon={
          <CO2IssuedIcon
            fill={
              activeTab === ClimateImpactTab.ISSUED
                ? palette.White
                : palette.Black
            }
          />
        }
      >
        CARBON issued
      </ImpactTab>

      <ImpactTab
        isActive={activeTab === ClimateImpactTab.OFFSET}
        activeBGColor="lime.7"
        onClick={() => onSetTab(ClimateImpactTab.OFFSET)}
        Icon={
          <CO2OffsetIcon
            fill={
              activeTab === ClimateImpactTab.OFFSET
                ? palette.White
                : palette.Black
            }
          />
        }
      >
        Credits retired
      </ImpactTab>
    </Group>
  );
}
