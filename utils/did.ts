type Service = {
  id: string;
  type: string;
  serviceEndpoint: string;
};

export const getServiceEndpoint = (url: string, services: Service[]) => {
  // if url includes :// it means it already an https link most probably
  if (url.includes('://')) return url;

  const pos = url.indexOf(':');
  if (pos === -1) return url;

  const service = url.substring(0, pos);
  const endUrl = url.substring(pos + 1);

  const serviceEndpoint = services.findLast((s) => {
    const posHash = s.id.indexOf('#');
    const id = s.id.substring(posHash + 1);
    return id === service;
  })?.serviceEndpoint;
  if (!serviceEndpoint) return url;

  return serviceEndpoint + endUrl;
};
