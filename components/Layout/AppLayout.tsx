import Head from "next/head";
import { AppShell, Box, Flex } from "@mantine/core";
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
        <Box
          w="100%"
          bg={palette.Neutral50}
          m={34}
          style={{
            overflow: "hidden",
          }}
        >
          {children}
        </Box>
      </Flex>
    </AppShell>
  );
}
export default AppLayout;
