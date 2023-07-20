import { Text, Flex } from "@mantine/core";
import { palette } from "@/theme/palette";
import Ratings from "react-ratings-declarative";
import { Suspense, useState } from "react";
import Loading from "./Loading";
import { ClimateImpactTab } from "./ImpactTabs";

type Props = {
  activeTab: ClimateImpactTab;
};

function getAccentColor(activeTab: ClimateImpactTab): string {
  switch (activeTab) {
    case ClimateImpactTab.OFFSET:
      return palette.greenFull;

    default:
      return palette.fullBlue;
  }
}

export default function ImpactsCharts({ activeTab }: Props) {
  const [rating] = useState(2.5);
  const accentColor = getAccentColor(activeTab);

  return (
    <Suspense fallback={<Loading />}>
      <Flex pt={28} align="flex-end">
        <Text size={56} color={accentColor} pr={10} fs="normal">
          31,212
        </Text>
        <Text color={palette.Black} pb={18} fs="normal" weight={300}>
          kg CO₂ emissions saved
        </Text>
      </Flex>
      <Text color={accentColor} fs="normal">
        ≈ 3.32 average yearly personal car emissions
      </Text>

      <Ratings rating={rating} widgetRatedColors={accentColor}>
        {[0, 1, 2, 3, 4].map((i) => (
          <Ratings.Widget
            key={`rating-widget-climate-impacts-${i}`}
            svgIconViewBox="0 0 60 51"
            widgetDimension="60px"
            svgIconPath="M49.75 4.14A4.699 4.699 0 0 0 45.312.984H10.938A4.7 4.7 0 0 0 6.5 4.14L0 22.86v25a3.134 3.134 0 0 0 3.125 3.125H6.25a3.125 3.125 0 0 0 3.125-3.125v-3.125h37.5v3.125A3.134 3.134 0 0 0 50 50.984h3.125a3.125 3.125 0 0 0 3.125-3.125v-25L49.75 4.14ZM10.937 35.36A4.681 4.681 0 0 1 6.25 30.67a4.681 4.681 0 0 1 4.688-4.687 4.681 4.681 0 0 1 4.687 4.687 4.681 4.681 0 0 1-4.688 4.688Zm34.376 0a4.681 4.681 0 0 1-4.688-4.688 4.681 4.681 0 0 1 4.688-4.687A4.681 4.681 0 0 1 50 30.67a4.681 4.681 0 0 1-4.688 4.688ZM6.25 19.734 10.938 5.67h34.374L50 19.734H6.25Z"
            widgetRatedColor={accentColor}
            widgetEmptyColors={palette.Neutral500}
            widgetHoverColor={accentColor}
          />
        ))}
      </Ratings>
    </Suspense>
  );
}
