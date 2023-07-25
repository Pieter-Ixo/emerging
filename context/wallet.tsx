import { ChainNetwork } from "@ixo/impactxclient-sdk/types/custom_queries/chain.types";
import cls from "classnames";
import {
  HTMLAttributes,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import utilsStyles from "@/styles/utils.module.scss";
import { EVENT_LISTENER_TYPE } from "@/constants/events";
import useWalletData from "@/hooks/useWalletData";
import {
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
} from "@/utils/persistence";
import { queryAllBalances } from "@/utils/query";
import { initializeWallet } from "@/utils/wallets";
import { KEPLR_CHAIN_INFO_TYPE } from "@/types/chain";
import { WALLET, WALLET_TYPE } from "@/types/wallet";
import { ChainContext } from "./chain";

export const WalletContext = createContext({
  wallet: {} as WALLET,
  updateWalletType: (newWalletType: WALLET_TYPE) => {},
  fetchAssets: () => {},
  clearAssets: () => {},
  updateChainId: (chainId: string) => {},
  updateChainNetwork: (chainNetwork: ChainNetwork) => {},
  logoutWallet: () => {},
});

const DEFAULT_WALLET: WALLET = {
  walletType: undefined,
  user: undefined,
};

export function WalletProvider({ children }: HTMLAttributes<HTMLDivElement>) {
  const [wallet, setWallet] = useState<WALLET>(DEFAULT_WALLET);
  const [loaded, setLoaded] = useState<boolean>(false);
  const { chain, chainInfo, queryClient, updateChainId, updateChainNetwork } =
    useContext(ChainContext);
  const [balances, fetchBalances, clearBalances] = useWalletData(
    queryAllBalances,
    wallet?.user?.address
  );
  const walletKey = "wallet";

  const updateWallet = (newWallet: WALLET, override: boolean = false) => {
    if (override) {
      setWallet({ ...DEFAULT_WALLET, ...newWallet });
    } else setWallet((currentWallet) => ({ ...currentWallet, ...newWallet }));
  };

  const updateWalletType = (newWalletType: WALLET_TYPE) =>
    updateWallet({ walletType: newWalletType });

  const initializeWallets = async () => {
    try {
      const user = await initializeWallet(
        wallet.walletType,
        chainInfo as KEPLR_CHAIN_INFO_TYPE
      );
      updateWallet({ user });
    } catch (error) {
      console.error("Initializing wallets error:", error);
    }
  };

  const logoutWallet = () => {
    removeLocalStorage(walletKey);
    updateWallet({}, true);
  };

  const fetchAssets = () => {
    fetchBalances();
  };
  const clearAssets = () => {
    clearBalances();
  };

  const updateKeplrWallet = async () => {
    if (loaded && wallet.walletType) initializeWallets();
  };

  const updateWalletConnectWallet = async () => {
    if (loaded && wallet.walletType) initializeWallets();
  };

  useEffect(() => {
    if (loaded) fetchAssets();
  }, [wallet.user?.address, queryClient, chain.chainId]);

  useEffect(() => {
    if (loaded) setLocalStorage(walletKey, wallet);
  }, [wallet]);

  useEffect(() => {
    if (loaded && wallet.walletType) initializeWallets();
    if (wallet.walletType === WALLET_TYPE.walletConnect) {
      window.removeEventListener(
        EVENT_LISTENER_TYPE.keplr_keystorechange,
        updateKeplrWallet
      );
      window.addEventListener(
        EVENT_LISTENER_TYPE.wc_sessionupdate,
        updateWalletConnectWallet
      );
      window.addEventListener(
        EVENT_LISTENER_TYPE.wc_sessiondelete,
        logoutWallet
      );

      return () => {
        window.removeEventListener(
          EVENT_LISTENER_TYPE.wc_sessionupdate,
          updateWalletConnectWallet
        );
        window.removeEventListener(
          EVENT_LISTENER_TYPE.wc_sessiondelete,
          logoutWallet
        );
      };
    }

    window.removeEventListener(
      EVENT_LISTENER_TYPE.keplr_keystorechange,
      updateKeplrWallet
    );
    window.removeEventListener(
      EVENT_LISTENER_TYPE.wc_sessionupdate,
      updateWalletConnectWallet
    );
    window.removeEventListener(
      EVENT_LISTENER_TYPE.wc_sessiondelete,
      logoutWallet
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wallet.walletType, chain.chainId, chain.chainNetwork]);

  useEffect(() => {
    if (!chain.chainLoading && loaded && wallet.walletType) initializeWallets();
  }, [chain.chainLoading]);

  useEffect(() => {
    const persistedWallet = getLocalStorage<WALLET>(walletKey);
    setLoaded(true);
    if (persistedWallet) setWallet(persistedWallet);
  }, []);

  const value = {
    wallet: {
      ...wallet,
      balances,
      loading: balances.loading || chain.chainLoading,
    } as WALLET,
    updateWalletType,
    fetchAssets,
    clearAssets,
    updateChainId: updateChainId(clearAssets),
    updateChainNetwork: updateChainNetwork(clearAssets),
    logoutWallet,
  };

  return (
    <WalletContext.Provider value={value}>
      {!loaded ? (
        <main className={cls(utilsStyles.main, utilsStyles.columnCenter)}>
          <div className={utilsStyles.spacer3} />
          {/* <Loader size={30} /> */}
        </main>
      ) : (
        children
      )}
    </WalletContext.Provider>
  );
}
