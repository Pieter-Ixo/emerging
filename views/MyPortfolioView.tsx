import EmergingAssets from "@/components/emergingAssets/emerging_assets";
import EmergingAssetsFull from "@/components/emergingAssets/emerging_assets_full";
import EmergingAssetsSingle from "@/components/emergingAssets/emerging_assets_single";
import GraphPerf from "@/components/graphPerf/graphPerf";
import ImpactsGenerated from "@/components/Impacts/impacts_generated";
import ImpactsOffsets from "@/components/Impacts/impacts_offsets";
import ImpactsSaved from "@/components/Impacts/impacts_saved";
import CustomerEvents from "@/components/myPortfolio/customer_events";
import MyTransactions from "@/components/myPortfolio/my_transactions";
import OwnedAssets from "@/components/myPortfolio/owned_assets";
import SmallEmerginglogo from "@/components/Navbar/icons/smallEmerging";
import NewsCard from "@/components/news/news_card";
import { selectCollection } from "@/redux/collectionSlice";
import { selectAuthState, setSelectedView } from "@/redux/userSlice";
import { palette } from "@/theme/palette";
import {
  getCookingSessionsSummary,
  getPellets,
  getStovebyId,
  getTokenTransactions,
} from "@/utils/api-helper";
import { smallLaptopBreakpoint, tabletBreakpoint } from "@/constants/breakpoints";
import {
  Container,
  Group,
  GroupedTransition,
  Text,
  Grid,
  Transition,
} from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import GlobalIcon from "./icons/global-icon";
import PortfolioIcon from "./icons/portfolio-icon";

interface pellet {
  content: [
    {
      amount: number;
      currency: string;
      dateTime: string;
      id: number;
      pelletsAmount: number;
      pelletsAmountUnits: string;
      telco: string;
      transactionId: string;
    }
  ];
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  totalElements: number;
  totalPages: number;
  totalPelletsAmount: number;
}

