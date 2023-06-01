import {
  Card,
  Text,
  Divider,
  Group,
  Badge,
  Grid,
  Col,
  Image,
  Table,
  List,
  ScrollArea,
} from "@mantine/core";

import { Suspense, useEffect, useState } from "react";
import ArrowRight from "../news/icons/arrowRight";
import Claimed from "./icons/claimed";
import TransactionLeaf from "./icons/transactionLeaf";
import Bought from "./icons/bought";
import Transferred from "./icons/transferred";
import { tabletBreakpoint } from "@/constants/breakpoints";
import { useViewportSize } from "@mantine/hooks";
import Loading from "./loading";

interface Props {
  transactions: any;
}

function MyTransactions({ transactions }: Props) {
  const elements = [
    { position: "#12", symbol: "1.243", name: "3.232" },
    { position: "#7", symbol: "2.554", name: "1.235" },
    { position: "#67", symbol: "5.766", name: "2.897" },
    { position: "#34", symbol: "9.343", name: "8.567" },
    { position: "#128", symbol: "6.234", name: "9.123" },
  ];

  const rows = elements.map((element) => (
    <tr key={element.name}>
      <td>{element.position}</td>
      <td>{element.name}</td>
      <td>{element.symbol}</td>
    </tr>
  ));
  const viewPortSize = useViewportSize();

  const transactionList = transactions.map((data) => {
    let description: string = "";
    let icon: any;
    let date: string = "";

    if (data.type === "transfer") {
      description = "Transfered SupaMoto";
      icon = <Transferred />;
      date = data.time;

      return (
        <List.Item>
          <Grid>
            <Grid.Col span={10}>
              <Text style={{ fontSize: 12, fontWeight: "bold" }}>{date}</Text>
              <Text>{description}</Text>
            </Grid.Col>
            <Grid.Col span={2}>{icon}</Grid.Col>
          </Grid>
        </List.Item>
      );
    }
  });

  return (
    <Card
      shadow="sm"
      p="lg"
      radius={16}
      h={452}
      withBorder
      style={{ width: viewPortSize.width >= tabletBreakpoint ? 400 : 358 }}
    >
      <Grid>
        <Grid.Col span={6}>
          <Text
            style={{
              textAlign: "left",

              fontWeight: "400",
              fontSize: 16,
            }}
          >
            MY TRANSACTIONS
          </Text>
        </Grid.Col>
        <Grid.Col span={6}>
          <Group style={{ paddingLeft: 60 }}>
            <Text
              style={{
                textAlign: "right",

                fontWeight: "400",
                fontSize: 16,
              }}
            >
              SEE ALL
            </Text>
            <ArrowRight />
          </Group>
        </Grid.Col>
      </Grid>
      <Divider my="sm" />
      <Suspense fallback={<Loading />}>
        <ScrollArea h={400}>
          <List icon={<></>}>
            <>{transactionList}</>

            <List.Item>
              <Grid>
                <Grid.Col span={10}>
                  <Text style={{ fontSize: 12, fontWeight: "bold" }}>
                    Nov 12 22 / 12:59 pm UTC
                  </Text>
                  <Text>Claimed 0.133 CARBON</Text>
                </Grid.Col>
                <Grid.Col span={2}>
                  <Claimed />
                </Grid.Col>
              </Grid>
            </List.Item>

            <List.Item>
              <Grid>
                <Grid.Col span={10}>
                  <Text style={{ fontSize: 12, fontWeight: "bold" }}>
                    Nov 12 22 / 15:59 pm UTC
                  </Text>
                  <Text>Claimed 0.133 CARBON</Text>
                </Grid.Col>
                <Grid.Col span={2}>
                  <TransactionLeaf />
                </Grid.Col>
              </Grid>
            </List.Item>

            <List.Item>
              <Grid>
                <Grid.Col span={10}>
                  <Text style={{ fontSize: 12, fontWeight: "bold" }}>
                    Nov 12 22 / 13:20 pm UTC
                  </Text>
                  <Text>Claimed 0.133 CARBON</Text>
                </Grid.Col>
                <Grid.Col span={2}>
                  <Bought />
                </Grid.Col>
              </Grid>
            </List.Item>

            <List.Item>
              <Grid>
                <Grid.Col span={10}>
                  <Text style={{ fontSize: 12, fontWeight: "bold" }}>
                    Nov 12 22 / 14:13 pm UTC
                  </Text>
                  <Text>Claimed 0.133 CARBON</Text>
                </Grid.Col>
                <Grid.Col span={2}>
                  <Transferred />
                </Grid.Col>
              </Grid>
            </List.Item>

            <List.Item>
              <Grid>
                <Grid.Col span={10}>
                  <Text style={{ fontSize: 12, fontWeight: "bold" }}>
                    Nov 12 22 / 16:17 pm UTC
                  </Text>
                  <Text>Claimed 0.133 CARBON</Text>
                </Grid.Col>
                <Grid.Col span={2}>
                  <Transferred />
                </Grid.Col>
              </Grid>
            </List.Item>
          </List>
        </ScrollArea>
      </Suspense>
    </Card>
  );
}

export default MyTransactions;
