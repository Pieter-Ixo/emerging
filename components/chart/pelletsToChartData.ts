import { STOVE_PERIODS, STOVE_PELLETS_CONTENT } from "@/types/stove";
import { dynamicSort } from "@/utils/general";
import { datesFromPeriod } from "@/utils/supamoto";
import { DataItem } from "@/pages/collections/[collectionId]/components/CollectionPerformanceCard/helpers";
import { CHART_DATA } from "./chart";

function getPelletsForPeriod(
  pellets: STOVE_PELLETS_CONTENT[],
  period: STOVE_PERIODS
): CHART_DATA {
  const { endDate, startDate } = datesFromPeriod(period);
  const endDateMilliseconds = endDate.getTime();
  const startDateMilliseconds = startDate.getTime();

  return pellets
    .filter((s) => {
      const pelletDate = Date.parse(s.dateTime!);
      return (
        startDateMilliseconds < pelletDate && pelletDate < endDateMilliseconds
      );
    })
    .map((s) => ({
      time: s.dateTime!.split("T")[0],
      value: s.pelletsAmount!,
    }))
    .sort(dynamicSort("time"));
}

export default function pelletsToChartData(
  pellets: STOVE_PELLETS_CONTENT[] = [],
  period: STOVE_PERIODS = STOVE_PERIODS.all
): CHART_DATA {
  const pelletsInPeriod = getPelletsForPeriod(pellets, period);

  const joinedPellets = pelletsInPeriod.reduce((acc, item, i) => {
    if (i === 0) {
      acc.push(item);
    } else if (item.time === acc[i - 1]?.time) {
      acc.at(-1)!.value += item.value;
    } else {
      acc.push(item);
    }
    return acc;
  }, [] as CHART_DATA);

  return joinedPellets;
}

export function pelletsToBarChartData(
  pellets: STOVE_PELLETS_CONTENT[] = []
): DataItem[] {
  const pelletsMonthMap: Record<string, number> = {};

  pellets.forEach(({ dateTime, pelletsAmount }) => {
    if (dateTime === undefined) return;
    if (pelletsAmount === undefined) return;

    const month = dateTime.slice(0, 7) as string;
    if (pelletsMonthMap[month] !== undefined) {
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
