/* eslint-disable prefer-destructuring */
import { ICollectionProfile } from "@/types/entityCollections";

export default function fillProfileLinkedData(
  profile: ICollectionProfile | undefined
): ICollectionProfile | undefined {
  if (!profile) return profile;
  const context = profile["@context"];

  let contextItem;

  if (Array.isArray(context)) {
    contextItem = context[1];
  } else {
    contextItem = context;
  }

  if (typeof contextItem === "object") {
    const web3 = contextItem?.web3;
    return {
      ...profile,
      imageUrl: profile.image.replace("web3:", web3),
      logoUrl: profile.logo.replace("web3:", web3),
    };
  }
  return profile;
}
