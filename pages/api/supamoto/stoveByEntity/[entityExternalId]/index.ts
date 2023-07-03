import type { NextApiRequest, NextApiResponse } from "next";

import { ISupamoto } from "@/types/supamoto";

const authHeader = process.env.SUPAMOTO_AUTH_HEADER;

export default async function getSupamotoStoveByEntity(
  req: NextApiRequest,
  res: NextApiResponse<ISupamoto | null>
) {
  const entityExternalId = req.query?.entityExternalId;

  if (!entityExternalId) res.status(404).send(null);

  const options = {
    method: "GET",
    headers: { Authorization: `Basic ${authHeader}` },
  };

  const supamotoStoveResponse = await fetch(
    `https://api.supamoto.app/api/v2/stoves/${entityExternalId}`,
    options
  );
  const supamotoStoveData = await supamotoStoveResponse.json();
  res.status(200).json(supamotoStoveData);
}
