import { useAppSelector } from "@/hooks/redux";
import { Affix, Box, Flex, Navbar } from "@mantine/core";
import Link from "next/link";
import HeaderLogo from "../Header_Logo/Index";
import BuyAndSell from "../buyAndSell/buy_and_sell";
import ConnectedAccount from "../connectedAccount/connected_account";
import BalanceCard from "../userBalance/balance_card";

export default function Nav() {
  const user = useAppSelector((state) => state.user);

  return (
    <Navbar
      p="xs"
      width={{ base: 360, sm: 360 }}
      height="100%"
      bg="#F2F2F2"
      withBorder={false}
    >
      <Navbar.Section p="xs" style={{ paddingBottom: 10 }}>
        <Affix position={{ left: 0, top: 0 }}>
          <div
            style={{
              backgroundColor: "#F2F2F2",
              width: 360,
              height: "100vh",
            }}
          />
        </Affix>
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
        <>
          <Navbar.Section p="xs">
            <BalanceCard />
          </Navbar.Section>
          <Navbar.Section p="xs">
            <BuyAndSell />
          </Navbar.Section>
        </>
      )}
    </Navbar>
  );
}
