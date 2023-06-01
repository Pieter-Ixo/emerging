import { tabletBreakpoint } from "@/constants/breakpoints";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import useWindowDimensions from "@/hooks/windowDimensions";
import { selectAuthState } from "@/redux/userSlice";
import { palette } from "@/theme/palette";
import { Affix, Center, Group, Navbar, Transition } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { useEffect, useState } from "react";
import HeaderLogo from "../Header_Logo/Index";
import BottomButtons from "../bottomButtons/bottom_buttons";
import BuyAndSell from "../buyAndSell/buy_and_sell";
import ConnectedAccount from "../connectedAccount/connected_account";
import DemoMode from "../demoMode/demoMode";
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

  const [transitionFirst, setTranitionFirst] = useState(false);
  const [transitionSecond, setTranitionSecond] = useState(false);

  const duration = 600;

  let transition,
    secondTransition = false;

  if (!user.walletConnected) {
    transition = true;
  } else {
    transition = true;
    secondTransition = true;
  }

  useEffect(() => {
    setTranitionFirst(transition);
    setTranitionSecond(secondTransition);
  }, [transition, secondTransition]);

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
      height={navHeight}
      p="xs"
      width={{
        base: 360,
      }}
      bg="#F8F8F8"
      withBorder={false}
    >
      <Navbar.Section p="xs" style={{ paddingBottom: 10 }}>
        <Affix position={{ left: 0, top: 0 }}>
          <div
            style={{
              backgroundColor: palette.Neutral100,
              width: 354,
              height: "100vh",
              borderRightColor: palette.Neutral200,
              borderRightWidth: 1.7,
              borderRightStyle: "solid",
            }}
          ></div>
        </Affix>
        <Group style={{ display: "flex" }}>
          <HeaderLogo />
        </Group>
      </Navbar.Section>

      <Navbar.Section p="xs">
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

      {user.walletConnected && (
        <>
          <Transition
            mounted={transitionSecond}
            duration={duration + 400}
            timingFunction="ease"
            transition="slide-up"
          >
            {(styles) => (
              <div style={styles}>
                <Navbar.Section p="xs">
                  <BalanceCard />
                </Navbar.Section>
              </div>
            )}
          </Transition>
          <Transition
            mounted={transitionSecond}
            duration={duration + 800}
            timingFunction="ease"
            transition="slide-up"
          >
            {(styles) => (
              <div style={styles}>
                <Navbar.Section p="xs">
                  <BuyAndSell />
                </Navbar.Section>
              </div>
            )}
          </Transition>
        </>
      )}

      <Navbar.Section grow> </Navbar.Section>

      <Navbar.Section>
        <div style={{ height: 100 }}></div>
      </Navbar.Section>
    </Navbar>
  );
};
