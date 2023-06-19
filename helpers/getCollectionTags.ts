import { request } from "@/requests/request";
import { ICollection, ICollectionProfile } from "@/types/entityCollections";
import getFullServiceEndpoint from "@/utils/getServiceEndpoint";

export default async function getCollectionProfile(
  collection: ICollection
): Promise<ICollectionProfile | undefined> {
  const tagsEndpointLastPart = collection.settings.Tags.serviceEndpoint;
  const collectionTagsEndpoint = getFullServiceEndpoint(
    tagsEndpointLastPart,
    collection.service
  );
  const tags = await request<ICollectionProfile>(collectionTagsEndpoint);

  if (!tags) throw new Error("Panica!");

  return tags;
}
