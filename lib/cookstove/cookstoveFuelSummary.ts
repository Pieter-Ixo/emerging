import axios from "axios";

import { STOVE_PELLETS } from "@/types/stove";

import { ChartDataItem } from "@/components/Presentational/Chart/types";
import { defaultStartDate, defaultEndDate } from "./pleaseDeleteThisAsap";

export async function getCookstoveFuelSummary(
  deviceIds: number[],
  headers: {},
  page: number = 0,
  pageSize: number = 500,
  startDate: string = defaultStartDate,
  endDate: string = defaultEndDate
): Promise<STOVE_PELLETS | undefined> {
  const res = await axios.post<STOVE_PELLETS>(
    `https://api.supamoto.app/api/v2/stoves/pellets/purchases?page=${page}&pageSize=${pageSize}&startDate=${startDate}&endDate=${endDate}`,
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
    
    if (pelletsPurchases && pelletsPurchases.totalPages > 1) {
      const promises: Promise<STOVE_PELLETS | undefined>[] = [];

      for (let i = 1; i < pelletsPurchases.totalPages; i += 1) {
        promises.push(getCookstoveFuelSummary(deviceIds, headers, i));
      }

      const nextPelletsPurchasesList = await Promise.all(promises);
      nextPelletsPurchasesList.forEach((nextPelletsPurchases) => {
        pelletsPurchases.content.push(...(nextPelletsPurchases?.content || []));
      });
    }

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
