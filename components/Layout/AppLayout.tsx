import Head from "next/head";
import { AppShell, Box, Flex } from "@mantine/core";

import { palette } from "@/theme/palette";
import Nav from "@/components/Layout/Navbar/navbar";
import { initStyles } from "@/theme/initStyles";

function AppLayout({ title, children }) {
  // TODO: Use when a mobile view is required
  // const isScreenWiderThanMobile = useMediaQuery("(min-width: 768px)");
  return (
    <AppShell
      padding="md"
      // TODO: Use when a mobile view is required
      // aside={isScreenWiderThanMobile ? <Nav /> : undefined}
      aside={<Nav />}
      // TODO: Use when a mobile view is required
      // footer={isScreenWiderThanMobile ? undefined : <MobileNav />}
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
