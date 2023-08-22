import { ChartDataItem } from "@/components/Presentational/Chart/types";

export function calculateTotalSavedDollars(summary: ChartDataItem[]): number {
  return Math.round(summary.reduce((acc, { total }) => acc + total, 0));
}

// get dollars per 1 kilogram of fuel record
export function calculateSavedDollars(summary: ChartDataItem[]): ChartDataItem[] {
  return summary.map(({ total, month }) => ({
    month,
    total: total * 0.26,
  }));
}

export function calculateTotalSessions(summary: ChartDataItem[]): number {
  return summary.reduce((acc, { total }) => acc + total, 0);
}

// get saved minutes per 1 hour of session usage record
export function calculateSessionsSavedMinutes(
  summary: ChartDataItem[]
): ChartDataItem[] {
  return summary.map(({ total, month }) => ({
    month,
    total: total * 15,
  }));
}

// calculate hours from saved minutes of session usage record
export function calculateTotalSessionsSavedHours(
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
