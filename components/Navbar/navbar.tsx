import Link from "next/link";
import { Box, Flex, Navbar } from "@mantine/core";

import { useAppSelector } from "@/hooks/redux";
import { palette } from "@/theme/palette";

import ConnectedAccount from "../connectedAccount/connected_account";
import ImpactCreditsCard from "../userBalance/ImpactCreditsCard";
import HeaderLogo from "../Header_Logo/Index";

export default function Nav() {
  const user = useAppSelector((state) => state.user);

  return (
    <Navbar
      p="xs"
      width={{ base: 360, sm: 360 }}
      h="100%"
      mih="100vh"
      bg={palette.Neutral200}
      withBorder={false}
    >
      <Navbar.Section p="xs" style={{ paddingBottom: 10 }}>
        <Flex justify="center" sx={{ padding: "20px 0px" }}>
          <Link href="/">
            <HeaderLogo />
          </Link>
        </Flex>
      </Navbar.Section>
      <Box sx={{ width: "100%" }}>
        <Navbar.Section p="xs">
          <ConnectedAccount />
        </Navbar.Section>
      </Box>
      {user.walletConnected && (
        <Navbar.Section p="xs">
          <ImpactCreditsCard />
        </Navbar.Section>
      )}
    </Navbar>
  );
}
