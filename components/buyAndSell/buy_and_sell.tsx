/* eslint-disable react/no-unescaped-entities */
import { palette, shadow } from "@/theme/palette";
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

import BuyLeaf from "./icons/buyLeaf";
import { useViewportSize } from "@mantine/hooks";
import { mobileBreakpoint, tabletBreakpoint } from "@/constants/breakpoints";

function BuyAndSell() {
  const viewPortSize = useViewportSize();
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card
        shadow={shadow.default}
        p="lg"
        radius={16}
        withBorder
        style={{ width: viewPortSize.width >= tabletBreakpoint ? 312 : 358 }}
      >
        <Text className="Title" style={{ fontSize: 16, paddingBottom: 25 }}>
          Buy and sell NFT's and Carbon Credits
        </Text>

        <Button
          disabled
          leftIcon={<BuyLeaf />}
          style={{
            borderRadius: 23,
            backgroundColor: palette.Neutral200,
            height: 46,
            width: 272,
          }}
        >
          <Text style={{ color: palette.Black, fontWeight: 500, fontSize: 16 }}>
            Go to the Impacts Exchange
          </Text>
        </Button>
      </Card>
    </div>
  );
}

export default BuyAndSell;
