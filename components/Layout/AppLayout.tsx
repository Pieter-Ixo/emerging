import Head from "next/head";
import { AppShell, Flex } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";

import { palette } from "@/theme/palette";
import Nav from "@/components/Layout/Navbar/navbar";
import { initStyles } from "@/theme/initStyles";

import MobileNav from "./MobileFooter/footer";

function AppLayout({ title, children }) {
  const isScreenWiderThanMobile = useMediaQuery("(min-width: 768px)");

  return (
    <AppShell
      padding="md"
      aside={isScreenWiderThanMobile ? <Nav /> : undefined}
      footer={isScreenWiderThanMobile ? undefined : <MobileNav />}
    >
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
