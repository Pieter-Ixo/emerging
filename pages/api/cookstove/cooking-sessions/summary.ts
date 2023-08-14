import type { NextApiRequest, NextApiResponse } from "next";

import { getSessionsMonthTotal } from "@/lib/cookstove/cookstoveSessionsSummary";
import { ChartDataItem } from "@/components/Presentational/Chart/types";

const authBasic =
  process.env.SUPAMOTO_AUTH_HEADER ??
  Buffer.from(
    `${process.env.SUPAMOTO_USER_ID}:${process.env.SUPAMOTO_USER_PASSWORD}`
  ).toString();

const cookstoveSessions = async (
  req: NextApiRequest,
  res: NextApiResponse<{ data: ChartDataItem[] | undefined } | { err: unknown }>
) => {
  const { deviceIds } = req.body as { deviceIds: number[] };
  if (!deviceIds) res.status(400).end();
  try {
    const data = await getSessionsMonthTotal(deviceIds, {
      Authorization: `Basic ${authBasic}`,
    });
    res.status(200).json({ data });
  } catch (err) {
    res.status(500).json({ err });
  }
  res.end();
};

export default cookstoveSessions;
