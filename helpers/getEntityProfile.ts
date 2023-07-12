import { requestEntityByID } from "@/requests/blocksync";
import request from "@/requests/request";
import {
  ICollectionProfile,
  IEntityExtended,
  IEntityProfile,
} from "@/types/entityCollections";
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

export default async function getEntityProfile(
  entity: IEntityExtended
): Promise<IEntityProfile | undefined> {
  const profileEndpointLastPart = entity.settings.Profile.serviceEndpoint;
  const collectionProfileEndpoint = getFullServiceEndpoint(
    profileEndpointLastPart,
    entity.service
  );
  const profile = await request<ICollectionProfile>(collectionProfileEndpoint);

  if (!profile) throw new Error("Panica!");

  const profileFilled = fillProfileLinkedData(profile);
  return profileFilled;
}
export async function getEntityWithProfile(
  id: string
): Promise<IEntityExtended> {
  const entity = await requestEntityByID(id);
  const profile = await getEntityProfile(entity);
  return { ...entity, _profile: profile };
}
