import Head from "next/head";
import { Flex } from "@mantine/core";
import { palette } from "@/theme/palette";
import Nav from "@/components/Navbar/navbar";

function BatchesLayout({ children }) {
  return (
    <>
      <Head>
        <title>Emerging Batches</title>
      </Head>

      <Flex>
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
export default BatchesLayout;
