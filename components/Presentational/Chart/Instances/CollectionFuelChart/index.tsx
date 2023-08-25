import { Box } from "@mantine/core";

import Chart from "@/components/Presentational/Chart";

import { ChartDataItem } from "../../types";

type Props = {
  fuelSummary: ChartDataItem[];
};

export default function CollectionFuelChart({ fuelSummary }: Props) {
  return (
    <Box h="300px" id="collectionFuel" key="fuel">
      <Chart data={fuelSummary} chartType="bar" min={0} label="kg purchased" />
    </Box>
  );
}
