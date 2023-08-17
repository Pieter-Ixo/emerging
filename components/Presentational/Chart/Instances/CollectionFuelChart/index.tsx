import { Box } from "@mantine/core";

import { MONTH_FUEL_TOTAL_MAP } from "@/types/stove";
import Chart from "@/components/Presentational/Chart";

// import fuelSummaryToChartData from "./fuelSummaryToChartData";
import { ChartDataItem } from "../../types";

type Props = {
  fuelSummary: ChartDataItem[];
  // fuelSummary: MONTH_FUEL_TOTAL_MAP;
};

export default function CollectionFuelChart({ fuelSummary }: Props) {
  // const data = fuelSummaryToChartData(fuelSummary);

  return (
    <Box h="300px" id="fuel" key="fuel">
      <Chart
        data={fuelSummary}
        chartType="bar"
        min={0}
        label="kilograms sold at this day"
      />
    </Box>
  );
}
