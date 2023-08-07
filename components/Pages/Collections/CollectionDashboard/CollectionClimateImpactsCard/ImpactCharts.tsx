import { Text, Flex } from "@mantine/core";
import { palette } from "@/theme/palette";
import fillTreesProgress from "@/helpers/impactCharts/fillTreesProgress";

import Ratings from "react-ratings-declarative";
import { Suspense, useEffect, useState } from "react";

import Loading from "./Loading";
import { ClimateImpactTab } from "./ImpactTabs";
import TreeIcon from "../CollectionNewsCard/icons/TreeIcon";

type Props = {
  activeTab: ClimateImpactTab;
  totalValue: number;
};

function getAccentColor(activeTab: ClimateImpactTab): string {
  switch (activeTab) {
    case ClimateImpactTab.OFFSET:
      return palette.greenFull;

    default:
      return palette.fullBlue;
  }
}

const getRateColor = (activeTab: ClimateImpactTab, rate: number): string => {
  switch (activeTab) {
    case ClimateImpactTab.OFFSET:
      return `rgba(97, 180, 58, ${rate})`;

    default:
      return `rgba(43, 148, 245,${rate})`;
  }
};

const getTabText = (activeTab: ClimateImpactTab): string => {
  switch (activeTab) {
    case ClimateImpactTab.SAVED:
      return "kg CO₂ emissions saved";

    case ClimateImpactTab.ISSUED:
      return "CARBON issued";

    default:
      return "kg CO₂ offset";
  }
};

export default function ImpactsCharts({ activeTab, totalValue }: Props) {
  const [treesOpacities, setTreesOpacities] = useState<number[]>([]);

  const accentColor = getAccentColor(activeTab);

  useEffect(() => {
    const opacities: number[] = fillTreesProgress(totalValue);
    setTreesOpacities(opacities);
  }, [totalValue]);

  return (
    <Suspense fallback={<Loading />}>
      <Flex align="flex-end">
        <Text size={56} color={accentColor} pr={10} fs="normal">
          {(totalValue || 0).toLocaleString()}
        </Text>
        <Text color={palette.Black} pb={18} fs="normal" weight={300}>
          {getTabText(activeTab)}
        </Text>
      </Flex>
      <Ratings>
        {treesOpacities?.map((rate, i) => (
          <Ratings.Widget
            key={`rating-widget-climate-impacts-${i}`}
            widgetDimension="60px"
            svg={
              <TreeIcon
                key={`climate-impacts-icon-${i}`}
                fill={getRateColor(activeTab, rate)}
              />
            }
            widgetRatedColor={accentColor}
            widgetEmptyColors={palette.Neutral500}
            widgetHoverColor={accentColor}
          />
        ))}
      </Ratings>
    </Suspense>
  );
}
