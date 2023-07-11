import { ISupamoto, ISupamotoCookingSumary } from "@/types/supamoto";

export async function requestSupamoto(
  entityExternalId: string | null
): Promise<ISupamoto | undefined> {
  if (!entityExternalId) return undefined;

  const supamotoResponse = await fetch(
    `/api/supamoto/stoveByEntity/${entityExternalId}`
  );
  const supamotoData = await supamotoResponse.json();
  return supamotoData;
}

export async function requestSupamotoCookingSummary(
  entityExternalId: string | null
): Promise<ISupamotoCookingSumary | undefined> {
  if (!entityExternalId) return undefined;

  const supamotoSummaryResponse = await fetch(
    `/api/supamoto/stoveByEntity/${entityExternalId}/sesstions`
  );
  const coockingSummaryData = await supamotoSummaryResponse.json();
  return coockingSummaryData;
}
