import { Box } from "@mantine/core";

import ReactChart from "@/components/chart/ReactChart";
import { MONTH_SESSIONS_TOTAL_MAP } from "@/types/stove";

import { summaryCalculateAll, summaryToChartData } from "../helpers";

type Props = {
  sessionsSummary: MONTH_SESSIONS_TOTAL_MAP;
};

export default function SessionsChart({ sessionsSummary }: Props) {
  // TODO: do we need both functions below?
  const summary = summaryCalculateAll(sessionsSummary);
  const data = summaryToChartData(summary);

  return (
    <Box h="300px" id="fuel" key="fuel">
      <ReactChart
        data={data}
        chartType="line"
        min={0}
        label="count of the cooking sessions"
      />
    </Box>
  );
}
