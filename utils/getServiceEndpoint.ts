import { IService } from "@/types/entityCollections";

const getFullServiceEndpoint = (
  serviceEndpoint: string,
  services: Array<Partial<IService> & { id: string }>
) => {
  // if url includes :// it means it already an https link most probably
  if (serviceEndpoint.includes("://")) return serviceEndpoint;

  const pos = serviceEndpoint.indexOf(":");
  if (pos === -1) return serviceEndpoint;

  const serviceId = serviceEndpoint.substring(0, pos);
  const endUrl = serviceEndpoint.substring(pos + 1);

  const neededService = services.find((s) => {
    const posHash = s.id.indexOf("#");
    const id = s.id.substring(posHash + 1);
    return id === serviceId;
  });
  const firstPartOfServiceEndpoint = neededService?.serviceEndpoint;
  if (!firstPartOfServiceEndpoint) return serviceEndpoint;

  return firstPartOfServiceEndpoint + endUrl;
};
export default getFullServiceEndpoint;
