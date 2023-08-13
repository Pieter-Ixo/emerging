import { Fragment, useEffect } from "react";
import { MantineProvider } from "@mantine/core";
import Head from "next/head";
import { AppProps } from "next/app";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

import mantineTheme from "@/helpers/mantine/theme";
import { ChainProvider } from "@/context/chain";
import { WalletProvider } from "@/context/wallet";
import { CookstoveProvider } from "@/context/cookstove";
import { store } from "@/redux/store";

import "@/styles/globals.scss";
import Layout from "./_layout";

const persistor = persistStore(store);

function App({ Component, pageProps, router }: AppProps) {
  useEffect(() => {
    // window.purge is a DevTool to clear all chache, and saved Redux Store.
    // @ts-ignore
    window.purge = function purge() {
      persistor.purge();
      localStorage.clear();
      // @ts-ignore
      window.location.reload(true);
    };
  }, []);
  return (
    <>
      <Head>
        <title>Emerging App</title>
      </Head>

      <MantineProvider withGlobalStyles withNormalizeCSS theme={mantineTheme}>
        <ChainProvider>
          <WalletProvider>
            <CookstoveProvider>
              <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                  <Layout pathname={router.pathname}>
                    <Component {...pageProps} />
                  </Layout>
                </PersistGate>
              </Provider>
            </CookstoveProvider>
          </WalletProvider>
        </ChainProvider>
      </MantineProvider>
    </>
  );
}
export default App;
