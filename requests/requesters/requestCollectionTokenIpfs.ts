import request from "@/requests/request";
import {
  ICollectionExtended,
  ICollectionTokenIpfs,
} from "@/types/entityCollections";

export default async function requestCollectionTokenIpfs(
  collection: ICollectionExtended
): Promise<ICollectionTokenIpfs | undefined> {
  const lastEndpointPartResource = collection.linkedResource.find((resourse) =>
    resourse.id.startsWith("{id}#token")
  );

  const collectionServicePrefix =
    lastEndpointPartResource?.serviceEndpoint.split(":")[0];

  if (!collectionServicePrefix) return undefined;

  let firstEndpointPart: string | undefined = "";

  firstEndpointPart = collection.service.find((service) =>
    service.id.endsWith(collectionServicePrefix)
  )?.serviceEndpoint;

  const lastEndpointPart =
    lastEndpointPartResource?.serviceEndpoint.split(":")[1];

  const endpoint = `${firstEndpointPart}${lastEndpointPart}`;

  const collectionTokenIpfs = await request<ICollectionTokenIpfs>(endpoint);

  if (!collectionTokenIpfs) throw new Error("Cannot get collectionTokenIpfs");

  return collectionTokenIpfs;
}
