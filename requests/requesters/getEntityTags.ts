import request from "@/requests/request";
import { ICollectionTags, IEntityExtended } from "@/types/entityCollections";
import getFullServiceEndpoint from "@/utils/getServiceEndpoint";

export default async function requestEntityTags(
  entity: IEntityExtended
): Promise<ICollectionTags | undefined> {
  const tagsEndpointLastPart = entity.settings.Tags.serviceEndpoint;
  const tagsEndpoint = getFullServiceEndpoint(
    tagsEndpointLastPart,
    entity.service
  );

  const tags = await request<ICollectionTags>(tagsEndpoint);
  if (!tags) throw new Error("Panica!");

  return tags;
}
