import request from "@/requests/request";
import { ICollection, ICollectionTokenIpfs } from "@/types/entityCollections";
import getFullServiceEndpoint from "@/utils/getServiceEndpoint";

export default async function requestCollectionProfile(
  collection: ICollection
): Promise<ICollectionTokenIpfs | undefined> {
  const tagsEndpointLastPart = collection.linkedResource.find(
    (lr) => lr.id === "{id}#token"
  )?.serviceEndpoint;

  if (!tagsEndpointLastPart) throw new Error("Panica!");

  const collectionTagsEndpoint = getFullServiceEndpoint(
    tagsEndpointLastPart,
    collection.service
  );
  const tags = await request<ICollectionTokenIpfs>(collectionTagsEndpoint);

  if (!tags) throw new Error("Panica!");

  return tags;
}
