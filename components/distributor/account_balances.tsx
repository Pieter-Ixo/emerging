import { palette } from "@/theme/palette";
import { tabletBreakpoint } from "@/constants/breakpoints";
import { Card, Text, Button, Grid, Col, List, Container } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { useState } from "react";
import ButtonLeaf from "../userBalance/icons/buttonLeaf";
import Calculate from "../userBalance/icons/calulate";
import ReceiveArrow from "../userBalance/icons/receiveArrow";
import SendArrow from "../userBalance/icons/sendArrow";
import Carbon from "./icons/carbon";
import Collapse from "./icons/CollapseMyBalance";
import ExpandMyBalance from "./icons/Expand";
import Ixo from "./icons/ixo";
import OSMO from "./icons/OSMO_Icon";
import Usdc from "./icons/usdc";

// import ButtonLeaf from "./icons/buttonLeaf";
// import Calculate from "./icons/calulate";
// import DownArrow from "./icons/downArrow";
// import ReceiveArrow from "./icons/receiveArrow";
// import SendArrow from "./icons/sendArrow";

function AccountBalance() {
  const [available, setAvailable] = useState(true);
  const viewPortSize = useViewportSize();
  const [isExpanded, setExpand] = useState(true); // in this case false will show it,  and true will hide it

  // console.log("account wllet" , wallet.balances?.balances)

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card
        p="lg"
        radius={16}
        withBorder
        style={{ width: viewPortSize.width >= tabletBreakpoint ? 312 : 358 }}
      >
        <Text
          style={{
            fontStyle: "normal",
            fontSize: 16,
          }}
        >
          My account balances
        </Text>

        {available && (
          <>
            <Text
              style={{
                fontStyle: "normal",
                fontSize: 56,
                color: palette.fullBlue,
                textAlign: "left",
              }}
            >
              $123,34k
            </Text>

            <Card
              p="lg"
              radius="md"
              withBorder
              style={{ backgroundColor: palette.Neutral200 }}
            >
              <Container style={{ display: "flex", padding: 0 }}>
                {/* replace the icons with icons from the chain */}
                <List spacing="xs" size="sm" center style={{ flex: 7 }}>
                  <List.Item icon={<Carbon />}>8,000.00 CARBON</List.Item>
                  <List.Item icon={<Usdc />}>12,000.00 USDC</List.Item>
                  <List.Item icon={<Ixo />}>15,000.00 IXO</List.Item>
                  <List.Item hidden={isExpanded} icon={<OSMO />}>
                    5,234.00 OSMO
                  </List.Item>
                  <List.Item hidden={isExpanded} icon={<Carbon />}>
                    1,245.00 REGEN
                  </List.Item>
                  {/* <List.Item hidden={isExpanded} icon={<Carbon />}>1.234 ETH</List.Item>
                  <List.Item hidden={isExpanded} icon={<Carbon />}>312.324 MATIC</List.Item> */}
                </List>

                <Container
                  onClick={() => setExpand(!isExpanded)}
                  style={{
                    alignSelf: "flex-end",
                    height: viewPortSize.height * 0.026,
                    paddingLeft: 30,
                    flex: 1,
                  }}
                >
                  {isExpanded ? <ExpandMyBalance /> : <Collapse />}
                </Container>
              </Container>
            </Card>

            <Grid style={{ paddingTop: 30 }}>
              <Grid.Col span={6}>
                <Button
                  leftIcon={<SendArrow />}
                  style={{
                    borderRadius: 23,
                    backgroundColor: palette.Neutral200,
                    width: 122,
                    height: 46,
                  }}
                >
                  <Text
                    style={{
                      color: palette.Black,
                      fontWeight: 500,
                      fontSize: 16,
                    }}
                  >
                    Send
                  </Text>
                </Button>
              </Grid.Col>
              <Grid.Col span={6}>
                <Button
                  leftIcon={<ReceiveArrow />}
                  style={{
                    borderRadius: 23,
                    backgroundColor: palette.Neutral200,
                    width: 122,
                    height: 46,
                  }}
                >
                  <Text
                    style={{
                      color: palette.Black,
                      fontWeight: 500,
                      fontSize: 16,
                    }}
                  >
                    Receive
                  </Text>
                </Button>
              </Grid.Col>
            </Grid>
          </>
        )}
        {!available && (
          <>
            <Grid>
              <Col span="content">
                <Text
                  style={{
                    fontStyle: "normal",
                    fontSize: 56,
                    color: palette.greenFull,
                  }}
                >
                  2.11
                </Text>
              </Col>
              <Col span={6}>
                <Text
                  style={{
                    fontStyle: "normal",
                    fontSize: 16,
                    color: palette.greenFull,
                    paddingTop: 44,
                  }}
                >
                  CARBON offset
                </Text>
              </Col>
            </Grid>

            <div style={{ paddingTop: 12 }}>
              <Button
                leftIcon={<ButtonLeaf />}
                style={{
                  borderRadius: 18,
                  backgroundColor: palette.greenFull,
                  width: 272,
                }}
              >
                Offset my footprint
              </Button>
            </div>

            <div style={{ paddingTop: 12 }}>
              <Button
                leftIcon={<Calculate />}
                style={{
                  borderRadius: 18,
                  backgroundColor: palette.Neutral200,
                  width: 272,
                }}
              >
                <Text style={{ color: palette.Black }}>
                  Calculate my personal target
                </Text>
              </Button>
            </div>
          </>
        )}
      </Card>
    </div>
  );
}

export default AccountBalance;
