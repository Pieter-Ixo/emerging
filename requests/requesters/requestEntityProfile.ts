import { requestEntityByID } from "@/requests/blocksync";
import request from "@/requests/request";
import {
  ICollectionProfile,
  IEntityExtended,
  IEntityProfile,
} from "@/types/entityCollections";
import getFullServiceEndpoint from "@/utils/getServiceEndpoint";
import fillProfileLinkedData from "@/helpers/fillProfileLinkedData";
import requestEntityTags from "./requestEntityTags";

export default async function requestEntityProfile(
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

export async function requestEntityWithProfile(
  id: string
): Promise<IEntityExtended> {
  const entity = await requestEntityByID(id);

  const [profile, tags] = await Promise.all([
    await requestEntityProfile(entity),
    await requestEntityTags(entity),
  ]);

  const profileFilled = fillProfileLinkedData(profile);

  return { ...entity, _profile: profileFilled, _tags: tags };
}
