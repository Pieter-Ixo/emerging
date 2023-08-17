import { ChartDataItem } from "@/components/Presentational/Chart/types";

export function calculateTotalSessions(summary: ChartDataItem[]): number {
  return summary.reduce((acc, { total }) => acc + total, 0);
}

export function calculateTotalFuel(summary: ChartDataItem[]): number {
  return Object.values(summary).reduce((acc, { total }) => acc + total, 0);
}

export default function PagePlug() {
  return null;
}