function MyPortfolioView() {
  const viewPortSize = useViewportSize();
  const signedIn = useSelector(selectAuthState);
  const collection = useSelector(selectCollection);
  const [entitiesData, setEntitiesData] = useState<any>([]);
  const [transactions, setTransactions] = useState<any>([]);

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

  // GETTING GRAPH DATA
  const [stoveData, setStoveData] = useState<any[]>([]);
  const [pelletData, setPelletData] = useState<any[]>([]);
  const [sessionData, setSessionData] = useState<any[]>([]);
  const [sessionsTotal, setSessionsTotal] = useState<any[]>([]);
  const [fetchDataFinished, setDataFinished] = useState(false);
  const user = useSelector(selectAuthState);
  const [sessionAmount, setSessionAmount] = useState<number>();
  const [pelletTotal, setPelletTotal] = useState<pellet>({
    content: [
      {
        amount: 0,
        currency: "",
        dateTime: "",
        id: 0,
        pelletsAmount: 0,
        pelletsAmountUnits: "",
        telco: "",
        transactionId: "",
      },
    ],
    hasNextPage: false,
    hasPreviousPage: false,
    totalElements: 0,
    totalPages: 0,
    totalPelletsAmount: 0,
  });

  useEffect(() => {
    setStoveData([]);
    getStoves();
  }, [entitiesData]);

  useEffect(() => {
    setEntitiesData(collection.entities);
  }, []);

  // Get stoves
  async function getStove(deviceId) {
    const res = await getStovebyId(deviceId);

    const tempStoveArray = stoveData;
    tempStoveArray.push(res.data);
    setStoveData(tempStoveArray);
  }

  // get Pellets
  async function getPelletData(deviceId) {
    const res = await getPellets(deviceId);
    const tempPellet = pelletData;
    tempPellet.push(res.data);
    setPelletData(tempPellet);
  }

  function calcPelletsTotal() {
    const tempTotal = pelletTotal;
    for (let i = 0; i < pelletData.length; i++) {
      for (let j = 0; j < pelletData[i].content.length; j++) {
        const date = pelletData[i].content[j].dateTime;
        let foundDate = tempTotal?.content?.findIndex(
          (element) =>
            new Date(element.dateTime).toDateString() ===
            new Date(date).toDateString()
        );

        if (foundDate > -1) {
          tempTotal.content[foundDate].pelletsAmount =
            tempTotal?.content[foundDate].pelletsAmount +
            pelletData[i].content[j].pelletsAmount;
        } else {
          tempTotal?.content.push({
            amount: pelletData[i].content[j].amount,
            currency: pelletData[i].content[j].currency,
            dateTime: pelletData[i].content[j].dateTime,
            id: pelletData[i].content[j].id,
            pelletsAmount: pelletData[i].content[j].pelletsAmount,
            pelletsAmountUnits: pelletData[i].content[j].pelletsAmountUnits,
            telco: pelletData[i].content[j].telco,
            transactionId: pelletData[i].content[j].transactionId,
          });
        }
      }
    }
    if (tempTotal?.content[0]?.pelletsAmount <= 0) tempTotal.content.shift();
    setPelletTotal(tempTotal);
  }

  async function getStoves() {
    const data = entitiesData.map(async (entity) => {
      let sessionDataLocal: any[] = [];
      if (entity.device?.credentialSubject?.id) {
        let tempDeviceId = entity.device.credentialSubject.id;
        tempDeviceId = tempDeviceId.split("id=");
        tempDeviceId = tempDeviceId[1];
        await getPelletData(tempDeviceId);
        getStove(tempDeviceId);

        const SessionRes = await getSessionsData(tempDeviceId);
        sessionDataLocal.push(SessionRes);

        setSessionData(sessionDataLocal);
        // fetch Transaction Data
        getTransactions(entity.id);

        return sessionDataLocal;
      }
    });

    Promise.all(data).then((data) => {
      const filteredData = data.filter((a) => a);
      if (filteredData.length > 0) {
        let Totals: any[] = [];
        for (let i = 0; i < filteredData[0][0].length; i++) {
          let sum = 0;
          for (let j = 0; j < filteredData.length; j++) {
            sum = sum + filteredData[j][0][i].duration?.total;
          }
          Totals.push({
            count: { avg: 0, total: 0 },
            duration: { avg: 0, total: sum },
            timestamp: filteredData[0][0][i].timestamp,
          });
        }

        setSessionAmount(filteredData.length * filteredData[0][0].length);

        setSessionsTotal(Totals);
      }
      calcPelletsTotal();
    });
  }

  // Get Cooking Sessions
  async function getSessionsData(deviceId) {
    const res = await getCookingSessionsSummary(deviceId);
    return res.data.content;
  }

  // END OF GETTING GRAPH DATA

  // GET TRANSACTIONS

  async function getTransactions(id) {
    console.log("Transaction ID", id);
    let tempTransactions = transactions;
    const transactionsData = await getTokenTransactions(id);

    tempTransactions.push(...transactionsData);

    tempTransactions.sort(
      (a, b) =>
        // @ts-ignore
        new Date(a.time) -
        // @ts-ignore
        new Date(b.time)
    );

    setTransactions(tempTransactions);

    console.log("Token Transactions", transactions);
  }
  // END OF GET TRANSACTIONS

  // Impact card
  function setImpactCard() {
    if (signedIn.impactNavi === "Saved") return <ImpactsSaved />;
    else if (signedIn.impactNavi === "Generated") return <ImpactsGenerated />;
    else if (signedIn.impactNavi === "Offset") return <ImpactsOffsets />;
  }

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
                  My Portfolio
                </Text>
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
                      <div style={styles.impacts}>
                        <OwnedAssets />
                      </div>
                      <div style={styles.impacts}>{setImpactCard()}</div>
                      <div style={styles.news}>
                        <NewsCard />
                      </div>
                      <div style={styles.graph}>
                        <GraphPerf
                          sessions={sessionsTotal}
                          fuel={pelletTotal}
                          stove={stoveData}
                          totalSessions={sessionAmount}
                        />
                      </div>
                      <div style={styles.assets}>
                        <MyTransactions transactions={transactions} />
                      </div>
                      <div style={styles.impacts}>
                        <CustomerEvents />
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
              My Portfolio
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
              <Grid
                grow
                gutter="md"
                style={{ width: viewPortSize.width * 0.485 }}
              >
                <Grid.Col span={2} style={{ paddingTop: 10, paddingLeft: 40 }}>
                  <Transition
                    mounted={transitionTop}
                    transition="slide-left"
                    duration={duration}
                    timingFunction="ease"
                  >
                    {(styles) => (
                      <div style={styles}>
                        <OwnedAssets />
                      </div>
                    )}
                  </Transition>
                </Grid.Col>
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
                          sessions={sessionsTotal}
                          fuel={pelletTotal}
                          stove={stoveData}
                          totalSessions={sessionAmount}
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
                      <MyTransactions transactions={transactions} />
                    </div>
                  )}
                </Transition>
                <Transition
                  mounted={transitionTop}
                  transition="slide-left"
                  duration={duration}
                  timingFunction="ease"
                >
                  {(styles) => (
                    <div style={styles}>
                      <NewsCard />
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
                      <CustomerEvents />
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
                    <div style={styles.impacts}>
                      <ImpactsSaved />
                    </div>
                    <div style={styles.news}>
                      <NewsCard />
                    </div>
                    <div style={styles.graph}>
                      <GraphPerf
                        sessions={sessionsTotal}
                        fuel={pelletTotal}
                        stove={stoveData}
                        totalSessions={sessionAmount}
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

export default MyPortfolioView;
