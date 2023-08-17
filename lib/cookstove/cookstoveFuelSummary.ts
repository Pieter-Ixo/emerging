import axios from "axios";

import { STOVE_PELLETS } from "@/types/stove";

import { ChartDataItem } from "@/components/Presentational/Chart/types";
import { defaultStartDate, defaultEndDate } from "./pleaseDeleteThisAsap";

export async function getCookstoveFuelSummary(
  deviceIds: number[],
  headers: {},
  startDate: string = defaultStartDate,
  endDate: string = defaultEndDate
): Promise<STOVE_PELLETS | undefined> {
  const res = await axios.post(
    `https://api.supamoto.app/api/v2/stoves/pellets/purchases?page=0&pageSize=500&startDate=${startDate}&endDate=${endDate}`,
    { deviceIds },
    { headers }
  );

  return res.data;
}

export async function getFuelMonthTotal(
  deviceIds: number[],
  headers
): Promise<ChartDataItem[] | undefined> {
  try {
    const pelletsPurchases = await getCookstoveFuelSummary(deviceIds, headers);

    if (!pelletsPurchases?.content) return undefined;

    const pelletsPurchasesMap: ChartDataItem[] = [];

    pelletsPurchases.content.forEach(({ dateTime, amount }) => {
      const purchaseDate = dateTime.split("T")[0];
      const existingItem = pelletsPurchasesMap.find(
        (item) => item.month === purchaseDate
      );
      if (existingItem) {
        existingItem.total += amount;
      } else {
        pelletsPurchasesMap.push({
          month: purchaseDate,
          total: amount,
        });
      }
    });

    return pelletsPurchasesMap;
  } catch (error) {
    console.error("Error fetching Cookstove Fuel Summary: ", error);
    return undefined;
  }
}
