import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";
import { Box } from "@mantine/core";
import { AxisOptions } from "react-charts";

import { DataItem } from "@/pages/collections/[collectionId]/components/CollectionPerformanceCard/helpers";
import { palette } from "@/theme/palette";

import { STOVE_SESSIONS_CONTENT } from "@/types/stove";
import sessionsToLineChartData from "./sessionsToChartData";

const Chart = dynamic(() => import("react-charts").then((mod) => mod.Chart), {
  ssr: false,
});

export type ChartProps = {
  sessions: STOVE_SESSIONS_CONTENT[];
};

export default function SessionsChart({ sessions }: ChartProps) {
  const [data, setData] = useState<DataItem[]>([]);

  useEffect(() => {
    setData(sessionsToLineChartData(sessions));
  }, []);

  const primaryAxis = useMemo(
    (): AxisOptions<DataItem> => ({ getValue: (datum) => datum.month }),
    []
  );

  const secondaryAxes = useMemo(
    (): AxisOptions<DataItem>[] => [
      { getValue: (datum) => datum.total, elementType: "line", min: 0 },
    ],
    []
  );

  return (
    <Box h="300px" id="sessions" key="sessions">
      <Chart
        options={{
          data: [{ label: "sessions at this month", data }],
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
