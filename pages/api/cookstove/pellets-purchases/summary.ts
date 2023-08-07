import type { NextApiRequest, NextApiResponse } from "next";

import { MONTH_FUEL_TOTAL_MAP } from "@/types/stove";

import { getFuelMonthTotal } from "@/lib/cookstove/cookstoveFuelSummary";

const authBasic =
  process.env.SUPAMOTO_AUTH_HEADER ??
  Buffer.from(
    `${process.env.SUPAMOTO_USER_ID}:${process.env.SUPAMOTO_USER_PASSWORD}`
  ).toString();

export type CookstoveFuelResponse = {
  error?: string;
  data?: MONTH_FUEL_TOTAL_MAP;
};

const cookstoveFuel = async (
  req: NextApiRequest,
  res: NextApiResponse<CookstoveFuelResponse>
) => {
  const { deviceIds } = req.body as { deviceIds: number[] };
  if (!deviceIds) res.status(400).end();

  const monthTotal = await getFuelMonthTotal(deviceIds, {
    Authorization: `Basic ${authBasic}`,
  });

  res.status(200).json({ data: monthTotal });

  res.end();
};

export default cookstoveFuel;
