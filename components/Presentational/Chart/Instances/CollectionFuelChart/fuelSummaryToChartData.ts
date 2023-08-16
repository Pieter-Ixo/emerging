import { MONTH_FUEL_TOTAL_MAP } from "@/types/stove";

import { ChartDataItem } from "../../types";

export default function fuelSummaryToChartData(
  summary: MONTH_FUEL_TOTAL_MAP
): ChartDataItem[] {
  const deviceData = Object.values(summary);
  const monthMap: Record<string, number> = {};

  deviceData.forEach((device) => {
    const monthEntries = Object.entries(device.dayMap);
    monthEntries.forEach(([month, purchase]) => {
      if (!month || purchase === undefined) return;

      if (typeof monthMap[month] === "number") {
        monthMap[month] += purchase;
      } else {
        monthMap[month] = purchase;
      }
    });
  });

  const data: ChartDataItem[] = [];
  Object.entries(monthMap).forEach(([month, total]) =>
    data.push({ month, total })
  );
  const sortedData = data.sort((a, b) => (a.month > b.month ? 1 : -1));

  return sortedData;
}
