import requestCollectionProfile from "@/requests/requesters/getCollectionProfile";
import getCollectionTags from "@/requests/requesters/getCollectionTags";
import getCollectionTokenIpfs from "@/requests/requesters/getCollectionTokenIpfs";
import { ICollection, ICollectionExtended } from "@/types/entityCollections";

export default async function fillCollection(
  collection: ICollection
): Promise<ICollectionExtended> {
  const [profileData, tagData, tokenIpfs] = await Promise.all([
    await requestCollectionProfile(collection),
    await getCollectionTags(collection),
    await getCollectionTokenIpfs(collection),
  ]);
  const filledCollection: ICollectionExtended = structuredClone(collection);
  filledCollection._profile = profileData;
  filledCollection._tags = tagData;
  filledCollection._tokenIpfs = tokenIpfs;
  return filledCollection;
}
