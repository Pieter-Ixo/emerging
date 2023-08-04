import { STOVE_SESSIONS_CONTENT, STOVE_PERIODS } from "@/types/stove";
import { dynamicSort } from "@/utils/general";
import { datesFromPeriod } from "@/utils/supamoto";

import { DataItem } from "../../types";

function getSessionsForPeriod(
  sessions: STOVE_SESSIONS_CONTENT[],
  period: STOVE_PERIODS = STOVE_PERIODS.all
): DataItem[] {
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
      month: s.startDateTime?.slice(0, 10) as string,
      total: 1,
    }))
    .sort(dynamicSort("time"));
}

export default function sessionsToLineChartData(
  sessions: STOVE_SESSIONS_CONTENT[] = []
): DataItem[] {
  const sessionsInPeriod = getSessionsForPeriod(sessions);

  const sessionsMonthMap: Record<string, number> = {};

  sessionsInPeriod.forEach(({ month, total }) => {
    if (month === undefined) return;
    if (total === undefined) return;

    if (sessionsMonthMap[month] !== undefined) {
      sessionsMonthMap[month] += total;
    } else {
      sessionsMonthMap[month] = total;
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
