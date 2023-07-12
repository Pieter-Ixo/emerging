import request from "@/requests/request";
import { ICollection, ICollectionProfile } from "@/types/entityCollections";
import getFullServiceEndpoint from "@/utils/getServiceEndpoint";
import fillProfileLinkedData from "./fillProfileLinkedData";

export default async function getCollectionProfile(
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
