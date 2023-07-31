import { MONTH_SESSIONS_TOTAL_MAP } from "@/types/stove";

export type DataItem = { month: string; total: number };

export function summaryCalculateAll(
  sessionsSummary: MONTH_SESSIONS_TOTAL_MAP
): Record<string, number> {
  return Object.values(sessionsSummary).reduce((acc, timeTotal) => {
    Object.entries(timeTotal).forEach(([month, total]) => {
      if (acc[month] === undefined) acc[month] = total;
      else acc[month] += total;
    });
    return acc;
  }, {});
}

export function summaryToChartData(summary: Record<string, number>) {
  const data: DataItem[] = [];
  Object.entries(summary).forEach(([month, total]) => {
    data.push({ month, total });
  }, []);
  return data;
}
