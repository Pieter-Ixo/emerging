import { ChartDataItem } from "@/components/Presentational/Chart/types";
import { MONTH_FUEL_TOTAL_MAP } from "@/types/stove";

export function calculateTotalSessions(summary: ChartDataItem[]): number {
  return summary.reduce((acc, { total }) => acc + total, 0);
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
