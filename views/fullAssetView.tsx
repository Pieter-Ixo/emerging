import EmergingAssets from "@/components/emergingAssets/emerging_assets";
import EmergingAssetsFull from "@/components/emergingAssets/emerging_assets_full";
import EmergingAssetsSingle from "@/components/emergingAssets/emerging_assets_single";
import GraphPerf from "@/components/graphPerf/graphPerf";
import ImpactsSaved from "@/components/Impacts/impacts_saved";
import SmallEmerginglogo from "@/components/Navbar/icons/smallEmerging";
import { selectAuthState, setSelectedView } from "@/redux/userSlice";
import { palette } from "@/theme/palette";
import { smallLaptopBreakpoint, tabletBreakpoint } from "@/constants/breakpoints";
import {
  Container,
  Group,
  GroupedTransition,
  Text,
  ScrollArea,
} from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import GlobalIcon from "./icons/global-icon";
import PortfolioIcon from "./icons/portfolio-icon";

function FullAssetView() {
  const viewPortSize = useViewportSize();
  const signedIn = useSelector(selectAuthState);

  // Needed to trigger the animations
  const [transitionFirst, setTransitionFirst] = useState(false);
  const [transitionTop, setTransitionTop] = useState(false);
  const [transitionBottom, setTransitionBottom] = useState(false);
  const dispatch = useDispatch();

  const duration = 700;
  let transition,
    bigTransitionTop = false;

  if (signedIn.dashboardVisible && transition != false) {
    transition = false;
    //@ts-ignore
  } else if (!signedIn.dashboardVisible && transition != true) {
    transition = true;
  }

  if (!signedIn.walletConnected && bigTransitionTop != false) {
    bigTransitionTop = false;
    //@ts-ignore
  } else if (signedIn.walletConnected && bigTransitionTop != true) {
    bigTransitionTop = true;
  }

  useEffect(() => {
    setTransitionTop(bigTransitionTop);
    setTimeout(() => {
      setTransitionBottom(bigTransitionTop);
    }, duration);
  }, [bigTransitionTop]);

  useEffect(() => {
    setTransitionFirst(transition);
  }, [transition]);
  // end of animation section
  return (
    <>
      {viewPortSize.width <= tabletBreakpoint ? (
        <>
          {/* mobile */}
          {!signedIn.dashboardVisible ? (
            <>
              <Group
                style={{
                  display: "flex",
                  paddingTop: 16,
                  paddingBottom: 28,
                  width: 358,
                  margin: "auto",
                }}
              >
                <SmallEmerginglogo />
                <Text style={{ fontSize: 24, fontWeight: 300 }}>Assets</Text>
              </Group>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: viewPortSize.width,
                }}
              >
                <GroupedTransition
                  mounted={transitionFirst}
                  transitions={{
                    impacts: {
                      duration: duration,
                      transition: "slide-up",
                      timingFunction: "ease",
                    },
                  }}
                >
                  {(styles) => (
                    <Group
                      style={{
                        justifyContent: "center",
                        paddingBottom: 60,
                      }}
                    >
                      <div style={styles.impacts}>
                        <ScrollArea w={400}>
                          <EmergingAssetsFull />
                        </ScrollArea>
                      </div>
                    </Group>
                  )}
                </GroupedTransition>
              </div>
            </>
          ) : (
            <></>
          )}
        </>
      ) : (
        <>
          {/* Big Screen => tablet size or bigger */}
          <Container fluid style={{ display: "flex" }}>
            <Text style={{ fontSize: 40, paddingLeft: 20, paddingTop: 20 }}>
              <span style={{ color: palette.Neutral500 }}>Dashboard </span>
              Assets
            </Text>
            <div style={{ marginLeft: 24, marginTop: 30, display: "flex" }}>
              <div
                style={{ marginRight: 16, cursor: "pointer" }}
                onClick={() => dispatch(setSelectedView("global"))}
              >
                <GlobalIcon selected={signedIn.selectedView} />
              </div>
              <div
                onClick={() => dispatch(setSelectedView("portfolio"))}
                style={{ cursor: "pointer" }}
              >
                <PortfolioIcon selected={signedIn.selectedView} />
              </div>
            </div>
          </Container>

          {viewPortSize.width >= smallLaptopBreakpoint ? (
            <div style={{ display: "flex", paddingTop: 16 }}>
              <EmergingAssetsFull />
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                // width: viewPortSize.width,
              }}
            >
              <EmergingAssetsFull />
            </div>
          )}
        </>
      )}
    </>
  );
}

export default FullAssetView;
