import { Container, Flex, Grid, Text } from "@mantine/core";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { setSelectedView } from "@/redux/userSlice";
import AssetsCard from "./cards/AssetsCard";
import ImpactsCard from "./cards/ImpactsCard";
import NewsCard from "./cards/NewsCard";
import PerformanceCard from "./cards/PerformanceCard";
import GlobalIcon from "../../icons/global-icon";
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

function CollectionDashboard() {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user);

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
    <Flex direction="column" sx={{ paddingTop: 40 }}>
      <Container fluid sx={{ width: "100%" }}>
        <Flex align="center" gap={24} sx={{ padding: 16, paddingLeft: 32 }}>
          <Text fw={300} sx={{ fontSize: 40 }}>
            SupaMoto Collection Dashboard
          </Text>
          <Flex align="center" gap={16}>
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
          gutter="xl"
          sx={{ width: "100%", padding: 16, margin: 0 }}
          align="stretch"
        >
          <Grid.Col span={8}>
            <ImpactsCard />
          </Grid.Col>
          <Grid.Col span={4}>
            <NewsCard />
          </Grid.Col>

          <Grid.Col span={8}>
            <PerformanceCard
              sessions={sessionsTotal}
              fuel={pelletTotal}
              stove={stoveData}
              totalSessions={sessionAmount}
            />
          </Grid.Col>
          <Grid.Col span={4}>
            <AssetsCard />
          </Grid.Col>
        </Grid>
      </Container>
    </Flex>
  );
}

export default CollectionDashboard;
