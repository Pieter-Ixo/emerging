import { Text, Flex } from "@mantine/core";
import { palette } from "@/theme/palette";

import Ratings from "react-ratings-declarative";
import { Suspense, useState } from "react";

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

export default function ImpactsCharts({ activeTab, totalValue }: Props) {
  const [rating] = useState(2.5);
  const accentColor = getAccentColor(activeTab);

  return (
    <Suspense fallback={<Loading />}>
      <Flex pt={28} align="flex-end">
        <Text size={56} color={accentColor} pr={10} fs="normal">
          {(totalValue || 0).toLocaleString()}
        </Text>
        <Text color={palette.Black} pb={18} fs="normal" weight={300}>
          kg CO₂ emissions saved
        </Text>
      </Flex>
      {/* TODO: Form array of opacities */}
      <Ratings rating={rating} widgetRatedColors={accentColor}>
        {[1, 0.4, 0.1, 0, 0].map((rate, i) => (
          <Ratings.Widget
            key={`rating-widget-climate-impacts-${i}`}
            widgetDimension="60px"
            svg={
              <TreeIcon
                key={`climate-impacts-icon-${i}`}
                fill={`rgba(43, 148, 245,${rate})`}
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
