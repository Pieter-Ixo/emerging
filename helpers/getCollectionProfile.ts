import { request } from "@/requests/request";
import { ICollection, ICollectionProfile } from "@/types/entityCollections";
import getFullServiceEndpoint from "@/utils/getServiceEndpoint";

export default async function getCollectionProfile(
  collection: ICollection
): Promise<ICollectionProfile | undefined> {
  const profileEndpointLastPart = collection.settings.Profile.serviceEndpoint;
  const collectionProfileEndpoint = getFullServiceEndpoint(
    profileEndpointLastPart,
    collection.service
  );
  return request(collectionProfileEndpoint);
}
