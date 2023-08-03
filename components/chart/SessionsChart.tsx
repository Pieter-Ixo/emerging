import { useEffect, useState } from "react";
import { Box } from "@mantine/core";

import { STOVE_SESSIONS_CONTENT } from "@/types/stove";
import sessionsToLineChartData from "./sessionsToChartData";
import ReactChart from "./ReactChart";
import { DataItem } from "./types";

export type ChartProps = {
  sessions: STOVE_SESSIONS_CONTENT[];
};

export default function SessionsChart({ sessions }: ChartProps) {
  const [data, setData] = useState<DataItem[]>([]);

  useEffect(() => {
    setData(sessionsToLineChartData(sessions));
  }, []);

  return (
    <Box h="300px" id="sessions" key="sessions">
      <ReactChart
        data={data}
        chartType="line"
        min={0}
        label="sessions at this month"
      />
    </Box>
  );
}
