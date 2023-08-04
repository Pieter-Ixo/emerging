import React, { useEffect, useState } from "react";
import { Box } from "@mantine/core";

import { STOVE_PELLETS_CONTENT } from "@/types/stove";

import pelletsToBarChartData from "./pelletsToChartData";
import Chart from "../..";
import { DataItem } from "../../types";

export type ChartProps = {
  pellets: STOVE_PELLETS_CONTENT[];
};

export default function AssetFuelChart({ pellets }: ChartProps) {
  const [data, setData] = useState<DataItem[]>([]);

  useEffect(() => {
    setData(pelletsToBarChartData(pellets));
  }, []);

  return (
    <Box h="300px" id="fuel" key="fuel">
      <Chart
        data={data}
        chartType="bar"
        min={0}
        label="kilograms sold at this month"
      />
    </Box>
  );
}
