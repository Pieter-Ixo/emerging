import { requestBlocksyncAPI } from "@/requests/blocksync";
import {
  IEntityExtended,
  ITokenWhateverItMean,
} from "@/types/entityCollections";

const TEMPORARY_MOCK: ITokenWhateverItMean = {
  CARBON: {
    contractAddress:
      "ixo1nc5tatafv6eyq7llkr2gv50ff9e22mnf70qgjlv737ktmt4eswrqvg5w3c",
    description: "Carbon Credit",
    image:
      "https://ipfs.io/ipfs/bafkreidw5lg6mn2q33vj6gokazbl6yepsh3s32xf5z3evqu43s2ccqg3xy",
    tokens: {
      "998db61979e94a939cfaa635ba8c63d3": {
        collection: "did:ixo:entity:eb98bb2c92a62557b6c88c6f80e8d258",
        amount: 344,
        minted: 344,
        retired: 0,
      },
      "7686b305d326ca29c407d6f380cdf953": {
        collection: "did:ixo:entity:eb98bb2c92a62557b6c88c6f80e8d258",
        amount: 344,
        minted: 344,
        retired: 0,
      },
      "3ddbb8fed5db8fd6ff4f3422810496be": {
        collection: "did:ixo:entity:eb98bb2c92a62557b6c88c6f80e8d258",
        amount: 688,
        minted: 688,
        retired: 0,
      },
      "70c3ddbec25f0e0b238c8c5ca26722c9": {
        collection: "did:ixo:entity:eb98bb2c92a62557b6c88c6f80e8d258",
        amount: 688,
        minted: 688,
        retired: 0,
      },
      dd503e1988a4fd12f0d365247aae6b92: {
        collection: "did:ixo:entity:eb98bb2c92a62557b6c88c6f80e8d258",
        amount: 344,
        minted: 344,
        retired: 0,
      },
      "664bf8ddabb736d81f1a293273bac20b": {
        collection: "did:ixo:entity:eb98bb2c92a62557b6c88c6f80e8d258",
        amount: 688,
        minted: 688,
        retired: 0,
      },
      "3bdae0b2ac0c86c619e78938a63f85d4": {
        collection: "did:ixo:entity:eb98bb2c92a62557b6c88c6f80e8d258",
        amount: 688,
        minted: 688,
        retired: 0,
      },
      "6d76997fbe9498c7603863257ecf2424": {
        collection: "did:ixo:entity:eb98bb2c92a62557b6c88c6f80e8d258",
        amount: 688,
        minted: 688,
        retired: 0,
      },
      "4fc3b72b983bb045a53979a52039ea68": {
        collection: "did:ixo:entity:eb98bb2c92a62557b6c88c6f80e8d258",
        amount: 688,
        minted: 688,
        retired: 0,
      },
    },
  },
};
export default async function getEntityToken(
  entity: IEntityExtended
): Promise<ITokenWhateverItMean | undefined> {
  const tokenAddress = entity?.accounts.find(
    (acc) => acc.name === "admin"
  )?.address;

  if (!tokenAddress) throw new Error("Panica!");

  let tokenData = await requestBlocksyncAPI<ITokenWhateverItMean>(
    `/api/token/byAddress/${tokenAddress}`
  );
  tokenData = TEMPORARY_MOCK;

  if (!tokenData) throw new Error("Panica!");

  tokenData.CARBON._totalMinted = Object.values(
    tokenData.CARBON?.tokens || []
  ).reduce((acc, token) => acc + token.minted, 0);

  return tokenData;
}
