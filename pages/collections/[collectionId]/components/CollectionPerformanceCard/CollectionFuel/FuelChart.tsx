import { useMemo } from "react";
import dynamic from "next/dynamic";
import { Box } from "@mantine/core";
import { AxisOptions } from "react-charts";

import { MONTH_FUEL_TOTAL_MAP } from "@/types/stove";
import { palette } from "@/theme/palette";

import { DataItem, fuelSummaryToChartData } from "../helpers";

const Chart = dynamic(() => import("react-charts").then((mod) => mod.Chart), {
  ssr: false,
});

type Props = {
  fuelSummary: MONTH_FUEL_TOTAL_MAP;
};

export default function FuelChart({ fuelSummary }: Props) {
  const data = fuelSummaryToChartData(fuelSummary);

  const primaryAxis = useMemo(
    (): AxisOptions<DataItem> => ({ getValue: (datum) => datum.month }),
    []
  );

  const secondaryAxes = useMemo(
    (): AxisOptions<DataItem>[] => [
      { getValue: (datum) => datum.total, elementType: "line" },
    ],
    []
  );

  return (
    <Box h="300px" id="fuel" key="fuel">
      <Chart
        options={{
          data: [{ label: "kilograms sold at this day", data }],
          // @ts-ignore
          primaryAxis,
          // @ts-ignore
          secondaryAxes,

          getSeriesStyle: () => ({
            color: `url(#0)`,
            opacity: 1,
          }),
          renderSVG: () => (
            <defs>
              <linearGradient id="0" x1="0" x2="0" y1="1" y2="0">
                <stop offset="0%" stopColor={palette.fullBlue} />
              </linearGradient>
            </defs>
          ),
        }}
      />
    </Box>
  );
}
