import {
  AccountData,
  Algo,
  DirectSignResponse,
  OfflineDirectSigner,
} from "@cosmjs/proto-signing";
import { isMobile } from "react-device-detect";
import { SignDoc } from "@ixo/impactxclient-sdk/types/codegen/cosmos/tx/v1beta1/tx";
import SignClient from "@walletconnect/sign-client";
import { SessionTypes } from "@walletconnect/types";
import { getSdkError } from "@walletconnect/utils";
import { WalletConnectModal } from "@walletconnect/modal";
import { ChainInfo } from "@keplr-wallet/types";
import { fromHex } from "@cosmjs/encoding";

import { TRX_FEE_OPTION, TRX_MSG } from "@/types/transactions";
import { USER } from "@/types/user";
import { EVENT_LISTENER_TYPE } from "@/constants/events";
import { palette } from "@/theme/palette";

import { stringifySignDoc } from "./encoding";
import { setLocalStorage } from "./persistence";
import { sendTransaction, initStargateClient } from "./client";
import { delay } from "./misc";

// change to true to see random logs for initializeWC()
// if 100% confident in WC, can remove this and logs
const log = false;

let signClient: SignClient;
let web3Modal: WalletConnectModal;
let web3ModalSubscription: undefined | (() => void);

export enum WC_METHODS {
  signDirect = "cosmos_signDirect",
  getAccounts = "cosmos_getAccounts",
}

const WalletConnectProjectId = process.env.NEXT_PUBLIC_WC_PROJECT_ID;
export const getWalletConnect = () => !!WalletConnectProjectId;

const getCurrentSession = () => {
  const sessions = signClient?.session?.getAll();
  if (!sessions.length) throw new Error("No current sessions");
  return sessions[0];
};

export const deleteSession = () => {
  const event = new Event(EVENT_LISTENER_TYPE.wc_sessiondelete);
  window.dispatchEvent(event);

  // clear wc sessions and pairings
  (signClient?.session.getAll() ?? []).forEach((session) =>
    signClient?.session.delete(session.topic, getSdkError("USER_DISCONNECTED"))
  );
  (signClient?.pairing.getAll() ?? []).forEach((pairing) =>
    signClient?.pairing.delete(pairing.topic, getSdkError("USER_DISCONNECTED"))
  );

  // clear web3modal subscription in case still active
  if (web3ModalSubscription) web3ModalSubscription();
};

