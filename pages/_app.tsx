import { ToastContainer } from "@/components/toast/toast";
import { ChainProvider } from "@/context/chain";
import { WalletProvider } from "@/context/wallet";
import { store } from "@/redux/store";
import { MantineProvider } from "@mantine/core";
import { AppProps } from "next/app";
import Head from "next/head";
import { Provider } from "react-redux";
import "@/styles/globals.css";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import { CookstoveProvider } from "@/context/cookstove";
import Layout from "@/components/Navbar/layout";

let persistor = persistStore(store);

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Emerging Dashboard</title>
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          fontFamily: "RobotoCondensed",
          colors: {
            FullBlue: [
              "#CEDCEA",
              "#ACC9E3",
              "#88B7E3",
              "#2B94F5",
              "#5297D7",
              "#4988C2",
              "#487AA8",
              "#4A6E8F",
              "#49627A",
              "#46586A",
            ],
            GreenFull: [
              "#95B885",
              "#83B46C",
              "#71B650",
              "#61B43A",
              "#5B973F",
              "#558041",
              "#4F6E40",
              "#485E3E",
              "#42523A",
              "#3C4837",
            ],
            White: [
              "#FFFFFF",
              "#FFFFFF",
              "#FFFFFF",
              "#FFFFFF",
              "#FFFFFF",
              "#FFFFFF",
              "#FFFFFF",
              "#FFFFFF",
              "#FFFFFF",
              "#FFFFFF",
            ],
            Grey: [
              "#F8F8F8",
              "#F8F8F8",
              "#D7D7D7",
              "#F8F8F8",
              "#F8F8F8",
              "#F8F8F8",
              "#F8F8F8",
              "#F8F8F8",
              "#F8F8F8",
              "#F8F8F8",
            ],
          },
        }}
      >
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
