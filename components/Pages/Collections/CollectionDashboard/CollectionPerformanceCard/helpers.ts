import { ChartDataItem } from "@/components/Presentational/Chart/types";

export function calculateTotalCosts(summary: ChartDataItem[]): number {
  return Math.round(summary.reduce((acc, { total }) => acc + total, 0));
}

export function calculateCosts(summary: ChartDataItem[]): ChartDataItem[] {
  return summary.map(({ total, month }) => ({
    month,
    total: total * 1.26 - total,
  }));
}

export function calculateTotalSessions(summary: ChartDataItem[]): number {
  return summary.reduce((acc, { total }) => acc + total, 0);
}

export function calculateSessionsSavedTime(
  summary: ChartDataItem[]
): ChartDataItem[] {
  return summary.map(({ total, month }) => ({
    month,
    total: (total * 1.25 - total) * 60,
  }));
}

export function calculateTotalSessionsSavedTime(
  summary: ChartDataItem[]
): number {
  return Math.round(summary.reduce((acc, { total }) => acc + total, 0) / 60);
}

export function calculateTotalFuel(summary: ChartDataItem[]): number {
  return Object.values(summary).reduce((acc, { total }) => acc + total, 0);
}

export default function PagePlug() {
  return null;
}
