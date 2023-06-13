/* eslint-disable react/no-unescaped-entities */
import { palette } from "@/theme/palette";
import { tabletBreakpoint } from "@/constants/breakpoints";
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
import { useViewportSize } from "@mantine/hooks";
import BuyLeaf from "../buyAndSell/icons/buyLeaf";
import FilledStar from "../Inventory/icons/Filled_Star";
import Star from "../Inventory/icons/star";

// @ts-ignore
function MintActionCard({ counter }) {
  const viewPortSize = useViewportSize()
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card shadow="sm" p="lg" radius="md" withBorder style={{ width: viewPortSize.width >= tabletBreakpoint ? 312 : 358 }}>
        <Text className="Title" style={{ fontSize: 16, paddingBottom: 25 }}>
          Actions
        </Text>

        <Button
          leftIcon={counter == 0 ? <Star /> : <FilledStar />}
          style={{
            borderRadius: 23,
            backgroundColor: palette.fullBlue,
            height: 46,
            width: 272
          }}
        >
          <Text style={{ color: palette.White, fontWeight: 500, fontSize: 16 }}>
            Mint {counter} selected stove NFT's
          </Text>
        </Button>
      </Card>
    </div>
  );
}

export default MintActionCard;
