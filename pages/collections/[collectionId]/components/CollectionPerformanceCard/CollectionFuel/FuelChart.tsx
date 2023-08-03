import { Box } from "@mantine/core";

import { MONTH_FUEL_TOTAL_MAP } from "@/types/stove";
import ReactChart from "@/components/chart/ReactChart";

import { fuelSummaryToChartData } from "../helpers";

type Props = {
  fuelSummary: MONTH_FUEL_TOTAL_MAP;
};

export default function FuelChart({ fuelSummary }: Props) {
  const data = fuelSummaryToChartData(fuelSummary);

  return (
    <Box h="300px" id="fuel" key="fuel">
      <ReactChart
        data={data}
        chartType="line"
        min={0}
        label="kilograms sold at this day"
      />
    </Box>
  );
}
