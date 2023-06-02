import { Card, Text, Divider, Group, Badge, Grid, Col } from "@mantine/core";
import { palette } from "../../theme/palette";
import Generated from "./icons/generated";
import Offset from "./icons/offset";
import Saved from "./icons/saved";
//@ts-ignore
import Ratings from "react-ratings-declarative";
import Car from "./icons/car";
import { SetStateAction, Suspense, useState } from "react";
import ImpactNavigation from "./impactNavigation";
import { mobileBreakpoint, tabletBreakpoint } from "@/constants/breakpoints";
import { useViewportSize } from "@mantine/hooks";
import Link from "next/link";
import Loading from "./loading";

function ImpactsGenerated() {
  const [rating, setRating] = useState(0);
  const viewPortSize = useViewportSize();
  return (
    <Card shadow="sm" radius={16} withBorder h={"100%"}>
      <Text
        style={{
          textAlign: "left",
          fontWeight: "400",
          fontSize: 16,
        }}
      >
        CLIMATE IMPACTS
      </Text>
      <Divider my="sm" />
      <ImpactNavigation />
      <Suspense fallback={<Loading />}>
        <Grid
          style={{
            paddingTop: viewPortSize.width >= tabletBreakpoint ? 28 : 0,
          }}
        >
          <Col span="content">
            <Text
              style={{
                fontStyle: "normal",
                fontSize: 56,
                color: palette.fullBlue,
                paddingLeft: 10,
              }}
            >
              0
            </Text>
          </Col>
          <Col span={6}>
            <Text
              style={{
                fontStyle: "normal",
                fontWeight: 300,
                fontSize: 16,
                color: palette.Black,
                paddingTop: viewPortSize.width >= mobileBreakpoint ? 44 : 0,
              }}
            >
              Carbon kilograms saved
            </Text>
          </Col>
        </Grid>
        <Text
          style={{
            fontStyle: "normal",
            fontSize: 16,
            color: palette.fullBlue,
          }}
        >
          ≈ 0 average yearly personal car emissions{" "}
          <Link
            href={
              "https://www.epa.gov/greenvehicles/greenhouse-gas-emissions-typical-passenger-vehicle"
            }
            target="_blank"
          >
            (source)
          </Link>
        </Text>

        <Ratings rating={rating} widgetRatedColors={palette.fullBlue}>
          <Ratings.Widget
            svgIconViewBox="0 0 60 51"
            widgetDimension={
              viewPortSize.width >= tabletBreakpoint ? "60px" : "50px"
            }
            svgIconPath="M49.75 4.14A4.699 4.699 0 0 0 45.312.984H10.938A4.7 4.7 0 0 0 6.5 4.14L0 22.86v25a3.134 3.134 0 0 0 3.125 3.125H6.25a3.125 3.125 0 0 0 3.125-3.125v-3.125h37.5v3.125A3.134 3.134 0 0 0 50 50.984h3.125a3.125 3.125 0 0 0 3.125-3.125v-25L49.75 4.14ZM10.937 35.36A4.681 4.681 0 0 1 6.25 30.67a4.681 4.681 0 0 1 4.688-4.687 4.681 4.681 0 0 1 4.687 4.687 4.681 4.681 0 0 1-4.688 4.688Zm34.376 0a4.681 4.681 0 0 1-4.688-4.688 4.681 4.681 0 0 1 4.688-4.687A4.681 4.681 0 0 1 50 30.67a4.681 4.681 0 0 1-4.688 4.688ZM6.25 19.734 10.938 5.67h34.374L50 19.734H6.25Z"
            widgetRatedColor={palette.fullBlue}
            widgetEmptyColors={palette.Neutral500}
            widgetHoverColor={palette.fullBlue}
          />
          <Ratings.Widget
            svgIconViewBox="0 0 60 51"
            widgetDimension={
              viewPortSize.width >= tabletBreakpoint ? "60px" : "50px"
            }
            svgIconPath="M49.75 4.14A4.699 4.699 0 0 0 45.312.984H10.938A4.7 4.7 0 0 0 6.5 4.14L0 22.86v25a3.134 3.134 0 0 0 3.125 3.125H6.25a3.125 3.125 0 0 0 3.125-3.125v-3.125h37.5v3.125A3.134 3.134 0 0 0 50 50.984h3.125a3.125 3.125 0 0 0 3.125-3.125v-25L49.75 4.14ZM10.937 35.36A4.681 4.681 0 0 1 6.25 30.67a4.681 4.681 0 0 1 4.688-4.687 4.681 4.681 0 0 1 4.687 4.687 4.681 4.681 0 0 1-4.688 4.688Zm34.376 0a4.681 4.681 0 0 1-4.688-4.688 4.681 4.681 0 0 1 4.688-4.687A4.681 4.681 0 0 1 50 30.67a4.681 4.681 0 0 1-4.688 4.688ZM6.25 19.734 10.938 5.67h34.374L50 19.734H6.25Z"
            widgetRatedColor={palette.fullBlue}
            widgetEmptyColors={palette.Neutral500}
            widgetHoverColor={palette.fullBlue}
          />
          <Ratings.Widget
            svgIconViewBox="0 0 60 51"
            widgetDimension={
              viewPortSize.width >= tabletBreakpoint ? "60px" : "50px"
            }
            svgIconPath="M49.75 4.14A4.699 4.699 0 0 0 45.312.984H10.938A4.7 4.7 0 0 0 6.5 4.14L0 22.86v25a3.134 3.134 0 0 0 3.125 3.125H6.25a3.125 3.125 0 0 0 3.125-3.125v-3.125h37.5v3.125A3.134 3.134 0 0 0 50 50.984h3.125a3.125 3.125 0 0 0 3.125-3.125v-25L49.75 4.14ZM10.937 35.36A4.681 4.681 0 0 1 6.25 30.67a4.681 4.681 0 0 1 4.688-4.687 4.681 4.681 0 0 1 4.687 4.687 4.681 4.681 0 0 1-4.688 4.688Zm34.376 0a4.681 4.681 0 0 1-4.688-4.688 4.681 4.681 0 0 1 4.688-4.687A4.681 4.681 0 0 1 50 30.67a4.681 4.681 0 0 1-4.688 4.688ZM6.25 19.734 10.938 5.67h34.374L50 19.734H6.25Z"
            widgetRatedColor={palette.fullBlue}
            widgetEmptyColors={palette.Neutral500}
            widgetHoverColor={palette.fullBlue}
          />
          <Ratings.Widget
            svgIconViewBox="0 0 60 51"
            widgetDimension={
              viewPortSize.width >= tabletBreakpoint ? "60px" : "50px"
            }
            svgIconPath="M49.75 4.14A4.699 4.699 0 0 0 45.312.984H10.938A4.7 4.7 0 0 0 6.5 4.14L0 22.86v25a3.134 3.134 0 0 0 3.125 3.125H6.25a3.125 3.125 0 0 0 3.125-3.125v-3.125h37.5v3.125A3.134 3.134 0 0 0 50 50.984h3.125a3.125 3.125 0 0 0 3.125-3.125v-25L49.75 4.14ZM10.937 35.36A4.681 4.681 0 0 1 6.25 30.67a4.681 4.681 0 0 1 4.688-4.687 4.681 4.681 0 0 1 4.687 4.687 4.681 4.681 0 0 1-4.688 4.688Zm34.376 0a4.681 4.681 0 0 1-4.688-4.688 4.681 4.681 0 0 1 4.688-4.687A4.681 4.681 0 0 1 50 30.67a4.681 4.681 0 0 1-4.688 4.688ZM6.25 19.734 10.938 5.67h34.374L50 19.734H6.25Z"
            widgetRatedColor={palette.fullBlue}
            widgetEmptyColors={palette.Neutral500}
            widgetHoverColor={palette.fullBlue}
          />
          <Ratings.Widget
            svgIconViewBox="0 0 60 51"
            widgetDimension={
              viewPortSize.width >= tabletBreakpoint ? "60px" : "50px"
            }
            svgIconPath="M49.75 4.14A4.699 4.699 0 0 0 45.312.984H10.938A4.7 4.7 0 0 0 6.5 4.14L0 22.86v25a3.134 3.134 0 0 0 3.125 3.125H6.25a3.125 3.125 0 0 0 3.125-3.125v-3.125h37.5v3.125A3.134 3.134 0 0 0 50 50.984h3.125a3.125 3.125 0 0 0 3.125-3.125v-25L49.75 4.14ZM10.937 35.36A4.681 4.681 0 0 1 6.25 30.67a4.681 4.681 0 0 1 4.688-4.687 4.681 4.681 0 0 1 4.687 4.687 4.681 4.681 0 0 1-4.688 4.688Zm34.376 0a4.681 4.681 0 0 1-4.688-4.688 4.681 4.681 0 0 1 4.688-4.687A4.681 4.681 0 0 1 50 30.67a4.681 4.681 0 0 1-4.688 4.688ZM6.25 19.734 10.938 5.67h34.374L50 19.734H6.25Z"
            widgetRatedColor={palette.fullBlue}
            widgetEmptyColors={palette.Neutral500}
            widgetHoverColor={palette.fullBlue}
          />
        </Ratings>
      </Suspense>
    </Card>
  );
}

export default ImpactsGenerated;
