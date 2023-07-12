import { requestEntityByID } from "@/requests/blocksync";
import request from "@/requests/request";
import {
  ICollectionProfile,
  IEntityExtended,
  IEntityProfile,
} from "@/types/entityCollections";
import getFullServiceEndpoint from "@/utils/getServiceEndpoint";
import fillProfileLinkedData from "./fillProfileLinkedData";
import getEntityTags from "./getEntityTags";

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

  const [profile, tags] = await Promise.all([
    await getEntityProfile(entity),
    await getEntityTags(entity),
  ]);

  const profileFilled = fillProfileLinkedData(profile);

  return { ...entity, _profile: profileFilled, _tags: tags };
}
