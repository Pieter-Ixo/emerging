import { ArrayElement } from "@/types/general";
import { STOVE_SESSIONS_CONTENT, STOVE_PERIODS } from "@/types/stove";
import { dynamicSort } from "@/utils/general";
import { datesFromPeriod } from "@/utils/supamoto";
import { CHART_DATA } from "./chart";

function getSessionsForPeriod(
  sessions: STOVE_SESSIONS_CONTENT[],
  period: STOVE_PERIODS
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

export default function sessionsToChartData(
  sessions: STOVE_SESSIONS_CONTENT[] = [],
  period: STOVE_PERIODS = STOVE_PERIODS.all
): CHART_DATA {
  const sessionsInPeriod = getSessionsForPeriod(sessions, period);

  const finalSessions: CHART_DATA = [];

  sessionsInPeriod.reduce(
    (previousSession, session, i): ArrayElement<CHART_DATA> => {
      if (i === 0) return { ...session };
      if (session.time === previousSession.time)
        return {
          ...previousSession,
          value: previousSession.value + session.value,
        };
      finalSessions.push(previousSession);
      return session;
    },
    {} as ArrayElement<CHART_DATA>
  );

  return finalSessions;
}
