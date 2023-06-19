import { IApiEntityCollectionsResponse, ICollection } from "@/types/entityCollections";

export default function getCollectionsDataFromResponse(
  responseData: IApiEntityCollectionsResponse
): ICollection[] {
  return responseData?.map((item) => item.collection);
}
