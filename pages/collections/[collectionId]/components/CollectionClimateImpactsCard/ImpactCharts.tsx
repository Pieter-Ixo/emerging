import { Text, Flex } from "@mantine/core";
import { palette } from "@/theme/palette";

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

const TREES_LENGTH = 10;
const TREE_STEP = 100_000;

export default function ImpactsCharts({ activeTab, totalValue }: Props) {
  const [treesOpacities, setTreesOpacities] = useState<number[]>([]);

  const accentColor = getAccentColor(activeTab);

  const fillTreesOpacities = (): any[] => {
    const resultArray = Array.from({ length: TREES_LENGTH }, () => 0);

    let totalOpacity = totalValue;

    const filledArray = resultArray.map(() => {
      if (totalOpacity % TREE_STEP >= 0) {
        const temp = totalOpacity;

        totalOpacity -= TREE_STEP;

        return temp;
      }

      return 0;
    });

    const opacitiesArray = filledArray.map((num) => {
      switch (true) {
        case num >= TREE_STEP:
          return 1;
        case num >= 75_000 && num < TREE_STEP:
          return 0.75;
        case num >= 50_000 && num < 75_000:
          return 0.5;
        case num > 0 && num < 50_000:
          return 0.25;
        default:
          return 0;
      }
    });

    return opacitiesArray;
  };

  useEffect(() => {
    const opacitiesArray = fillTreesOpacities();
    setTreesOpacities(opacitiesArray);
  }, [totalValue]);

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
