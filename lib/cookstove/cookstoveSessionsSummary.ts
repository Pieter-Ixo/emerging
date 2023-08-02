import axios from "axios";

import {
  MONTH_SESSIONS_TOTAL_MAP,
  STOVES_SESSIONS_SUMMARY,
} from "@/types/stove";

import { defaultStartDate, defaultEndDate } from "./pleaseDeleteThisAsap";

export async function getCookstoveSessionsSummary(
  deviceId: number,
  headers: {},
  startDate: string = defaultStartDate,
  endDate: string = defaultEndDate,
  groupBy: "DAY" | "WEEK" | "MONTH" = "DAY"
): Promise<STOVES_SESSIONS_SUMMARY | undefined> {
  try {
    const res = await axios.get(
      `https://api.supamoto.app/api/v2/stoves/${deviceId}/sessions/cooking/summary?startDate=${startDate}&endDate=${endDate}&groupBy=${groupBy}`,
      { headers }
    );

    return res.data;
  } catch (error) {
    console.error("Error fetching Cookstove Sessions: ", error);
    throw error;
  }
}

const memoisedSummary: MONTH_SESSIONS_TOTAL_MAP = {};

export async function getSessionsMonthTotal(
  deviceIds: number[],
  headers
): Promise<MONTH_SESSIONS_TOTAL_MAP | undefined> {
  const promises = deviceIds.map(async (deviceId) => {
    if (memoisedSummary[deviceId]) return;
    memoisedSummary[deviceId] = {};

    const cookstoveSesstion = await getCookstoveSessionsSummary(
      deviceId,
      headers
    );

    // TODO: avoid WET here`
    cookstoveSesstion?.content?.forEach((monthSummary) => {
      if (memoisedSummary[deviceId][monthSummary.timestamp] !== undefined) {
        memoisedSummary[deviceId][monthSummary.timestamp] += Number(
          monthSummary.count.total
        );
      } else {
        memoisedSummary[deviceId][monthSummary.timestamp] = Number(
          monthSummary.count.total
        );
      }
    });
  });
  await Promise.allSettled(promises);
  return memoisedSummary;
}