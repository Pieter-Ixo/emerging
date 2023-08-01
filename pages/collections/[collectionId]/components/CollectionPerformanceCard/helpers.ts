import { MONTH_FUEL_TOTAL_MAP, MONTH_SESSIONS_TOTAL_MAP } from "@/types/stove";

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

export function summaryToChartData(
  summary: Record<string, number>
): DataItem[] {
  const data: DataItem[] = [];
  Object.entries(summary).forEach(([month, total]) => {
    data.push({ month, total });
  }, []);
  return data;
}

export function calculateTotalSessions(
  summary: MONTH_SESSIONS_TOTAL_MAP
): number {
  return Object.values(summary).reduce(
    (acc, device) =>
      acc + Object.values(device).reduce((acc2, month) => acc2 + month, 0),
    0
  );
}

export function fuelSummaryToChartData(
  summary: MONTH_FUEL_TOTAL_MAP
): DataItem[] {
  const deviceData = Object.values(summary);
  const monthMap: Record<string, number> = {};

  deviceData.forEach((device) => {
    const monthEntries = Object.entries(device.dayMap);
    monthEntries.forEach(([month, purchase]) => {
      if (!month || purchase === undefined) return;
      if (monthMap[month] === undefined) monthMap[month] = purchase;
      else monthMap[month] += purchase;
    });
  });

  const data: DataItem[] = [];
  Object.entries(monthMap).forEach(([month, total]) =>
    data.push({ month, total })
  );
  const sortedData = data.sort((a, b) => (a.month > b.month ? 1 : -1));

  return sortedData;
}

export function calculateTotalFuel(summary: MONTH_FUEL_TOTAL_MAP): number {
  return Object.values(summary).reduce(
    (acc, device) => acc + (device?.total || 0),
    0
  );
}

export default function PagePlug() {
  return null;
}
