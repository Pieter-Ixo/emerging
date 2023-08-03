import dynamic from "next/dynamic";
import React, { useEffect, useMemo, useState } from "react";
import { Box } from "@mantine/core";
import { AxisOptions } from "react-charts";

// TODO: this should not be imported from pages
import { DataItem } from "@/pages/collections/[collectionId]/components/CollectionPerformanceCard/helpers";
import { STOVE_PELLETS_CONTENT } from "@/types/stove";
import { palette } from "@/theme/palette";

import pelletsToBarChartData from "./pelletsToChartData";

// TODO: looking how we use Charts, we can move them all (4) to a separate component
const Chart = dynamic(() => import("react-charts").then((mod) => mod.Chart), {
  ssr: false,
});

export type ChartProps = {
  pellets: STOVE_PELLETS_CONTENT[];
};

export default function BarChart({ pellets }: ChartProps) {
  const [data, setData] = useState<DataItem[]>([]);

  useEffect(() => {
    setData(pelletsToBarChartData(pellets));
  }, []);

  const primaryAxis = useMemo(
    (): AxisOptions<DataItem> => ({ getValue: (datum) => datum.month }),
    []
  );

  const secondaryAxes = useMemo(
    (): AxisOptions<DataItem>[] => [
      { getValue: (datum) => datum.total, elementType: "bar", min: 0 },
    ],
    []
  );

  return (
    <Box h="300px" id="fuel" key="fuel">
      <Chart
        options={{
          data: [{ label: "kilograms sold at this month", data }],
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
