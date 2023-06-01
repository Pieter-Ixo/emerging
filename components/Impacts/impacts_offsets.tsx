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
import { useViewportSize } from "@mantine/hooks";
import { mobileBreakpoint, tabletBreakpoint } from "@/constants/breakpoints";
import Loading from "./loading";
import Link from "next/link";

function ImpactsOffsets() {
  const [rating, setRating] = useState(0);
  const viewPortSize = useViewportSize();
  return (
    <Card
      shadow="sm"
      radius={16}
      withBorder
      h={370}
      style={{
        width:
          viewPortSize.width >= mobileBreakpoint
            ? viewPortSize.width * 0.447
            : 358,
      }}
    >
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
                color: palette.greenFull,
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
              Carbon kilograms offset
            </Text>
          </Col>
        </Grid>
        <Text
          style={{
            fontStyle: "normal",
            fontSize: 16,
            color: palette.greenFull,
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

        <Ratings rating={rating} widgetRatedColors={palette.greenFull}>
          <Ratings.Widget
            svgIconViewBox="0 0 60 51"
            widgetDimension={
              viewPortSize.width >= tabletBreakpoint ? "60px" : "50px"
            }
            svgIconPath="M30.67 29.52v-.042l.292-2.176c.042-.168.084-.251.126-.251l19.623 3.263v-3.263a3.188 3.188 0 0 0-2.301-3.055c-6.109-2.468-11.8-4.602-17.197-7.53l-.125-1.507c-.251-3.096-.795-6.15-1.548-9.122-.21-.878-.46-1.757-.753-2.594-.21-.67-.628-1.255-1.172-1.631-.544-.419-1.213-.628-1.925-.628H25.02c-.71 0-1.38.21-1.924.627-.544.419-.962.963-1.171 1.632-.251.879-.502 1.716-.753 2.594a52.624 52.624 0 0 0-1.549 9.122l-.125 1.506C14.1 19.394 8.368 21.528 2.3 23.996.921 24.373 0 25.628 0 27.051v3.263l19.623-3.263c.042 0 .084.084.126.25l.293 2.177v.041l1.046 8.034.753 5.858c-.293.209-.753.46-1.297.795-2.469 1.506-6.61 4.058-6.61 4.058v2.72l6.82-1.548 1.673-.377 2.175-.502c.252-.084.544-.084.796-.084.292 0 .585 0 .794.084l2.176.502 1.674.377 6.82 1.548v-2.72s-4.142-2.552-6.61-4.058c-.503-.335-.963-.586-1.298-.795l.753-5.858.962-8.033Z"
            widgetRatedColor={palette.greenFull}
            widgetEmptyColors={palette.Neutral500}
            widgetHoverColor={palette.greenFull}
          />
          <Ratings.Widget
            svgIconViewBox="0 0 60 51"
            widgetDimension={
              viewPortSize.width >= tabletBreakpoint ? "60px" : "50px"
            }
            svgIconPath="M30.67 29.52v-.042l.292-2.176c.042-.168.084-.251.126-.251l19.623 3.263v-3.263a3.188 3.188 0 0 0-2.301-3.055c-6.109-2.468-11.8-4.602-17.197-7.53l-.125-1.507c-.251-3.096-.795-6.15-1.548-9.122-.21-.878-.46-1.757-.753-2.594-.21-.67-.628-1.255-1.172-1.631-.544-.419-1.213-.628-1.925-.628H25.02c-.71 0-1.38.21-1.924.627-.544.419-.962.963-1.171 1.632-.251.879-.502 1.716-.753 2.594a52.624 52.624 0 0 0-1.549 9.122l-.125 1.506C14.1 19.394 8.368 21.528 2.3 23.996.921 24.373 0 25.628 0 27.051v3.263l19.623-3.263c.042 0 .084.084.126.25l.293 2.177v.041l1.046 8.034.753 5.858c-.293.209-.753.46-1.297.795-2.469 1.506-6.61 4.058-6.61 4.058v2.72l6.82-1.548 1.673-.377 2.175-.502c.252-.084.544-.084.796-.084.292 0 .585 0 .794.084l2.176.502 1.674.377 6.82 1.548v-2.72s-4.142-2.552-6.61-4.058c-.503-.335-.963-.586-1.298-.795l.753-5.858.962-8.033Z"
            widgetRatedColor={palette.greenFull}
            widgetEmptyColors={palette.Neutral500}
            widgetHoverColor={palette.greenFull}
          />
          <Ratings.Widget
            svgIconViewBox="0 0 60 51"
            widgetDimension={
              viewPortSize.width >= tabletBreakpoint ? "60px" : "50px"
            }
            svgIconPath="M30.67 29.52v-.042l.292-2.176c.042-.168.084-.251.126-.251l19.623 3.263v-3.263a3.188 3.188 0 0 0-2.301-3.055c-6.109-2.468-11.8-4.602-17.197-7.53l-.125-1.507c-.251-3.096-.795-6.15-1.548-9.122-.21-.878-.46-1.757-.753-2.594-.21-.67-.628-1.255-1.172-1.631-.544-.419-1.213-.628-1.925-.628H25.02c-.71 0-1.38.21-1.924.627-.544.419-.962.963-1.171 1.632-.251.879-.502 1.716-.753 2.594a52.624 52.624 0 0 0-1.549 9.122l-.125 1.506C14.1 19.394 8.368 21.528 2.3 23.996.921 24.373 0 25.628 0 27.051v3.263l19.623-3.263c.042 0 .084.084.126.25l.293 2.177v.041l1.046 8.034.753 5.858c-.293.209-.753.46-1.297.795-2.469 1.506-6.61 4.058-6.61 4.058v2.72l6.82-1.548 1.673-.377 2.175-.502c.252-.084.544-.084.796-.084.292 0 .585 0 .794.084l2.176.502 1.674.377 6.82 1.548v-2.72s-4.142-2.552-6.61-4.058c-.503-.335-.963-.586-1.298-.795l.753-5.858.962-8.033Z"
            widgetRatedColor={palette.greenFull}
            widgetEmptyColors={palette.Neutral500}
            widgetHoverColor={palette.greenFull}
          />
          <Ratings.Widget
            svgIconViewBox="0 0 60 51"
            widgetDimension={
              viewPortSize.width >= tabletBreakpoint ? "60px" : "50px"
            }
            svgIconPath="M30.67 29.52v-.042l.292-2.176c.042-.168.084-.251.126-.251l19.623 3.263v-3.263a3.188 3.188 0 0 0-2.301-3.055c-6.109-2.468-11.8-4.602-17.197-7.53l-.125-1.507c-.251-3.096-.795-6.15-1.548-9.122-.21-.878-.46-1.757-.753-2.594-.21-.67-.628-1.255-1.172-1.631-.544-.419-1.213-.628-1.925-.628H25.02c-.71 0-1.38.21-1.924.627-.544.419-.962.963-1.171 1.632-.251.879-.502 1.716-.753 2.594a52.624 52.624 0 0 0-1.549 9.122l-.125 1.506C14.1 19.394 8.368 21.528 2.3 23.996.921 24.373 0 25.628 0 27.051v3.263l19.623-3.263c.042 0 .084.084.126.25l.293 2.177v.041l1.046 8.034.753 5.858c-.293.209-.753.46-1.297.795-2.469 1.506-6.61 4.058-6.61 4.058v2.72l6.82-1.548 1.673-.377 2.175-.502c.252-.084.544-.084.796-.084.292 0 .585 0 .794.084l2.176.502 1.674.377 6.82 1.548v-2.72s-4.142-2.552-6.61-4.058c-.503-.335-.963-.586-1.298-.795l.753-5.858.962-8.033Z"
            widgetRatedColor={palette.greenFull}
            widgetEmptyColors={palette.Neutral500}
            widgetHoverColor={palette.greenFull}
          />
          <Ratings.Widget
            svgIconViewBox="0 0 60 51"
            widgetDimension={
              viewPortSize.width >= tabletBreakpoint ? "60px" : "50px"
            }
            svgIconPath="M30.67 29.52v-.042l.292-2.176c.042-.168.084-.251.126-.251l19.623 3.263v-3.263a3.188 3.188 0 0 0-2.301-3.055c-6.109-2.468-11.8-4.602-17.197-7.53l-.125-1.507c-.251-3.096-.795-6.15-1.548-9.122-.21-.878-.46-1.757-.753-2.594-.21-.67-.628-1.255-1.172-1.631-.544-.419-1.213-.628-1.925-.628H25.02c-.71 0-1.38.21-1.924.627-.544.419-.962.963-1.171 1.632-.251.879-.502 1.716-.753 2.594a52.624 52.624 0 0 0-1.549 9.122l-.125 1.506C14.1 19.394 8.368 21.528 2.3 23.996.921 24.373 0 25.628 0 27.051v3.263l19.623-3.263c.042 0 .084.084.126.25l.293 2.177v.041l1.046 8.034.753 5.858c-.293.209-.753.46-1.297.795-2.469 1.506-6.61 4.058-6.61 4.058v2.72l6.82-1.548 1.673-.377 2.175-.502c.252-.084.544-.084.796-.084.292 0 .585 0 .794.084l2.176.502 1.674.377 6.82 1.548v-2.72s-4.142-2.552-6.61-4.058c-.503-.335-.963-.586-1.298-.795l.753-5.858.962-8.033Z"
            widgetRatedColor={palette.greenFull}
            widgetEmptyColors={palette.Neutral500}
            widgetHoverColor={palette.greenFull}
          />
        </Ratings>
      </Suspense>
    </Card>
  );
}

export default ImpactsOffsets;
