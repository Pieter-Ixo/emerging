import { Box } from "@mantine/core";

import Chart from "@/components/Presentational/Chart";

import { ChartDataItem } from "../../types";

type Props = {
  sessionsSummary: ChartDataItem[];
};

export default function CollectionSessionsChart({ sessionsSummary }: Props) {
  return (
    <Box h="300px" id="collectionSession" key="fuel">
      <Chart
        data={sessionsSummary}
        chartType="line"
        min={0}
        label="count of the cooking sessions"
      />
    </Box>
  );
}
