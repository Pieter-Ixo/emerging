import request from "@/requests/request";
import { IEntityExtended } from "@/types/entityCollections";
import { IDeviceCredentials } from "@/types/entityCollections/deviceCredentials";

export default async function getEntityDeviceCredential(
  entity: IEntityExtended
): Promise<IDeviceCredentials | undefined> {
  const linkedResourse = entity.linkedResource.find(
    (lr) => lr.id === "{id}#deviceCredential"
  );
  const lrOrigin = linkedResourse?.serviceEndpoint.split(":")[0];
  const endpointLastPart = linkedResourse?.serviceEndpoint.split(":")[1];
  const endpointFirstPart = entity.service.find(
    (s) => s.id === `{id}#${lrOrigin}`
  )?.serviceEndpoint;

  const endpoint = `${endpointFirstPart}${endpointLastPart}`;
  const deviceCredentials = await request<IDeviceCredentials>(endpoint);

  if (!deviceCredentials) throw new Error("Panica!");
  return deviceCredentials;
}
