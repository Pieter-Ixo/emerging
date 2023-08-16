import axios from "axios";

import { STOVES_SESSIONS_SUMMARY } from "@/types/stove";
import { ChartDataItem } from "@/components/Presentational/Chart/types";

import { defaultStartDate, defaultEndDate } from "./pleaseDeleteThisAsap";

export async function getCookstoveSessionsSummary(
  deviceIds: number[],
  headers: {},
  startDate: string = defaultStartDate,
  endDate: string = defaultEndDate,
  groupBy: "DAY" | "WEEK" | "MONTH" = "DAY"
): Promise<STOVES_SESSIONS_SUMMARY | undefined> {
  const res = await axios.post(
    `https://api.supamoto.app/api/v2/stoves/sessions/cooking/summary?startDate=${startDate}&endDate=${endDate}&groupBy=${groupBy}`,
    { deviceIds },
    { headers }
  );

  return res.data;
}

export async function getSessionsMonthTotal(
  deviceIds: number[],
  headers
): Promise<ChartDataItem[] | undefined> {
  try {
    const cookstoveSessionSummary = await getCookstoveSessionsSummary(
      deviceIds,
      headers
    );

    if (!cookstoveSessionSummary?.content) return undefined;

    const cookstoveSessionSummaryMap: ChartDataItem[] =
      cookstoveSessionSummary.content.map(
        ({ timestamp, count: { total } }) => ({
          month: timestamp,
          total,
        })
      );

    return cookstoveSessionSummaryMap;
  } catch (error) {
    console.error("Error fetching Cookstove Sessions: ", error);
    return undefined;
  }
}
