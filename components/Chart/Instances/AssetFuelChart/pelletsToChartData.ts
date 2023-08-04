import { STOVE_PELLETS_CONTENT } from "@/types/stove";
import { DataItem } from "../../types";

export default function pelletsToBarChartData(
  pellets: STOVE_PELLETS_CONTENT[] = []
): DataItem[] {
  const pelletsMonthMap: Record<string, number> = {};

  pellets.forEach(({ dateTime, pelletsAmount }) => {
    if (dateTime === undefined) return;
    if (pelletsAmount === undefined) return;

    const month = dateTime.slice(0, 7);
    if (pelletsMonthMap[month]) {
      pelletsMonthMap[month] += pelletsAmount;
    } else {
      pelletsMonthMap[month] = pelletsAmount;
    }
  });

  const dataItems: DataItem[] = Object.entries(pelletsMonthMap).map(
    ([month, total]) => ({
      month,
      total,
    })
  );
  return dataItems;
}
