import type { NextApiRequest, NextApiResponse } from "next";

import { ISupamoto } from "@/types/supamoto";

const authHeader = process.env.SUPAMOTO_AUTH_HEADER;

export default async function getSupamotoStoveSessionsByEntity(
  req: NextApiRequest,
  res: NextApiResponse<ISupamoto | null>
) {
  const entityExternalId = req.query?.entityExternalId;

  if (!entityExternalId) res.status(404).send(null);

  const options = {
    method: "GET",
    headers: { Authorization: `Basic ${authHeader}` },
  };

  const supamotoStoveSessionsResponse = await fetch(
    `https://api.supamoto.app/api/v2/stoves/${entityExternalId}/sessions/cooking/summary?startDate=2022-06-18&endDate=2023-06-17&groupBy=MONTH&movingAverage=3`,
    options
  );
  const supamotoStoveSessionsData = await supamotoStoveSessionsResponse.json();
  res.status(200).json(supamotoStoveSessionsData);
}