export const initializeWC = async (
  chainInfo: ChainInfo
): Promise<USER | undefined> => {
  if (log) console.log("initializeWC");
  try {
    if (log) console.log("initializeWC::1");
    if (!getWalletConnect())
      throw new Error("WalletConnect cannot initialize without a project id");

    if (log) console.log("initializeWC::2");
    web3Modal = new WalletConnectModal({
      projectId: WalletConnectProjectId!,
      // walletConnectVersion: 2,
      themeMode: "light",
      chains: [chainInfo.chainId],
      themeVariables: {
        "--wcm-z-index": "4",
        "--wcm-accent-color": palette.accentActive,
        "--wcm-accent-fill-color": "#fff",
        "--wcm-background-color": "#090909",
      },
    });

    if (log) console.log("initializeWC::3");
    if (!web3Modal) throw new Error("Web3Modal is not initialized");
    if (log) console.log("initializeWC::4");
    if (!signClient)
      signClient = await SignClient.init({
        // logger: 'debug',
        // relayUrl: process.env.NEXT_PUBLIC_WC_RELAY_URL,
        projectId: WalletConnectProjectId,
        metadata: {
          name: "Collect Emerging",
          description: "SupaMoto Nifties",
          url: "https://collect.emerging.eco/",
          icons: [
            "https://pub-b70e83e3eb40427986dcead162fde832.r2.dev/image_nifty.png",
          ],
        },
      });
    if (log) console.log("initializeWC::5");
    if (typeof signClient === "undefined")
      throw new Error("WalletConnect is not initialized");

    if (log) console.log("initializeWC::6");
    signClient.on("session_event", (p) => {
      const event = new Event(EVENT_LISTENER_TYPE.wc_sessionevent);
      window.dispatchEvent(event);
    });
    if (log) console.log("initializeWC::7");
    signClient.on("session_update", ({ topic, params }) => {
      const event = new Event(EVENT_LISTENER_TYPE.wc_sessionupdate);
      window.dispatchEvent(event);
    });
    if (log) console.log("initializeWC::8");
    signClient.once("session_delete", deleteSession);

    if (log) console.log("initializeWC::9");
    let _session: SessionTypes.Struct;

    if (log) console.log("initializeWC::10");
    const sessions = signClient.session.getAll();

    if (log) console.log("initializeWC::11");
    if (sessions.length) {
      if (log) console.log("initializeWC::11.1");
      const curSession = sessions[0];
      if (log) console.log("initializeWC::11.2");
      const curSessionNamespace = Object.keys(curSession?.namespaces)?.[0];
      if (log) console.log("initializeWC::11.3");
      const curSessionChain =
        // @ts-ignore
        curSession?.namespaces?.[curSessionNamespace]?.chains?.[0];
      if (log) console.log("initializeWC::11.4");
      const curSessionMatchesChain = curSessionChain?.includes(
        chainInfo.chainId
      );
      if (log) console.log("initializeWC::11.5");
      if (!curSessionMatchesChain) {
        if (log) console.log("initializeWC::11.5.1.1");
        signClient.session.delete(
          curSession.topic,
          getSdkError("USER_DISCONNECTED")
        );
        if (log) console.log("initializeWC::11.5.1.2");
        (signClient.session.getAll() ?? []).forEach((session) =>
          signClient.session.delete(
            session.topic,
            getSdkError("USER_DISCONNECTED")
          )
        );
        if (log) console.log("initializeWC::11.5.1.3");
        (signClient.pairing.getAll() ?? []).forEach((pairing) =>
          signClient.pairing.delete(
            pairing.topic,
            getSdkError("USER_DISCONNECTED")
          )
        );
      } else {
        if (log) console.log("initializeWC::11.5.2.1");
        const account = await onSessionConnected();
        return account;
      }
    }

    if (log) console.log("initializeWC::12");
    const namespaces = {
      ixo: {
        methods: Object.values(WC_METHODS),
        chains: [`${chainInfo.chainName}:${chainInfo.chainId}`],
        events: [],
      },
    };
    if (log) console.log("initializeWC::13", namespaces);
    const { uri, approval } = await signClient.connect({
      // Optionally: pass a known prior pairing (e.g. from `signClient.core.pairing.getPairings()`) to skip the `uri` step.
      // pairingTopic: pairing?.topic,
      requiredNamespaces: namespaces,
    });

    if (log) console.log("initializeWC::14");
    // Open QRCode modal if a URI was returned (i.e. we're not connecting an existing pairing).
    if (!uri) throw new Error("Failed to connect via WalletConnect");

    if (log) console.log("initializeWC::15");
    web3ModalSubscription = web3Modal.subscribeModal(({ open }) => {
      if (!open)
        setTimeout(() => {
          if (!_session) deleteSession();
        }, 1500);
    });

    if (log) console.log("initializeWC::16");
    // Check if mobile and then manually do the deeplink, until we add the mobile app to web3 modal wallets
    if (isMobile) {
      if (log) console.log("window.open()");
      const newWindow = window.open(
        `ixomobile://wc?uri=${uri}`,
        "_top",
        "noopener,noreferrer"
      );
      if (newWindow) newWindow.opener = null;
    } else {
      if (log) console.log("web3Modal.openModal()");
      await web3Modal.openModal({
        uri,
        chains: namespaces.ixo.chains,
      });
    }

    if (log) console.log("initializeWC::17");
    // Await session approval from the wallet.
    // @ts-ignore
    _session = await Promise.race([approval(), pollSessions(chainInfo)]);

    if (log) console.log("initializeWC::18");
    if (!_session) throw new Error("WalletConnect connection rejected");

    if (log) console.log("initializeWC::19");
    const account = await onSessionConnected();
    if (log) console.log("initializeWC::20");
    return account;
  } catch (e) {
    console.error("walletConnect::initializeWC::", e);
    deleteSession();
  } finally {
    // clear web3modal subscription in case still active
    if (web3ModalSubscription) web3ModalSubscription();
    // Close the QRCode modal in case it was open.
    if (log) console.log("web3Modal.closeModal()");
    web3Modal.closeModal();
  }
};

