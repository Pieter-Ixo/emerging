import AssetsCard from "./cards/AssetsCard";
import PerformanceCard from "./cards/PerformanceCard";
import NewsCard from "./cards/NewsCard";
import ImpactsCard from "./cards/ImpactsCard";
import { Container, Flex, Grid, Text } from "@mantine/core";
import { useEffect, useState } from "react";
import GlobalIcon from "./icons/global-icon";
import PortfolioIcon from "./icons/portfolio-icon";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { setSelectedView } from "@/redux/userSlice";
import { motion } from "framer-motion";

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
  const user = useAppSelector((state) => state.user);

  // Needed to trigger the animations
  const [transitionTop, setTransitionTop] = useState(false);
  const [transitionBottom, setTransitionBottom] = useState(false);

  const duration = 700;
  const bigTransitionTop = true;

  useEffect(() => {
    setTimeout(() => {
      setTransitionTop(bigTransitionTop);
    }, duration - 100);

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
        dateTime: "2023-06-02T17:58:31.293Z",
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
  // function setImpactCard() {
  // if (user.impactNavi === "Saved") return <ImpactsSaved />;
  // else if (user.impactNavi === "Generated") return <ImpactsGenerated />;
  // else if (user.impactNavi === "Offset") return <ImpactsOffsets />;
  // }

  return (
    <Flex direction={"column"} sx={{ paddingTop: 40 }}>
      <Container fluid sx={{ width: "100%" }}>
        <Flex align={"center"} gap={24} sx={{ padding: 16, paddingLeft: 32 }}>
          <Text fw={300} sx={{ fontSize: 40 }}>
            SupaMoto Collection Dashboard
          </Text>
          <Flex align={"center"} gap={16}>
            <Flex
              sx={{ cursor: "pointer" }}
              onClick={() => dispatch(setSelectedView("global"))}
            >
              <GlobalIcon selected={user.selectedView} />
            </Flex>
            <Flex
              sx={{ cursor: "pointer" }}
              onClick={() => dispatch(setSelectedView("portfolio"))}
            >
              <PortfolioIcon selected={user.selectedView} />
            </Flex>
          </Flex>
        </Flex>
      </Container>

      <Container fluid>
        <Grid
          gutter={"xl"}
          sx={{ width: "100%", padding: 16, margin: 0 }}
          align="stretch"
        >
          <Grid.Col span={8}>
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
              style={{ height: "100%" }}
            >
              <ImpactsCard />
            </motion.div>
          </Grid.Col>
          <Grid.Col span={4}>
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              style={{ height: "100%" }}
            >
              <NewsCard />
            </motion.div>
          </Grid.Col>

          <Grid.Col span={8}>
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 1.5 }}
              style={{ height: "100%" }}
            >
              <PerformanceCard
                sessions={sessionsTotal}
                fuel={pelletTotal}
                stove={stoveData}
                totalSessions={sessionAmount}
              />
            </motion.div>
          </Grid.Col>
          <Grid.Col span={4}>
            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, delay: 2 }}
              style={{ height: "100%" }}
            >
              <AssetsCard />
            </motion.div>
          </Grid.Col>
        </Grid>
      </Container>
    </Flex>
  );
}

export default CollectionDashboard;
