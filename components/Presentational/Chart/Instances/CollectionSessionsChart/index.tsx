import { Box } from "@mantine/core";

import Chart from "@/components/Presentational/Chart";
import { reverseDateFormat } from "@/utils/dates/dateTo";

import { ChartDataItem } from "../../types";

type Props = {
  sessionsSummary: ChartDataItem[];
};

export default function CollectionSessionsChart({ sessionsSummary }: Props) {
  return (
    <Box h="300px" id="collectionSession" key="fuel">
      <Chart
        data={sessionsSummary.map(({ total, month }) => ({
          total,
          month: reverseDateFormat(month),
        }))}
        chartType="line"
        min={0}
        label="usage sessions"
      />
    </Box>
  );
}
