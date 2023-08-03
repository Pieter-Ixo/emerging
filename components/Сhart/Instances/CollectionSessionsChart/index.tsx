import { Box } from "@mantine/core";

import Chart from "@/components/Сhart";
import { MONTH_SESSIONS_TOTAL_MAP } from "@/types/stove";

import {
  summaryCalculateAll,
  summaryToChartData,
} from "../../../../pages/collections/[collectionId]/components/CollectionPerformanceCard/helpers";

type Props = {
  sessionsSummary: MONTH_SESSIONS_TOTAL_MAP;
};

export default function CollectionSessionsChart({ sessionsSummary }: Props) {
  // TODO: do we need both functions below?
  const summary = summaryCalculateAll(sessionsSummary);
  const data = summaryToChartData(summary);

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
