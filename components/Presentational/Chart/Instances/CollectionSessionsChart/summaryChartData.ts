import { DataItem } from "@/components/Presentational/Chart/types";
import { MONTH_SESSIONS_TOTAL_MAP } from "@/types/stove";

export default function sessionsSummaryToChartData(
  sessionsSummary: MONTH_SESSIONS_TOTAL_MAP
): DataItem[] {
  const sessionsMap = Object.values(sessionsSummary).reduce(
    (acc, timeTotal) => {
      Object.entries(timeTotal).forEach(([month, total]) => {
        if (acc[month] === undefined) acc[month] = total;
        else acc[month] += total;
      });
      return acc;
    },
    {}
  );
  const data: DataItem[] = [];
  Object.entries(sessionsMap).forEach(([month, total]) => {
    data.push({ month, total });
  }, []);
  return data;
}
