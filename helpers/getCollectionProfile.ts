import request from "@/requests/request";
import { ICollection, ICollectionProfile } from "@/types/entityCollections";
import getFullServiceEndpoint from "@/utils/getServiceEndpoint";

function fillProfileLinkedData(
  profile: ICollectionProfile
): ICollectionProfile {
  const contextItem = profile["@context"][1];
  const web3 = typeof contextItem === "object" ? contextItem?.web3 : "";
  return {
    ...profile,
    imageUrl: profile.image.replace("web3:", web3),
    logoUrl: profile.logo.replace("web3:", web3),
  };
}

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
