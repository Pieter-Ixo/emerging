import { STOVE_PERIODS, STOVE_PELLETS_CONTENT } from "@/types/stove";
import { dynamicSort } from "@/utils/general";
import { datesFromPeriod } from "@/utils/supamoto";
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
      time: new Date(s.dateTime!).toISOString().split("T")[0],
      value: s.pelletsAmount!,
    }))
    .sort(dynamicSort("time"));
}

export default function pelletsToChartData(
  pellets: STOVE_PELLETS_CONTENT[] = [],
  period: STOVE_PERIODS = STOVE_PERIODS.all
): CHART_DATA {
  const sessionsInPeriod = getPelletsForPeriod(pellets, period);
  return sessionsInPeriod;
}
