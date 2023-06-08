/* eslint-disable react/no-unescaped-entities */
import { palette } from "@/theme/palette";
import { Card, Text, Button } from "@mantine/core";

import BuyLeaf from "./icons/buyLeaf";
import { useViewportSize } from "@mantine/hooks";

function BuyAndSell() {
  return (
    <Card p="lg" radius={16}>
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
  );
}

export default BuyAndSell;
