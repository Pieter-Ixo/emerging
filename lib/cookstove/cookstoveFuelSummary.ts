import axios from "axios";

import { MONTH_FUEL_TOTAL_MAP, STOVE_PELLETS } from "@/types/stove";

import { defaultStartDate, defaultEndDate } from "./pleaseDeleteThisAsap";

export async function getCookstoveFuelSummary(
  deviceId: number,
  headers: {},
  startDate: string = defaultStartDate,
  endDate: string = defaultEndDate
): Promise<STOVE_PELLETS | undefined> {
  try {
    const res = await axios.get(
      `https://api.supamoto.app/api/v2/stoves/${deviceId}/pellets/purchases?startDate=${startDate}&endDate=${endDate}`,
      { headers }
    );

    return res.data;
  } catch (error) {
    console.error("Error fetching Cookstove Sessions: ", error);
    throw error;
  }
}

const memoisedSummary: MONTH_FUEL_TOTAL_MAP = {
  /**
    deviceID: {
      total: 130,
      dayMap: {
        "2023-05-09": 30,
        "2023-05-30": 20,
      }
    }
   */
};

export async function getFuelMonthTotal(
  deviceIds: number[],
  headers
): Promise<MONTH_FUEL_TOTAL_MAP | undefined> {
  const promises = deviceIds.map(async (deviceId) => {
    if (!deviceId || memoisedSummary[deviceId]) return;

    const pelletsPurchases = await getCookstoveFuelSummary(deviceId, headers);
    if (!pelletsPurchases) return;

    memoisedSummary[deviceId] = {
      total: pelletsPurchases.totalPelletsAmount,
      dayMap: {},
    };

    // TODO: can we avoid WET here?
    pelletsPurchases?.content?.forEach((purchase) => {
      if (!purchase?.dateTime || purchase.pelletsAmount === undefined) return;
      const purchaseDate = purchase.dateTime.split("T")[0];

      if (typeof memoisedSummary[deviceId].dayMap[purchaseDate] === "number")
        // @ts-ignore
        memoisedSummary[deviceId].dayMap[purchaseDate] += Number(
          purchase.pelletsAmount
        );
      else
        memoisedSummary[deviceId].dayMap[purchaseDate] = Number(
          purchase.pelletsAmount
        );
    });
  });
  await Promise.allSettled(promises);
  return memoisedSummary;
}
