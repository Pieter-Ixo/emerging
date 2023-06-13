import { CHAIN_NETWORK_TYPE } from "../types/chain";

export const ChainNames = ["impacthub"];
export const DefaultChainName = ChainNames[0];
export const EnableDeveloperMode = true;
export const DefaultChainNetwork = (process.env.NEXT_PUBLIC_CHAIN_NETWORK ||
  "devnet") as CHAIN_NETWORK_TYPE;

export const WalletConnectNamespace = "collect-merging";

// export const CHAIN_ID = process.env.NEXT_PUBLIC_CHAIN_ID ?? Object.keys(CHAINS)[1];

export const BlocksyncUrls: { [network in CHAIN_NETWORK_TYPE]: string } = {
  mainnet: "https://blocksync.ixo.earth",
  testnet: "https://blocksync-pandora.ixo.earth",
  devnet: "https://devnet-blocksync.ixo.earth",
};
export const BlocksyncUrl = BlocksyncUrls[DefaultChainNetwork];
