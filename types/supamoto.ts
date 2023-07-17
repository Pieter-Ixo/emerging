export type ISupamotoCustomer = {
  agreementPolicy: string;
};

export type ISupamoto = {
  deviceId: number;
  model: string;
  status: string;
  country: string;
  latitude: number;
  longitude: number;
  certificateCid: string;
  registrationDateTime: string;
  customer: ISupamotoCustomer;
};

export type ICount = {
  avg: number;
  total: number;
};

export type ISupamotoCookingSumaryContent = {
  timestamp: string;
  count: ICount;
  duration: ICount;
};
export type ISupamotoCookingSumary = {
  content: ISupamotoCookingSumaryContent[];
};
