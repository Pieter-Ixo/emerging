import ImpactsGenerated from "@/components/Impacts/impacts_generated";
import ImpactsOffsets from "@/components/Impacts/impacts_offsets";
import ImpactsSaved from "@/components/Impacts/impacts_saved";
import EmergingAssets from "@/components/emergingAssets/emerging_assets";
import GraphPerf from "@/components/graphPerf/graphPerf";
import NewsCard from "@/components/news/news_card";
import {
  Container,
  Grid,
  Group,
  Text,
  Transition
} from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { useEffect, useState } from "react";
import GlobalIcon from "./icons/global-icon";
import PortfolioIcon from "./icons/portfolio-icon";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { selectAuthState, setSelectedView } from "@/redux/userSlice";

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

function CollectionDashboard() {
  const dispatch = useAppDispatch();
  const viewPortSize = useViewportSize();
  const user = useAppSelector((state) => state.user);

  // Needed to trigger the animations
  const [transitionTop, setTransitionTop] = useState(false);
  const [transitionBottom, setTransitionBottom] = useState(false);

  const duration = 700;
  let bigTransitionTop = true;

  useEffect(() => {
    setTimeout(() => {
      setTransitionTop(bigTransitionTop);
    }, duration - 600);

    setTimeout(() => {
      setTransitionBottom(bigTransitionTop);
    }, duration);
  }, [bigTransitionTop]);

  // end of animation section

  // GETTING GRAPH DATA
  const [stoveData, setStoveData] = useState<any[]>([]);
  const [sessionsTotal, setSessionsTotal] = useState<any[]>([]);
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

  // Impact card
  function setImpactCard() {
    if (user.impactNavi === "Saved") return <ImpactsSaved />;
    else if (user.impactNavi === "Generated") return <ImpactsGenerated />;
    else if (user.impactNavi === "Offset") return <ImpactsOffsets />;
  }

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        overflowX: "hidden",
        overflowY: "hidden",
      }}
    >
      <>
        <Container fluid style={{ display: "flex" }}>
          <Text
            style={{ fontSize: 40, paddingLeft: 20, paddingTop: 20 }}
          >
            Collection Dashboard
          </Text>
          <div
            style={{ marginLeft: 24, marginTop: 30, display: "flex" }}
          >
            <div
              style={{ marginRight: 16, cursor: "pointer" }}
              onClick={() => dispatch(setSelectedView("global"))}
            >
              <GlobalIcon selected={user.selectedView} />
            </div>
            <div
              onClick={() => dispatch(setSelectedView("portfolio"))}
              style={{ cursor: "pointer" }}
            >
              <PortfolioIcon selected={user.selectedView} />
            </div>
          </div>
        </Container>

        <div style={{ display: "flex", paddingTop: 16 }}>
          <Grid
            grow
            gutter="md"
            style={{ width: viewPortSize.width * 0.485 }}
          >
            <Grid.Col
              span={2}
              style={{ paddingTop: 10, paddingLeft: 40 }}
            >
              <Transition
                mounted={transitionTop}
                transition="slide-left"
                duration={duration}
                timingFunction="ease"
              >
                {(styles) => (
                  <div style={styles}>{setImpactCard()}</div>
                )}
              </Transition>
            </Grid.Col>
            <Grid.Col
              span={2}
              style={{ paddingLeft: 40, minWidth: 500 }}
            >
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
                  <EmergingAssets />
                </div>
              )}
            </Transition>
          </Group>
        </div>
      </>
    </div>
  );
}

export default CollectionDashboard;
