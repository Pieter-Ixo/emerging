import { DataItem } from "@/pages/collections/[collectionId]/components/CollectionPerformanceCard/helpers";
import { STOVE_SESSIONS_CONTENT, STOVE_PERIODS } from "@/types/stove";
import { dynamicSort } from "@/utils/general";
import { datesFromPeriod } from "@/utils/supamoto";

import { CHART_DATA } from "./chart";

function getSessionsForPeriod(
  sessions: STOVE_SESSIONS_CONTENT[],
  period: STOVE_PERIODS = STOVE_PERIODS.all
): CHART_DATA {
  const { endDate, startDate } = datesFromPeriod(period);
  const endDateMilliseconds = endDate.getTime();
  const startDateMilliseconds = startDate.getTime();

  return sessions
    .filter((s) => {
      const sessionDate = Date.parse(s.startDateTime!);
      return (
        startDateMilliseconds < sessionDate && sessionDate < endDateMilliseconds
      );
    })
    .map((s) => ({
      time: s.startDateTime?.slice(0, 10) as string,
      value: 1,
    }))
    .sort(dynamicSort("time"));
}

export default function sessionsToLineChartData(
  sessions: STOVE_SESSIONS_CONTENT[] = []
): DataItem[] {
  const sessionsInPeriod = getSessionsForPeriod(sessions);

  const sessionsMonthMap: Record<string, number> = {};

  sessionsInPeriod.forEach(({ time, value }) => {
    if (time === undefined) return;
    if (value === undefined) return;

    if (sessionsMonthMap[time] !== undefined) {
      sessionsMonthMap[time] += value;
    } else {
      sessionsMonthMap[time] = value;
    }
  });

  const dataItems: DataItem[] = Object.entries(sessionsMonthMap).map(
    ([month, total]) => ({
      month,
      total,
    })
  );
  return dataItems;
}
