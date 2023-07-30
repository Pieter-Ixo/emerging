import type { NextApiRequest, NextApiResponse } from "next";

import { getSessionsMonthTotal } from "@/lib/cookstove/cookstoveSessionsSummary";
import { MONTH_SESSIONS_TOTAL_MAP } from "@/types/stove";

const authBasic =
  process.env.SUPAMOTO_AUTH_HEADER ??
  Buffer.from(
    `${process.env.SUPAMOTO_USER_ID}:${process.env.SUPAMOTO_USER_PASSWORD}`
  ).toString();

export type CookstoveSessionsResponse = {
  error?: string;
  data?: MONTH_SESSIONS_TOTAL_MAP;
};

const cookstoveSessions = async (
  req: NextApiRequest,
  res: NextApiResponse<CookstoveSessionsResponse>
) => {
  const { deviceIds } = req.body as { deviceIds: number[] };
  if (!deviceIds) res.status(400).end();

  const monthTotal = await getSessionsMonthTotal(deviceIds, {
    Authorization: `Basic ${authBasic}`,
  });

  res.status(200).json({ data: monthTotal });

  res.end();
};

export default cookstoveSessions;
