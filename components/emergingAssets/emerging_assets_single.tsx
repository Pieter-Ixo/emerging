import {
  mobileBreakpoint,
  tabletBreakpoint
} from "@/constants/breakpoints";
import { palette } from "@/theme/palette";
import {
  Button,
  Card,
  Divider,
  Text
} from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import dayjs from "dayjs";

import { useAppDispatch, useAppSelector } from "@/hooks/redux";
import { useState } from "react";
import ImpactsLeaf from "./icons/ImpactsLeaf";
import SendArrow from "./icons/sendArrow";

function EmergingAssetsSingle() {
  const [data, setData] = useState();
  const [pelletData, setPelletData] = useState();

  const viewPortSize = useViewportSize();

  const collection = useAppSelector((state) => state.collection);

  const screenMultiplier: number =
    viewPortSize.width >= 1500 || viewPortSize.width <= tabletBreakpoint
      ? 0.5
      : 0.4;

  const user = useAppSelector((state) => state.user);
  let aka: string[] = user.selectedAssetId.assetId.split(`}`);

  const dispatch = useAppDispatch();

  return (
    <div>
      <Card
        shadow="sm"
        p="lg"
        radius={16}
        withBorder
        style={{
          width: viewPortSize.width >= mobileBreakpoint ? 400 : 358,
          height: viewPortSize.height >= mobileBreakpoint ? 370 : 358,
          background: palette.fullBlue,
        }}
      >
        <Text
          style={{
            textAlign: "left",
            fontWeight: "400",
            fontSize: 16,
            color: "white",
          }}
        >
          {aka[1]}
        </Text>
        <Divider my="sm" style={{ paddingBottom: 20 }} />
        <Text
          style={{
            textAlign: "left",
            fontWeight: "400",
            fontSize: 16,
            color: "white",
          }}
        >
          Creator: {collection.singleAsset.details?.brand}
        </Text>
        <Text
          style={{
            textAlign: "left",
            fontWeight: "400",
            fontSize: 16,
            color: "white",
          }}
        >
          {/* TODO: actual data */}
          Collection: Malawi Collection 2023
        </Text>
        <Text
          style={{
            textAlign: "left",
            fontWeight: "400",
            fontSize: 16,
            color: "white",
          }}
        >
          Number: {aka[1]} of {collection.entities?.length}
        </Text>
        <Text
          style={{
            textAlign: "left",
            fontWeight: "400",
            fontSize: 16,
            paddingBottom: 20,
            color: "white",
          }}
        >
          Asset creation date:{" "}
          {dayjs(collection.singleAsset.date).format("YYYY/MM/DD")}
        </Text>
        <div style={{ paddingTop: 12, paddingLeft: 45 }}>
          <Button
            leftIcon={<SendArrow />}
            style={{
              borderRadius: 23,
              backgroundColor: palette.White,
              width: 272,
              paddingRight: 190,
              height: 46,
            }}
          >
            <Text style={{ color: palette.Black }}>Send</Text>
          </Button>
        </div>
        <div style={{ paddingTop: 12, paddingLeft: 45 }}>
          <Button
            leftIcon={<ImpactsLeaf />}
            style={{
              borderRadius: 23,
              backgroundColor: palette.White,
              width: 272,
              paddingRight: 45,
              height: 46,
            }}
          >
            <Text style={{ color: palette.Black }}>
              {" "}
              List on the Impacts Exchange
            </Text>
          </Button>
        </div>
      </Card>

      {/* <Card
        shadow="sm"
        p="lg"
        radius="md"
        withBorder
        style={{ width: 400, background: palette.fullBlue }}
      >
        <Text
          style={{
            textAlign: "left",
            fontWeight: "400",
            fontSize: 16,
          }}
        >
          #405
        </Text>
        <Divider my="sm" style={{ paddingBottom: 20 }} />
        <Text
          style={{
            textAlign: "left",
            fontWeight: "400",
            fontSize: 16,
          }}
        >
          Creator: SupaMoto
        </Text>
        <Text
          style={{
            textAlign: "left",
            fontWeight: "400",
            fontSize: 16,
          }}
        >
          Collection: Malawi Collection 2023
        </Text>
        <Text
          style={{
            textAlign: "left",
            fontWeight: "400",
            fontSize: 16,
          }}
        >
          Number: #405 of 1,500
        </Text>
        <Text
          style={{
            textAlign: "left",
            fontWeight: "400",
            fontSize: 16,
            paddingBottom: 20,
          }}
        >
          Asset creation date: 19 Oct 22
        </Text>
        <div style={{ paddingTop: 12, paddingLeft: 45 }}>
          <Button
            leftIcon={<SendArrow />}
            style={{
              
              backgroundColor: palette.White,
              width: 272,
              paddingRight: 190,
              borderRadius: 23,
              height:46
            }}
          >
            <Text style={{ color: palette.Black }}>Send</Text>
          </Button>
        </div>
        <Grid style={{ paddingTop: 20, paddingLeft: 45, paddingRight: 28 }}>
          <Grid.Col span={6}>
            <Button
              leftIcon={<ImpactsLeaf />}
              style={{
                
                backgroundColor: palette.Neutral200,
                width: 122,
                borderRadius: 23,
              height:46
              }}
            >
              <Text style={{ color: palette.Black }}>Send</Text>
            </Button>
          </Grid.Col>
          <Grid.Col span={6}>
            <Button
              style={{
                
                backgroundColor: palette.brightBlue,
                width: 122,
                borderRadius: 23,
              height:46
              }}
            >
              <Text style={{ color: palette.fullBlue }}>0 offers</Text>
            </Button>
          </Grid.Col>
        </Grid>
      </Card>

      <Card
        shadow="sm"
        p="lg"
        radius="md"
        withBorder
        style={{ width: 400, background: palette.fullBlue }}
      >
        <Text
          style={{
            textAlign: "left",
            fontWeight: "400",
            fontSize: 16,
          }}
        >
          #405
        </Text>
        <Divider my="sm" style={{ paddingBottom: 20 }} />
        <Text
          style={{
            textAlign: "left",
            fontWeight: "400",
            fontSize: 16,
          }}
        >
          Creator: SupaMoto
        </Text>
        <Text
          style={{
            textAlign: "left",
            fontWeight: "400",
            fontSize: 16,
          }}
        >
          Collection: Malawi Collection 2023
        </Text>
        <Text
          style={{
            textAlign: "left",
            fontWeight: "400",
            fontSize: 16,
          }}
        >
          Number: #405 of 1,500
        </Text>
        <Text
          style={{
            textAlign: "left",
            fontWeight: "400",
            fontSize: 16,
            paddingBottom: 20,
          }}
        >
          Asset creation date: 19 Oct 22
        </Text>
        <div style={{ paddingTop: 12, paddingLeft: 45 }}>
          <Button
            leftIcon={<SendArrow />}
            style={{
              
              backgroundColor: palette.White,
              width: 272,
              paddingRight: 190,
              borderRadius: 23,
              height:46
            }}
          >
            <Text style={{ color: palette.Black }}>Send</Text>
          </Button>
        </div>
        <Grid style={{ paddingTop: 20, paddingLeft: 45, paddingRight: 28 }}>
          <Grid.Col span={6}>
            <Button
              leftIcon={<ImpactsLeaf />}
              style={{
                
                backgroundColor: palette.Neutral200,
                width: 122,
                borderRadius: 23,
              height:46
              }}
            >
              <Text style={{ color: palette.Black }}>Send</Text>
            </Button>
          </Grid.Col>
          <Grid.Col span={6}>
            <Button
              style={{
                
                backgroundColor: palette.orangeFull,
                width: 122,
                borderRadius: 23,
              height:46
              }}
            >
              <Text style={{ color: palette.Black }}>0 offers</Text>
            </Button>
          </Grid.Col>
        </Grid>
      </Card>

      <Card
        shadow="sm"
        p="lg"
        radius="md"
        withBorder
        style={{ width: 400, background: palette.White }}
      >
        <Text
          style={{
            textAlign: "left",
            fontWeight: "400",
            fontSize: 16,
          }}
        >
          #405
        </Text>
        <Divider my="sm" style={{ paddingBottom: 20 }} />
        <Text
          style={{
            textAlign: "left",
            fontWeight: "400",
            fontSize: 16,
          }}
        >
          Creator: SupaMoto
        </Text>
        <Text
          style={{
            textAlign: "left",
            fontWeight: "400",
            fontSize: 16,
          }}
        >
          Collection: Malawi Collection 2023
        </Text>
        <Text
          style={{
            textAlign: "left",
            fontWeight: "400",
            fontSize: 16,
          }}
        >
          Number: #405 of 1,500
        </Text>
        <Text
          style={{
            textAlign: "left",
            fontWeight: "400",
            fontSize: 16,
            paddingBottom: 20,
          }}
        >
          Asset creation date: 19 Oct 22
        </Text>

        <Grid>
          <Col span={"content"}>
            <Text style={{ color: palette.Black }}>owner :</Text>
          </Col>
          <Col span="content">
            <Text style={{ color: palette.fullBlue }}>
              ixo.12345...34563112
            </Text>
          </Col>
          <Col span={4}>
            <Copy />
          </Col>
        </Grid>

        <div style={{ paddingTop: 12 }}>
          <Button
            leftIcon={<ImpactsLeafGrey />}
            style={{
              
              backgroundColor: palette.Neutral100,
              width: 350,
              paddingRight: 190,
              borderRadius: 23,
              height:46
            }}
          >
            <Text style={{ color: palette.Neutral500 }}>Not Listed</Text>
          </Button>
        </div>
      </Card>

      <Card
        shadow="sm"
        p="lg"
        radius="md"
        withBorder
        style={{ width: 400, background: palette.White }}
      >
        <Text
          style={{
            textAlign: "left",
            fontWeight: "400",
            fontSize: 16,
          }}
        >
          #405
        </Text>
        <Divider my="sm" style={{ paddingBottom: 20 }} />
        <Text
          style={{
            textAlign: "left",
            fontWeight: "400",
            fontSize: 16,
          }}
        >
          Creator: SupaMoto
        </Text>
        <Text
          style={{
            textAlign: "left",
            fontWeight: "400",
            fontSize: 16,
          }}
        >
          Collection: Malawi Collection 2023
        </Text>
        <Text
          style={{
            textAlign: "left",
            fontWeight: "400",
            fontSize: 16,
          }}
        >
          Number: #405 of 1,500
        </Text>
        <Text
          style={{
            textAlign: "left",
            fontWeight: "400",
            fontSize: 16,
            paddingBottom: 20,
          }}
        >
          Asset creation date: 19 Oct 22
        </Text>

        <Grid>
          <Col span={"content"}>
            <Text style={{ color: palette.Black }}>owner :</Text>
          </Col>
          <Col span="content">
            <Text style={{ color: palette.fullBlue }}>
              ixo.12345...34563112
            </Text>
          </Col>
          <Col span={4}>
            <Copy />
          </Col>
        </Grid>

        <div style={{ paddingTop: 12 }}>
          <Button
            leftIcon={<ImpactsLeafWhite />}
            style={{
              
              backgroundColor: palette.fullBlue,
              width: 350,
              paddingRight: 100,
              borderRadius: 23,
              height:46
            }}
          >
            <Text style={{ color: palette.White }}>
              Make an offer to purchase
            </Text>
          </Button>
        </div>
      </Card> */}
    </div>
  );
}

export default EmergingAssetsSingle;
