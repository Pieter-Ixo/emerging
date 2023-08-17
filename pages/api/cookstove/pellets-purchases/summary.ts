import type { NextApiRequest, NextApiResponse } from "next";

import { getFuelMonthTotal } from "@/lib/cookstove/cookstoveFuelSummary";
import { ChartDataItem } from "@/components/Presentational/Chart/types";

const authBasic =
  process.env.SUPAMOTO_AUTH_HEADER ??
  Buffer.from(
    `${process.env.SUPAMOTO_USER_ID}:${process.env.SUPAMOTO_USER_PASSWORD}`
  ).toString();

const cookstoveFuel = async (
  req: NextApiRequest,
  res: NextApiResponse<{ data: ChartDataItem[] | undefined } | { err: unknown }>
) => {
  const { deviceIds } = req.body as { deviceIds: number[] };
  if (!deviceIds) res.status(400).end();
  try {
    const monthTotal = await getFuelMonthTotal(deviceIds, {
      Authorization: `Basic ${authBasic}`,
    });
    res.status(200).json({ data: monthTotal });
  } catch (err) {
    res.status(500).json({ err });
  }
  res.end();
};

export default cookstoveFuel;
