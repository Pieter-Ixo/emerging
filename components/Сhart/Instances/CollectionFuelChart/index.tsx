import { Box } from "@mantine/core";

import { MONTH_FUEL_TOTAL_MAP } from "@/types/stove";
import Chart from "@/components/Сhart";

import { fuelSummaryToChartData } from "../../../../pages/collections/[collectionId]/components/CollectionPerformanceCard/helpers";

type Props = {
  fuelSummary: MONTH_FUEL_TOTAL_MAP;
};

export default function CollectionFuelChart({ fuelSummary }: Props) {
  const data = fuelSummaryToChartData(fuelSummary);

  return (
    <Box h="300px" id="fuel" key="fuel">
      <Chart
        data={data}
        chartType="line"
        min={0}
        label="kilograms sold at this day"
      />
    </Box>
  );
}
