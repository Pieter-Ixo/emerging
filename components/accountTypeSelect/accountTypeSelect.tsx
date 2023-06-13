import { useEffect, useState } from "react";

import { shadow } from "@/theme/palette";
import {
  Button,
  Center,
  Group,
  Header,
  Text,
  Transition
} from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { loginAsset, loginDis, selectAuthState, userCarbonClaimable } from "@/redux/userSlice";
import { mobileBreakpoint, tabletBreakpoint } from "@/constants/breakpoints";
import HeaderLogo from "../Header_Logo/Index";
import AssetOwnerLogin from "../logIn/assetOwner_login";
import DistributorLogin from "../logIn/distributor_login";
import EmergingLogoSmall from "./icons/emerging";


function AccountTypeSelect() {
  const authState = useAppSelector(selectAuthState);
  const dispatch = useAppDispatch();
  const userClaimable = useAppSelector(userCarbonClaimable);

  const [transition, setTransition] = useState(false);

  const viewPortSize = useViewportSize();
  let buttonWidth: number = 400;

  if (
    viewPortSize.width <= tabletBreakpoint &&
    viewPortSize.width >= mobileBreakpoint
  ) {
    buttonWidth = 400;
  } else if (viewPortSize.width <= mobileBreakpoint) {
    buttonWidth = 350;
  }

  useEffect(() => {
    setTransition(true);
  }, []);


  return (
    <div>
      {viewPortSize.width >= 850 ? (
        <Header height={80} p="xs">
          <Group grow style={{ display: "flex", paddingLeft: 10 }}>
            <Group>
              <HeaderLogo />
            </Group>
            <Group style={{ justifyContent: "flex-end" }}>
              <Text style={{ fontSize: 20, color: "black" }}>About</Text>
              <Text style={{ fontSize: 20, color: "black", paddingLeft: 30 }}>
                Clean Cooking
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  color: "#5FA8EB",
                  paddingLeft: 30,
                  paddingRight: 100,
                }}
              >
                App
              </Text>
            </Group>
          </Group>
        </Header>
      ) : (
        <Center style={{ marginTop: 42 }}>
            <EmergingLogoSmall />
          </Center>
      )}

      {/* viewPortSize.width >= 880 */}
      <Group
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          display: "table-row",
        }}
      >
        <Text style={{ fontSize: 16, paddingBottom: 50, textAlign: "center" }}>
          Please choose which dashboard you would like to use.{" "}
        </Text>
        <Transition
          mounted={transition}
          transition="slide-up"
          duration={800}
          timingFunction="ease"
        >
          {(styles) => (
            <div style={styles}>
              <Button
                variant="subtle"
                w={buttonWidth}
                h={158}
                color="White"
                onClick={() => {
                  dispatch(loginDis());
                }}
                style={{ boxShadow: shadow.default, borderRadius: 16 }}
              >
                <DistributorLogin />
              </Button>
            </div>
          )}
        </Transition>

        <div style={{ paddingBottom: 30 }} />

        <Transition
          mounted={transition}
          transition="slide-up"
          duration={1200}
          timingFunction="ease"
        >
          {(styles) => (
            <div style={styles}>
              <Button
                variant="subtle"
                w={buttonWidth}
                h={158}
                color="White"
                onClick={() => dispatch(loginAsset())}
                style={{ boxShadow: shadow.default, borderRadius: 16 }}
              >
                <AssetOwnerLogin />
              </Button>
            </div>
          )}
        </Transition>
      </Group>
    </div>
  );
}

export default AccountTypeSelect;
