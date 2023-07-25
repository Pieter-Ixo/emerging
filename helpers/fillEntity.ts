import requestEntityDeviceCredential from "@/requests/requesters/getEntityDeviceCredential";
import requestEntityProfile from "@/requests/requesters/getEntityProfile";
import requestEntityTags from "@/requests/requesters/getEntityTags";
import requestUsersToken from "@/requests/requesters/getEntityToken";
import { IEntity, IEntityExtended } from "@/types/entityCollections";

export default async function fillEntity(
  entity: IEntity
): Promise<IEntityExtended> {
  const entityOwner = entity.accounts.find(
    (acc) => acc.name === "admin"
  )?.address;

  const [profile, adminToken, deviceCredential, tags] = await Promise.all([
    await requestEntityProfile(entity),
    entityOwner ? await requestUsersToken(entityOwner) : undefined,
    await requestEntityDeviceCredential(entity),
    await requestEntityTags(entity),
    // await requestSupamoto(entity.externalId),
    // await requestSupamotoCookingSummary(entity.externalId),
  ]);

  const filledEntity: IEntityExtended = structuredClone(entity);

  filledEntity._profile = profile;
  filledEntity._adminToken = adminToken;
  filledEntity._deviceCredential = deviceCredential;
  filledEntity._tags = tags;

  return filledEntity;
}

export async function fillEntityWithToken(
  entity: IEntity
): Promise<IEntityExtended> {
  const entityOwner = entity.accounts.find(
    (acc) => acc.name === "admin"
  )?.address;
  if (!entityOwner) return entity;

  const adminToken = await requestUsersToken(entityOwner);

  return { ...entity, _adminToken: adminToken };
}
