import { selectAuthState } from "@/redux/userSlice";
import useWindowDimensions from "@/hooks/windowDimensions";
import { palette } from "@/theme/palette";
import { mobileBreakpoint, tabletBreakpoint } from "@/constants/breakpoints";
import {
  Group,
  Navbar,
  ThemeIcon,
  UnstyledButton,
  Text,
  Affix,
  GroupedTransition,
  Transition,
  Center,
} from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BottomButtons from "../bottomButtons/bottom_buttons";
import ConnectedAccount from "../connectedAccount/connected_account";
import DemoMode from "../demoMode/demoMode";
import AccountBalance from "../distributor/account_balances";
import MintActionCard from "../distributor/mintActionCard";
import HeaderLogo from "../Header_Logo/Index";
import BalanceCard from "../userBalance/balance_card";
import EmergingLogo from "./icons/emerging";

export const NavDist = () => {
  const { height, width } = useWindowDimensions();
  const counter = useSelector(selectAuthState);
  const walletConnected = useSelector(selectAuthState);
  const dispatch = useDispatch();
  const viewPortSize = useViewportSize();
  const [transitionFirst, setTranitionFirst] = useState(false);
  const [transitionSecond, setTranitionSecond] = useState(false);

  const duration = 600;

  useEffect(() => {
    setTranitionFirst(true);
  }, []);

  if (
    walletConnected.walletConnected &&
    transitionSecond != true &&
    transitionFirst != false
  ) {
    setTranitionSecond(true);
  }

  return (
    <Navbar
      height={walletConnected.walletConnected ? "101%" : "101vh"}
      p="xs"
      width={{ base: 360 }}
      bg={viewPortSize.width <= mobileBreakpoint ? "white" : "#F8F8F8"}
      withBorder={false}
    >
      <Navbar.Section p="xs" style={{ paddingBottom: 10 }}>
        <Group style={{ display: "flex" }}>

          <EmergingLogo />
          <Text
            style={{
              fontSize: 30,
              color: "#13263D",
              paddingTop: 3,
              fontWeight: 400,
              letterSpacing: 1.4,
            }}
          >
            emerging
          </Text>
        </Group>
      </Navbar.Section>
      <Navbar.Section p="xs">
        <Affix position={{ left: 0, top: 0 }}>
          <div
            style={{
              backgroundColor: palette.Neutral100,
              width: 361,
              height: "100vh",
              borderRightColor: palette.Neutral200,
              borderRightWidth: 1.7,
              borderRightStyle: "solid",
            }}
          ></div>
        </Affix>
        <DemoMode />
      </Navbar.Section>

      <Transition
        mounted={transitionFirst}
        transition="slide-up"
        duration={duration}
        timingFunction="ease"
      >
        {(styles) => (
          <div style={styles}>
            <Navbar.Section p="xs">
              <ConnectedAccount />
            </Navbar.Section>
          </div>
        )}
      </Transition>
      <Transition
        mounted={transitionSecond}
        transition="slide-up"
        duration={duration + 400}
        timingFunction="ease"
      >
        {(styles) => (
          <div style={styles}>
            <Navbar.Section p="xs">
              {walletConnected.walletConnected ? <AccountBalance /> : <></>}
            </Navbar.Section>
          </div>
        )}
      </Transition>
      <Transition
        mounted={transitionSecond}
        transition="slide-up"
        duration={duration + 800}
        timingFunction="ease"
      >
        {(styles) => (
          <div style={styles}>
            <Navbar.Section p="xs">
              {walletConnected.walletConnected ? (
                <MintActionCard counter={counter?.count} />
              ) : (
                <></>
              )}
            </Navbar.Section>
          </div>
        )}
      </Transition>

      <Navbar.Section grow> </Navbar.Section>

      <Navbar.Section>
        <Affix
          position={{ bottom: 0 }}
          style={{
            backgroundColor: palette.Neutral100,
            width: 352,
            zIndex: 1001,
            paddingTop: 10,
            paddingBottom: 10,
          }}
        >
          <Center>
            <Group>
              <BottomButtons

              />
            </Group>
          </Center>
        </Affix>
      </Navbar.Section>
    </Navbar>
  );
};
