import Head from "next/head";
import { AppShell, Flex } from "@mantine/core";
import { palette } from "@/theme/palette";
import Nav from "@/components/Layout/Navbar/navbar";
import { initStyles } from "@/theme/initStyles";

function AppLayout({ title, children }) {
  return (
    <AppShell padding="md" navbar={<Nav />}>
      <Head>
        <title>{title}</title>
      </Head>

      <Flex ml={initStyles.navWidth}>
        <main
          style={{
            width: "100%",
            background: palette.Neutral50,
            margin: "34px",
            overflow: "hidden",
          }}
        >
          {children}
        </main>
      </Flex>
    </AppShell>
  );
}
export default AppLayout;
