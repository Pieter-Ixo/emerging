import { CHAIN_NETWORK_TYPE } from "@/types/chain";

const CHAIN_NETWORK = (process.env.NEXT_PUBLIC_CHAIN_NETWORK ||
  "mainnet") as CHAIN_NETWORK_TYPE;

const STATIC_RESOURCES_URL =
  CHAIN_NETWORK === "mainnet"
    ? "https://marketplace.emerging.eco"
    : "https://launchpad.ixo.world";

export default STATIC_RESOURCES_URL;
