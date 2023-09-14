import { ICollection } from "@/types/entityCollections";
import { GlobalCollectionsState } from "./types";

export function getCollectionIndex(
  state: GlobalCollectionsState,
  collectionId: ICollection["id"]
): number {
  return state.globalCollections.findIndex(
    ({ collection }) => collection.id === collectionId
  );
}

export default {};
