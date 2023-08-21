import { PropsWithChildren, ReactNode } from "react";
import { Badge, Group, Text } from "@mantine/core";

import { palette } from "@/theme/palette";

import CO2IssuedIcon from "../CollectionClimateImpactsCard/icons/CO2IssuedIcon";
import CO2OffsetIcon from "../CollectionClimateImpactsCard/icons/CO2OffsetIcon";
import CO2Saved from "../CollectionClimateImpactsCard/icons/CO2Saved";

export enum ClimateImpactTab {
  SAVED = "SAVED",
  ISSUED = "ISSUED",
  OFFSET = "OFFSET",
}

// TODO: make this component properly support many props compositions
// TODO: this component is basically a button with icon and a text. It should correspond this description and take any role not only a tab
// TODO: this component taken from elsewhere. Refactor it to be able to work here and elsewhere
type ImpactTabProps = PropsWithChildren & {
  isActive?: boolean;
  activeBGColor?: string;
  Icon: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
};

export function PerformanceTab({
  isActive = false,
  activeBGColor,
  Icon,
  onClick,
  children,
  disabled,
}: ImpactTabProps) {
  const color = disabled || !isActive ? "Grey" : activeBGColor;

  return (
    <Badge
      variant="filled"
      h={46}
      px={isActive ? 20 : 10}
      radius={23}
      sx={{
        margin: 0,
        textTransform: "none",
        cursor: disabled ? "not-allowed" : "pointer",
        span: {
          marginRight: 0,
        },
      }}
      color={color}
      leftSection={
        <div style={{ paddingTop: 5, paddingRight: isActive ? 10 : 0 }}>
          {Icon}
        </div>
      }
      onClick={disabled ? undefined : onClick}
    >
      <Text
        size={16}
        weight={400}
        color={isActive ? palette.White : palette.Black}
      >
        {isActive && children}
      </Text>
    </Badge>
  );
}

type ImpactTabsProps = {
  activeTab: ClimateImpactTab;
  onSetTab: (tab: ClimateImpactTab) => void;
};

export default function PerformanceTabs({
  activeTab,
  onSetTab,
}: ImpactTabsProps) {
  return (
    <Group>
      <PerformanceTab
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
        CO₂ saved
      </PerformanceTab>

      <PerformanceTab
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
      </PerformanceTab>

      <PerformanceTab
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
        CO₂ offset
      </PerformanceTab>
    </Group>
  );
}
