import request from "@/requests/request";
import { ICollection, ICollectionTags } from "@/types/entityCollections";
import getFullServiceEndpoint from "@/utils/getServiceEndpoint";

export default async function requestCollectionTags(
  collection: ICollection
): Promise<ICollectionTags | undefined> {
  const tagsEndpointLastPart = collection.settings.Tags.serviceEndpoint;
  const collectionTagsEndpoint = getFullServiceEndpoint(
    tagsEndpointLastPart,
    collection.service
  );
  const tags = await request<ICollectionTags>(collectionTagsEndpoint);

  if (!tags) throw new Error("Panica!");

  return tags;
}
