import { Box } from "@mantine/core";

import Chart from "@/components/Presentational/Chart";

import { ChartDataItem } from "../../types";

type Props = {
  sessionsSavedTime?: ChartDataItem[];
};

export default function CollectionSessionsTimeChart({
  sessionsSavedTime,
}: Props) {
  return (
    <Box h="300px" id="time" key="time">
      <Chart
        data={sessionsSavedTime}
        chartType="line"
        min={0}
        label="minutes saved per session"
      />
    </Box>
  );
}
