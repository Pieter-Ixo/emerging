import { WalletContext } from "@/context/wallet";
import { palette } from "@/theme/palette";
import {
  Card,
  Image,
  Text,
  Badge,
  Button,
  Group,
  Grid,
  Col,
} from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import Settings from "./icons/settings";

function DemoMode() {
  return (
    <Card
      style={{ backgroundColor: palette.orangeFull, height: 64 }}
      shadow="sm"
      p="lg"
      radius={16}
      withBorder
    >
      <Grid>
        <Col span="content">
          <Settings />
        </Col>
        <Col span={6}>
          <Text className="subTitle" style={{ color: palette.White }}>
            Cookstoves
          </Text>
        </Col>
      </Grid>
    </Card>
  );
}

export default DemoMode;
