import { useMemo } from "react";
import dynamic from "next/dynamic";
import { Box } from "@mantine/core";
import { AxisOptions } from "react-charts";

import { MONTH_SESSIONS_TOTAL_MAP } from "@/types/stove";
import { palette } from "@/theme/palette";

import { DataItem, summaryCalculateAll, summaryToChartData } from "../helpers";

const Chart = dynamic(() => import("react-charts").then((mod) => mod.Chart), {
  ssr: false,
});

type Props = {
  sessionsSummary: MONTH_SESSIONS_TOTAL_MAP;
};

export default function SessionsChart({ sessionsSummary }: Props) {
  const summary = summaryCalculateAll(sessionsSummary);
  const data = summaryToChartData(summary);
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
    <Box h="300px">
      <Chart
        options={{
          data: [{ label: "count of the cooking sessions", data }],
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
