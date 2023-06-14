import { MantineProvider } from "@mantine/core";
import Head from "next/head";
import { AppProps } from "next/app";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

import Layout from "@/components/Navbar/layout";
import { ToastContainer } from "@/components/toast/toast";
import { ChainProvider } from "@/context/chain";
import { WalletProvider } from "@/context/wallet";
import { CookstoveProvider } from "@/context/cookstove";
import { store } from "@/redux/store";

import "@/styles/globals.scss";
import mantineTheme from "@/helpers/mantine/theme";

const persistor = persistStore(store);

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Emerging App</title>
      </Head>

      <MantineProvider withGlobalStyles withNormalizeCSS theme={mantineTheme}>
        <style jsx global>{`
          @font-face {
            font-family: "RobotoCondensed";
            src: url("/fonts/RobotoCondensed-Regular.ttf");
            font-weight: regular;
            font-style: normal;
            font-display: swap;
          }
        `}</style>
        <ChainProvider>
          <WalletProvider>
            <CookstoveProvider>
              <ToastContainer />
              <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                  <Layout>
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
