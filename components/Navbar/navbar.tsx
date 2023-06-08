import { tabletBreakpoint } from "@/constants/breakpoints";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import useWindowDimensions from "@/hooks/windowDimensions";
import {
  Affix,
  Box,
  Flex,
  Navbar
} from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import Link from "next/link";
import HeaderLogo from "../Header_Logo/Index";
import BuyAndSell from "../buyAndSell/buy_and_sell";
import ConnectedAccount from "../connectedAccount/connected_account";
import BalanceCard from "../userBalance/balance_card";

interface Message {
  visible: boolean;
  message: String;
  date: String;
  sender: String;
  icon: any;
}

export const Nav = () => {
  const { height, width } = useWindowDimensions();
  const viewPortSize = useViewportSize();

  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

  let navHeight: any;

  if (viewPortSize.width >= tabletBreakpoint) {
    navHeight = "100vh";
  } else if (viewPortSize.width <= tabletBreakpoint && user.dashboardVisible) {
    navHeight = "100vh";
  } else if (viewPortSize.width <= tabletBreakpoint && !user.dashboardVisible) {
    navHeight = "0";
  }

  return (
    <Navbar
      p="xs"
      width={{ base: 360, sm: 360 }}
      height={"100%"}
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
          ></div>
        </Affix>
        <Flex justify={"center"} sx={{ padding: "20px 0px" }}>
          <Link href={"/"}>
            <HeaderLogo />
          </Link>
        </Flex>
      </Navbar.Section>

      {(styles) => (
        <Box style={styles} sx={{ width: "100%" }}>
          <Navbar.Section p="xs">
            <ConnectedAccount />
          </Navbar.Section>
        </Box>
      )}

      {user.walletConnected && (
        <>
          {(styles) => (
            <div style={styles}>
              <Navbar.Section p="xs">
                <BalanceCard />
              </Navbar.Section>
            </div>
          )}
          {(styles) => (
            <div style={styles}>
              <Navbar.Section p="xs">
                <BuyAndSell />
              </Navbar.Section>
            </div>
          )}
        </>
      )}
    </Navbar>
  );
};
