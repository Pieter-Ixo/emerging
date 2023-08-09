import { Box } from "@mantine/core";

import Chart from "@/components/Presentational/Chart";
import { MONTH_SESSIONS_TOTAL_MAP } from "@/types/stove";
import sessionsSummaryToChartData from "./summaryChartData";

type Props = {
  sessionsSummary: MONTH_SESSIONS_TOTAL_MAP;
};

export default function CollectionSessionsChart({ sessionsSummary }: Props) {
  const data = sessionsSummaryToChartData(sessionsSummary);

  return (
    <Box h="300px" id="fuel" key="fuel">
      <Chart
        data={data}
        chartType="line"
        min={0}
        label="count of the cooking sessions"
      />
    </Box>
  );
}
