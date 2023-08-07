import Head from "next/head";
import { Flex } from "@mantine/core";
import { palette } from "@/theme/palette";
import Nav from "@/components/Layout/Navbar/navbar";
import { initStyles } from "@/theme/initStyles";

function CollectionsLayout({ children }) {
  return (
    <>
      <Head>
        <title>Emerging Collections</title>
      </Head>

      <Flex ml={initStyles.navWidth}>
        <Nav />
        <main
          style={{
            width: "100%",
            background: palette.Neutral50,
            margin: "60px 34px",
            overflow: "hidden",
          }}
        >
          {children}
        </main>
      </Flex>
    </>
  );
}
export default CollectionsLayout;
