import { Box } from "@mantine/core";

import Chart from "@/components/Presentational/Chart";

import { ChartDataItem } from "../../types";

type Props = {
  costsSummary: ChartDataItem[];
};

export default function CollectionCostsChart({ costsSummary }: Props) {
  return (
    <Box h="300px" id="fuel" key="fuel">
      <Chart
        data={costsSummary}
        chartType="bar"
        min={0}
        label="savings per fuel kilogram"
      />
    </Box>
  );
}
