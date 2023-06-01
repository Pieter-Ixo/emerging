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
} from "@mantine/core";

import { Suspense, useState } from "react";
import ArrowRight from "../news/icons/arrowRight";
import Claimed from "./icons/claimed";
import TransactionLeaf from "./icons/transactionLeaf";
import Bought from "./icons/bought";
import Transferred from "./icons/transferred";
import { useViewportSize } from "@mantine/hooks";
import { smallLaptopBreakpoint, tabletBreakpoint } from "@/constants/breakpoints";
import Loading from "./loading";

function CustomerEvents() {
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

  return (
    <Card
      shadow="sm"
      p="lg"
      radius={16}
      withBorder
      style={{
        width: viewPortSize.width >= tabletBreakpoint ? 400 : 358,
        height: viewPortSize.width >= smallLaptopBreakpoint ? 459 : 523,
      }}
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
            CUSTOMER EVENTS
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
        <List icon={<></>}>
          <List.Item>
            <Grid>
              <Grid.Col span={12}>
                <Text style={{ fontSize: 12, fontWeight: "bold" }}>
                  Nov 12 22 / 12:59 pm UTC
                </Text>
                <Text>Claimed 0.123 CARBON</Text>
              </Grid.Col>
            </Grid>
          </List.Item>
          <List.Item>
            <Grid>
              <Grid.Col span={12}>
                <Text style={{ fontSize: 12, fontWeight: "bold" }}>
                  Nov 12 22 / 14:59 pm UTC
                </Text>
                <Text>Claimed 0.254 CARBON</Text>
              </Grid.Col>
            </Grid>
          </List.Item>
          <List.Item>
            <Grid>
              <Grid.Col span={12}>
                <Text style={{ fontSize: 12, fontWeight: "bold" }}>
                  Nov 12 22 / 12:30 pm UTC
                </Text>
                <Text>Claimed 0.723 CARBON</Text>
              </Grid.Col>
            </Grid>
          </List.Item>
          <List.Item>
            <Grid>
              <Grid.Col span={12}>
                <Text style={{ fontSize: 12, fontWeight: "bold" }}>
                  Nov 12 22 / 13:29 pm UTC
                </Text>
                <Text>Claimed 0.867 CARBON</Text>
              </Grid.Col>
            </Grid>
          </List.Item>
          <List.Item>
            <Grid>
              <Grid.Col span={12}>
                <Text style={{ fontSize: 12, fontWeight: "bold" }}>
                  Nov 12 22 / 15:59 pm UTC
                </Text>
                <Text>Claimed 0.154 CARBON</Text>
              </Grid.Col>
            </Grid>
          </List.Item>
          <List.Item>
            <Grid>
              <Grid.Col span={12}>
                <Text style={{ fontSize: 12, fontWeight: "bold" }}>
                  Nov 12 22 / 12:52 pm UTC
                </Text>
                <Text>Claimed 0.788 CARBON</Text>
              </Grid.Col>
            </Grid>
          </List.Item>
        </List>
      </Suspense>
    </Card>
  );
}

export default CustomerEvents;
