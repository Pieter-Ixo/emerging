import dynamic from "next/dynamic";
import React, { useMemo } from "react";
import { AxisOptions } from "react-charts";

import { palette } from "@/theme/palette";
import { ChartDataItem } from "./types";

const ReactChart = dynamic(
  () => import("react-charts").then((mod) => mod.Chart),
  {
    ssr: false,
  }
);

type ReactChartProps = {
  data?: ChartDataItem[];
  chartType: "bar" | "line";
  label: string;
  min?: number;
};

export default function Chart({
  data,
  chartType = "line",
  label,
  min,
}: ReactChartProps) {
  const primaryAxis = useMemo(
    (): AxisOptions<ChartDataItem> => ({ getValue: (datum) => datum.month }),
    []
  );

  const secondaryAxes = useMemo(
    (): AxisOptions<ChartDataItem>[] => [
      { getValue: (datum) => datum.total, elementType: chartType, min },
    ],
    []
  );

  if (!data) return null;
  if (data.length === 0) return <>No data</>;
  return (
    <ReactChart
      options={{
        data: [{ label, data }],
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
  );
}
