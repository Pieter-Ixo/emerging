import { Flex } from "@mantine/core";
import Head from "next/head";
import { AppProps } from "next/app";

import { Nav } from "@/components/Navbar/navbar";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Emerging Collections</title>
      </Head>

      <Flex>
        <Nav />
        <main style={{ width: "100%", background: "#FAFAFA" }}>
          <Component {...pageProps} />
        </main>
      </Flex>
    </>
  );
}
export default App;
