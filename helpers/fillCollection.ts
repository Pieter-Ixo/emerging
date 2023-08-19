import requestCollectionProfile from "@/requests/requesters/requestCollectionProfile";
import getCollectionTags from "@/requests/requesters/requestCollectionTags";
import { ICollection, ICollectionExtended } from "@/types/entityCollections";

export default async function fillCollection(
  collection: ICollection
): Promise<ICollectionExtended> {
  const [profileData, tagData] = await Promise.all([
    await requestCollectionProfile(collection),
    await getCollectionTags(collection),
  ]);
  const filledCollection: ICollectionExtended = structuredClone(collection);
  filledCollection._profile = profileData;
  filledCollection._tags = tagData;
  return filledCollection;
}
