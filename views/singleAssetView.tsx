import EmergingAssets from "@/components/emergingAssets/emerging_assets";
import EmergingAssetsSingle from "@/components/emergingAssets/emerging_assets_single";
import GraphPerf from "@/components/graphPerf/graphPerf";
import ImpactsGenerated from "@/components/Impacts/impacts_generated";
import ImpactsOffsets from "@/components/Impacts/impacts_offsets";
import ImpactsSaved from "@/components/Impacts/impacts_saved";
import SmallEmerginglogo from "@/components/Navbar/icons/smallEmerging";
import { getEntityById } from "@/redux/collectionSlice";
import { selectAuthState, setSelectedView } from "@/redux/userSlice";
import { palette } from "@/theme/palette";
import {
  getCookingSessions,
  getCookingSessionsSummary,
  getPellets,
  getStovebyId,
} from "@/utils/api-helper";
import { smallLaptopBreakpoint, tabletBreakpoint } from "@/constants/breakpoints";
import {
  Container,
  Grid,
  Group,
  GroupedTransition,
  Text,
  Transition,
} from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import React, { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import GlobalIcon from "./icons/global-icon";
import PortfolioIcon from "./icons/portfolio-icon";
import Loading from "./loading";

function SingleAssetView() {
  const viewPortSize = useViewportSize();
  const signedIn = useSelector(selectAuthState);

  const duration = 700;
  let transition,
    bigTransitionTop = false;

  // Needed to trigger the animations
  const [transitionFirst, setTransitionFirst] = useState(false);
  const [transitionTop, setTransitionTop] = useState(false);
  const [transitionBottom, setTransitionBottom] = useState(false);
  const dispatch = useDispatch();

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
    setTimeout(() => {
      setTransitionTop(bigTransitionTop);
    }, duration - 600);
    setTimeout(() => {
      setTransitionBottom(bigTransitionTop);
    }, duration);
  }, [bigTransitionTop]);

  useEffect(() => {
    setTransitionFirst(transition);
  }, [transition]);
  // end of animation section

  //  Api Calls
  const [data, setData] = useState();
  const [pelletData, setPelletData] = useState();
  const [sessionData, setSessionData] = useState();
  const user = useSelector(selectAuthState);

  // Get stove
  async function getStove() {
    const res = await getStovebyId(user.selectedAssetId.deviceId);
    setData(res.data);
    // return res;
  }

  // get Pellets
  async function getPelletData() {
    const res = await getPellets(user.selectedAssetId.deviceId);
    setPelletData(res.data);
    console.log("Pellet data", res.data);
  }

  //   get sessions
  async function getSessionsData() {
    const res = await getCookingSessionsSummary(user.selectedAssetId.deviceId);
    setSessionData(res.data.content);
    console.log("Session data", res);
  }

  useEffect(() => {
    dispatch(getEntityById(user.selectedAssetId.assetId));
    getStove();
    getPelletData();
    getSessionsData();
  }, [user.selectedAssetId.deviceId]);

  // Impact card
  function setImpactCard() {
    if (signedIn.impactNavi === "Saved") return <ImpactsSaved />;
    else if (signedIn.impactNavi === "Generated") return <ImpactsGenerated />;
    else if (signedIn.impactNavi === "Offset") return <ImpactsOffsets />;
  }

  let aka: string[] = signedIn.selectedAssetId.assetId.split(`}`);
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
                <Text style={{ fontSize: 24, fontWeight: 300 }}>
                  <span style={{ color: palette.Neutral500 }}>{aka[1]} </span>{" "}
                  Asset
                </Text>
              </Group>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: viewPortSize.width,
                  overflowY: "hidden",
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
                    news: {
                      duration: duration + 400,
                      transition: "slide-up",
                      timingFunction: "ease",
                    },
                    graph: {
                      duration: duration + 800,
                      transition: "slide-up",
                      timingFunction: "ease",
                    },
                    assets: {
                      duration: duration + 1200,
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
                        overflowY: "hidden",
                      }}
                    >
                      <div style={styles.impacts}>{setImpactCard()}</div>
                      <div style={styles.news}>
                        <EmergingAssetsSingle />
                      </div>
                      <div style={styles.graph}>
                        <GraphPerf
                          sessions={sessionData}
                          fuel={pelletData}
                          stove={data}
                        />
                      </div>
                      <div style={styles.assets}>
                        <EmergingAssets />
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
          <Container fluid style={{ display: "flex", overflowY: "hidden" }}>
            <Text style={{ fontSize: 40, paddingLeft: 20, paddingTop: 20 }}>
              <span style={{ color: palette.Neutral500 }}>{aka[1]} </span>
              Asset
            </Text>
            <div
              style={{
                marginLeft: 24,
                marginTop: 30,
                display: "flex",
                overflowY: "hidden",
              }}
            >
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
              <Grid
                grow
                gutter="md"
                style={{
                  width: viewPortSize.width * 0.485,
                }}
              >
                <Grid.Col span={2} style={{ paddingTop: 10, paddingLeft: 40 }}>
                  <Transition
                    mounted={transitionTop}
                    transition="slide-left"
                    duration={duration}
                    timingFunction="ease"
                  >
                    {(styles) => <div style={styles}>{setImpactCard()}</div>}
                  </Transition>
                </Grid.Col>
                <Grid.Col span={2} style={{ paddingLeft: 40, minWidth: 500 }}>
                  <Transition
                    mounted={transitionBottom}
                    transition="slide-left"
                    duration={duration}
                    timingFunction="ease"
                  >
                    {(styles) => (
                      <div style={styles}>
                        <GraphPerf
                          sessions={sessionData}
                          fuel={pelletData}
                          stove={data}
                        />
                      </div>
                    )}
                  </Transition>
                </Grid.Col>
              </Grid>
              <Group style={{ paddingLeft: 10 }}>
                <Transition
                  mounted={transitionTop}
                  transition="slide-left"
                  duration={duration}
                  timingFunction="ease"
                >
                  {(styles) => (
                    <div style={styles}>
                      <EmergingAssetsSingle />
                    </div>
                  )}
                </Transition>
                <Transition
                  mounted={transitionBottom}
                  transition="slide-left"
                  duration={duration}
                  timingFunction="ease"
                >
                  {(styles) => (
                    <div style={styles}>
                      <EmergingAssets />
                    </div>
                  )}
                </Transition>
              </Group>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                // width: viewPortSize.width,
                overflowY: "hidden",
              }}
            >
              <GroupedTransition
                mounted={transitionTop}
                transitions={{
                  impacts: {
                    duration: duration,
                    transition: "slide-up",
                    timingFunction: "ease",
                  },
                  news: {
                    duration: duration + 400,
                    transition: "slide-up",
                    timingFunction: "ease",
                  },
                  graph: {
                    duration: duration + 800,
                    transition: "slide-up",
                    timingFunction: "ease",
                  },
                  assets: {
                    duration: duration + 1200,
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
                    <div style={styles.impacts}>{setImpactCard()}</div>
                    <div style={styles.news}>
                      <EmergingAssetsSingle />
                    </div>
                    <div style={styles.graph}>
                      <GraphPerf
                        sessions={sessionData}
                        fuel={pelletData}
                        stove={data}
                      />
                    </div>
                    <div style={styles.assets}>
                      <EmergingAssets />
                    </div>
                  </Group>
                )}
              </GroupedTransition>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default SingleAssetView;
