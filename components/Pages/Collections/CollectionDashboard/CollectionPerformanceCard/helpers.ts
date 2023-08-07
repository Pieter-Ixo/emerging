import { MONTH_FUEL_TOTAL_MAP, MONTH_SESSIONS_TOTAL_MAP } from "@/types/stove";

export function calculateTotalSessions(
  summary: MONTH_SESSIONS_TOTAL_MAP
): number {
  return Object.values(summary).reduce(
    (acc, device) =>
      acc + Object.values(device).reduce((acc2, month) => acc2 + month, 0),
    0
  );
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
