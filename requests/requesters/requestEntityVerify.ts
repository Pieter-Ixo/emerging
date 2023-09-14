import { IEntity } from "@/types/entityCollections";
import { CHAIN_NETWORK_TYPE } from "@/types/chain";
import request from "../request";

const defaultChainNetwork = (process.env.NEXT_PUBLIC_CHAIN_NETWORK ||
  "mainnet") as CHAIN_NETWORK_TYPE;

const verifyUrls: { [network in CHAIN_NETWORK_TYPE]: string } = {
  mainnet: "https://impacthub.ixo.world/rest/ixo/entity/",
  testnet: "https://testnet.ixo.earth/rest/ixo/entity/",
  devnet: "",
};

const chainVerifyUrl = verifyUrls[defaultChainNetwork];

export default async function requestEntityVerifyByDid(
  entityDid: string
): Promise<any | undefined> {
  const verifyResponse = await request<IEntity>(
    `${chainVerifyUrl}${entityDid}`
  );

  if (verifyResponse && verifyResponse.id) return verifyResponse;

  throw new Error("The entity has not been verified.");
}
