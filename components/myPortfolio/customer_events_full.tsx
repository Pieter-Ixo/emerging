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

import { useState } from "react";
import ArrowRight from "../news/icons/arrowRight";
import Claimed from "./icons/claimed";
import TransactionLeaf from "./icons/transactionLeaf";
import Bought from "./icons/bought";
import Transferred from "./icons/transferred";

function FullCustomerEvents() {
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

  return (
    <Card
      shadow="sm"
      p="lg"
      radius="md"
      withBorder
      style={{ width: 1200, marginBottom: 20 }}
    >
      <Grid>
        <Grid.Col>
          <Text
            style={{
              textAlign: "center",

              fontWeight: "400",
              fontSize: 20,
            }}
          >
            CUSTOMER EVENTS
          </Text>
          <Divider my="sm" />
        </Grid.Col>
        <Grid.Col span={6}>
          <Text
            style={{
              textAlign: "left",

              fontWeight: "400",
              fontSize: 16,
            }}
          >
            EVENT
          </Text>
        </Grid.Col>
        <Grid.Col span={3}>
          <Text
            style={{
              textAlign: "center",

              fontWeight: "400",
              fontSize: 16,
            }}
          >
            DATE
          </Text>
        </Grid.Col>
        <Grid.Col span={3}>
          <Text
            style={{
              textAlign: "right",

              fontWeight: "400",
              fontSize: 16,
            }}
          >
            TIME
          </Text>
        </Grid.Col>
      </Grid>
      <Divider my="sm" />
      <Grid>
        <Grid.Col span={6}>
          <Text>Claimed 0.123 CARBON</Text>
        </Grid.Col>

        <Grid.Col span={3}>
          <Text style={{ paddingLeft: 120 }}>November 12 2022</Text>
        </Grid.Col>

        <Grid.Col span={3}>
          <Text style={{ textAlign: "right" }}>12:59 pm UTC</Text>
        </Grid.Col>
      </Grid>
      <Grid>
        <Grid.Col span={6}>
          <Text>Claimed 0.254 CARBON</Text>
        </Grid.Col>

        <Grid.Col span={3}>
          <Text style={{ paddingLeft: 120 }}>November 12 2022</Text>
        </Grid.Col>

        <Grid.Col span={3}>
          <Text style={{ textAlign: "right" }}>14:59 pm UTC</Text>
        </Grid.Col>
      </Grid>
      <Grid>
        <Grid.Col span={6}>
          <Text>Claimed 0.723 CARBON</Text>
        </Grid.Col>

        <Grid.Col span={3}>
          <Text style={{ paddingLeft: 120 }}>November 12 2022</Text>
        </Grid.Col>

        <Grid.Col span={3}>
          <Text style={{ textAlign: "right" }}>12:30 pm UTC</Text>
        </Grid.Col>
      </Grid>
      <Grid>
        <Grid.Col span={6}>
          <Text>Claimed 0.867 CARBON</Text>
        </Grid.Col>

        <Grid.Col span={3}>
          <Text style={{ paddingLeft: 120 }}>November 12 2022</Text>
        </Grid.Col>

        <Grid.Col span={3}>
          <Text style={{ textAlign: "right" }}>13:29 pm UTC</Text>
        </Grid.Col>
      </Grid>
      <Grid>
        <Grid.Col span={6}>
          <Text>Claimed 0.154 CARBON</Text>
        </Grid.Col>

        <Grid.Col span={3}>
          <Text style={{ paddingLeft: 120 }}>November 12 2022</Text>
        </Grid.Col>

        <Grid.Col span={3}>
          <Text style={{ textAlign: "right" }}>15:59 pm UTC</Text>
        </Grid.Col>
      </Grid>
      <Grid>
        <Grid.Col span={6}>
          <Text>Claimed 0.788 CARBON</Text>
        </Grid.Col>

        <Grid.Col span={3}>
          <Text style={{ paddingLeft: 120 }}>November 12 2022</Text>
        </Grid.Col>

        <Grid.Col span={3}>
          <Text style={{ textAlign: "right" }}>12:52 pm UTC</Text>
        </Grid.Col>
      </Grid>
    </Card>
  );
}

export default FullCustomerEvents;
