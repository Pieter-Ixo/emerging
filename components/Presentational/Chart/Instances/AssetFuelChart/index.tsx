import { useMemo } from "react";
import { Box } from "@mantine/core";

import { STOVE_PELLETS_CONTENT } from "@/types/stove";

import pelletsToBarChartData from "./pelletsToChartData";
import Chart from "../..";
import { ChartDataItem } from "../../types";

export type ChartProps = {
  pellets: STOVE_PELLETS_CONTENT[];
};

export default function AssetFuelChart({ pellets }: ChartProps) {
  const pelletsChartData = useMemo<ChartDataItem[]>(
    () => pelletsToBarChartData(pellets),
    [pellets]
  );
  return (
    <Box h="300px" id="fuel" key="fuel">
      <Chart
        data={pelletsChartData}
        chartType="bar"
        min={0}
        label="kg purchased"
      />
    </Box>
  );
}
