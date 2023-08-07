import fillProfileLinkedData from "@/helpers/fillProfileLinkedData";
import request from "@/requests/request";
import { ICollection, ICollectionProfile } from "@/types/entityCollections";
import getFullServiceEndpoint from "@/utils/getServiceEndpoint";

export default async function requestCollectionProfile(
  collection: ICollection
): Promise<ICollectionProfile | undefined> {
  const profileEndpointLastPart = collection.settings.Profile.serviceEndpoint;
  const collectionProfileEndpoint = getFullServiceEndpoint(
    profileEndpointLastPart,
    collection.service
  );
  const profile = await request<ICollectionProfile>(collectionProfileEndpoint);

  if (!profile) throw new Error("Panica!");

  const profileFilled = fillProfileLinkedData(profile);
  return profileFilled;
}