// Poll for session approval as browsers don't always trigger the event
const pollSessions = async (chainInfo: ChainInfo) => {
  await delay(1000);
  try {
    const sessions = signClient.session.getAll() ?? [];
    if (!sessions.length) throw new Error("No current sessions");
    const curSession = sessions[0];
    const curSessionNamespace = Object.keys(curSession?.namespaces)?.[0];
    const curSessionChain =
      curSession?.namespaces?.[curSessionNamespace]?.chains?.[0];
    const curSessionMatchesChain = curSessionChain?.includes(chainInfo.chainId);
    if (!curSessionMatchesChain) throw new Error("No current sessions");
    return curSession;
  } catch (error) {
    await pollSessions(chainInfo);
  }
};

const onSessionConnected = async (): Promise<USER | undefined> => {
  try {
    const accounts = await getAccounts();
    if (!accounts.length) return undefined;
    const account = accounts[0];
    // set now locally to persist wc acount and clear if no fresh sessions in timeframe
    setLocalStorage("lastUpdate", Date.now());
    return {
      name: "WalletConnect",
      pubKey: account.pubkey,
      address: account.address,
      algo: account.algo,
    };
  } catch (error) {
    console.error("walletConnect::onSessionConnected::", error);
  }
  return undefined;
};

export const getAccounts = async (): Promise<readonly AccountData[]> => {
  try {
    await delay(1000);
    const _session = getCurrentSession();
    const curSessionNamespace = Object.values(_session?.namespaces)?.[0];
    const namespaceAccount = curSessionNamespace.accounts[0];
    const [namespace, chainId, address] = namespaceAccount.split(":");
    if (log) console.log({ namespace, chainId, address });
    const chain = `${namespace}:${chainId}`;
    if (log) console.log({ chain, _session });
    const accounts = await signClient.request<
      {
        address: string;
        algo: Algo;
        // pubkey from wallet connect is hex encoded, must od decoding to byte array self
        pubkey: string;
      }[]
    >({
      topic: _session.topic,
      chainId: chain,
      request: {
        method: WC_METHODS.getAccounts,
        params: undefined,
      },
    });
    if (log) console.log({ accounts });

    return accounts.map((a) => ({ ...a, pubkey: fromHex(a.pubkey) }));
  } catch (error) {
    console.error("walletConnect::getAccounts::", error);
    return [];
  }
};

export const signDirect = async (
  signerAddress: string,
  signDoc: SignDoc
): Promise<DirectSignResponse> => {
  try {
    const _session = getCurrentSession();
    const namespaceAccount = Object.values(_session.namespaces)?.[0]
      ?.accounts?.[0];
    const [namespace, reference, address] = namespaceAccount.split(":");
    const chainId = `${namespace}:${reference}`;
    const result = await signClient.request<{
      signature: string;
      pub_key: { type: string; value: string };
    }>({
      topic: _session!.topic,
      chainId,
      request: {
        method: WC_METHODS.signDirect,
        params: { signerAddress, signDoc: stringifySignDoc(signDoc) },
      },
    });

    if (!result.signature)
      throw new Error("Failed to sign transaction with WalletConnect");

    return {
      signed: signDoc,
      signature: result,
    };
  } catch (error) {
    console.error("walletConnect::signDirect::", error);
    throw error;
  }
};

export const getOfflineSigner = (): OfflineDirectSigner => {
  const offlineSigner: OfflineDirectSigner = { getAccounts, signDirect };
  return offlineSigner;
};

export const connectWalletConnectAccount = async (
  chainInfo: ChainInfo
): Promise<any> => {
  const walletConnect = getWalletConnect();
  if (!walletConnect) return [null, null];
  const offlineSigner = getOfflineSigner();
  const accounts = await getAccounts();
  return [accounts, offlineSigner];
};

export const WCBroadCastMessage = async (
  msgs: TRX_MSG[],
  memo = "",
  fee: TRX_FEE_OPTION,
  feeDenom: string,
  chainInfo: ChainInfo
): Promise<string | null> => {
  try {
    const [accounts, offlineSigner] = await connectWalletConnectAccount(
      chainInfo
    );

    if (!accounts)
      throw new Error("No accounts found to broadcast transaction");
    if (!offlineSigner)
      throw new Error("No offlineSigner found to broadcast transaction");

    const address = accounts[0].address;
    const client = await initStargateClient(chainInfo.rpc, offlineSigner);
    const payload = {
      msgs,
      chain_id: chainInfo.chainId,
      fee,
      feeDenom,
      memo,
    };
    const result = await sendTransaction(client, address, payload);

    if (!result) throw new Error("Transaction Failed");

    return result.transactionHash;
  } catch (e) {
    // Toast.errorToast(`Transaction Failed`);
    return null;
  }
};
