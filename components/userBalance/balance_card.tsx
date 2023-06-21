import { useRouter, usePathname } from "next/navigation";
import { palette } from "@/theme/palette";
import {
  Button,
  Card,
  Center,
  Col,
  Divider,
  Grid,
  Modal,
  SegmentedControl,
  Text,
} from "@mantine/core";
import { Suspense, useState } from "react";

import { useAppSelector } from "@/hooks/redux";
import { selectSelectedAssetExternalId } from "@/redux/entityCollections/selectors";

import ButtonLeaf from "./icons/buttonLeaf";
import Calculate from "./icons/calulate";
import DownArrow from "./icons/downArrow";
import ReceiveArrow from "./icons/receiveArrow";
import SendArrow from "./icons/sendArrow";
import Loading from "./loading";
import ReceiveCarbon from "./receive-carbon";
import SendCarbon from "./send-carbon";
import Generated from "../Dashboard/CollectionDashboard/cards/ImpactsCard/icons/generated";

function BalanceCard() {
  const router = useRouter();
  const pathname = usePathname();
  const selectedAssetExternalId = useAppSelector(selectSelectedAssetExternalId);

  const [availableTab, setAvailable] = useState(true);
  const [sendModal, setSendModal] = useState(false);
  const [receiveModal, setReceiveModal] = useState(false);
  const totalClaimable = 0;
  const totalOffset = 421;

  function handleShowCertificate() {
    router.push(`/certificate/${selectedAssetExternalId}`);
  }

  return (
    <>
      <Card p="lg" radius={16}>
        <Text>My carbon credits</Text>

        <div style={{ paddingTop: 20 }}>
          <SegmentedControl
            color={availableTab ? "FullBlue.3" : "GreenFull.3"}
            style={{
              borderRadius: 23,
              width: 272,
            }}
            radius={20}
            onChange={() => {
              setAvailable(!availableTab);
            }}
            data={[
              { label: "Available", value: "Available" },
              { label: "Offset", value: "Offset" },
            ]}
          />
        </div>
        {availableTab && (
          <Suspense fallback={<Loading />}>
            <Grid>
              <Col span="content">
                <Text
                  style={{
                    fontSize: 56,
                    color: palette.fullBlue,
                  }}
                >
                  779
                </Text>
              </Col>
              <Col span={6}>
                <Text
                  style={{
                    color: palette.fullBlue,
                    paddingTop: 44,
                  }}
                >
                  CARBON
                </Text>
              </Col>
            </Grid>

            <div style={{ paddingTop: 12 }}>
              <Button
                leftIcon={totalClaimable ? <DownArrow /> : null}
                style={{
                  borderRadius: 23,
                  backgroundColor: palette.fullBlue,
                  width: 272,
                  height: 46,
                }}
              >
                <Text style={{ fontWeight: 500, fontSize: 16 }}>
                  {totalClaimable} CARBON credits to claim
                </Text>
              </Button>
            </div>

            {/* Show Carbon Certificate */}
            <div style={{ paddingTop: 12 }}>
              <Button
                leftIcon={
                  <Generated
                    fill={pathname === "/" ? palette.Black : palette.White}
                  />
                }
                style={{
                  borderRadius: 23,
                  backgroundColor:
                    pathname === "/" ? palette.Neutral200 : palette.fullBlue,
                  width: 272,
                  height: 46,
                }}
                onClick={() => handleShowCertificate()}
              >
                <Text
                  style={{
                    fontWeight: 500,
                    fontSize: 16,
                    color: pathname === "/" ? palette.Black : palette.White,
                  }}
                >
                  Show Carbon Certificate
                </Text>
              </Button>
            </div>
            <Center>
              <Grid
                style={{
                  paddingTop: 16,
                  width: 272,
                }}
              >
                <Grid.Col span={6} style={{ paddingLeft: 0 }}>
                  <Button
                    onClick={() => {
                      setSendModal(true);
                      setReceiveModal(false);
                    }}
                    leftIcon={<SendArrow />}
                    style={{
                      borderRadius: 23,
                      backgroundColor: palette.Neutral200,
                      width: 128,
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
                <Grid.Col span={6} style={{ paddingRight: 0 }}>
                  <Button
                    onClick={() => {
                      setReceiveModal(true);
                      setSendModal(false);
                    }}
                    leftIcon={<ReceiveArrow />}
                    style={{
                      borderRadius: 23,
                      backgroundColor: palette.Neutral200,
                      width: 128,
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
            </Center>
          </Suspense>
        )}
        {!availableTab && (
          <>
            <Grid>
              <Col span="content">
                <Text
                  style={{
                    fontStyle: "normal",
                    fontSize: 56,
                    color: palette.greenFull,
                    paddingLeft: 12,
                  }}
                >
                  {totalOffset}
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
                  borderRadius: 23,
                  backgroundColor: palette.greenFull,
                  width: 272,
                  height: 46,
                }}
              >
                <Text style={{ fontWeight: 500, fontSize: 16 }}>
                  Offset my footprint
                </Text>
              </Button>
            </div>

            <div style={{ paddingTop: 16 }}>
              <Button
                leftIcon={<Calculate />}
                style={{
                  borderRadius: 23,
                  backgroundColor: palette.Neutral200,
                  width: 272,
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
                  Calculate my personal target
                </Text>
              </Button>
            </div>
          </>
        )}
      </Card>
      <Modal
        opened={sendModal}
        onClose={() => {
          setSendModal(false);
        }}
        title={<Text style={{ paddingLeft: 20 }}>SEND</Text>}
        radius={16}
      >
        <Divider
          my="sm"
          size="xs"
          color="black"
          style={{ paddingTop: 0, marginTop: 0 }}
        />

        <SendCarbon />
      </Modal>
      <Modal
        opened={receiveModal}
        onClose={() => {
          setReceiveModal(false);
        }}
        title={<Text style={{ paddingLeft: 20 }}>RECEIVE</Text>}
        radius={16}
      >
        <Divider
          my="sm"
          size="xs"
          color="black"
          style={{ paddingTop: 0, marginTop: 0 }}
        />
        <ReceiveCarbon />
      </Modal>
    </>
  );
}

export default BalanceCard;
