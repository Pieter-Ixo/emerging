import Head from "next/head";
import { Flex } from "@mantine/core";

import { Nav } from "@/components/Navbar/navbar";

function CollectionsLayout({ children }) {
  return (
    <>
      <Head>
        <title>Emerging Collections</title>
      </Head>

      <Flex>
        <Nav />
        <main style={{ width: "100%", background: "#FAFAFA" }}>{children}</main>
      </Flex>
    </>
  );
}
export default CollectionsLayout;
