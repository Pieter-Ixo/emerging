import {
  Card,
  Text,
  Divider,
  Group,
  Badge,
  Grid,
  Col,
  Image,
} from "@mantine/core";
import { useState } from "react";
import ArrowRight from "./icons/arrowRight";
import IMG_3991 from "../../public/IMG_3991.jpg";
import { useViewportSize } from "@mantine/hooks";
import { mobileBreakpoint } from "@/constants/breakpoints";

function NewsCard() {
  const [rating, setRating] = useState(0.3);

  const viewPortSize = useViewportSize();

  return (
    <Card
      shadow="sm"
      p="lg"
      radius={16}
      withBorder
      style={{
        width: viewPortSize.width >= mobileBreakpoint ? 400 : 358,
        height: 370,
      }}
    >
      <Grid>
        <Grid.Col span={6}>
          <Text
            style={{
              textAlign: "left",
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            NEWS
          </Text>
        </Grid.Col>
        <Grid.Col span={6}>
          <Group style={{ paddingLeft: 60 }}>
            <Text
              style={{
                textAlign: "right",
                fontWeight: "400",
                fontSize: 16,
              }}
            >
              SEE ALL
            </Text>
            <ArrowRight />
          </Group>
        </Grid.Col>
      </Grid>
      <Divider my="sm" />
      <div
        style={{
          width: viewPortSize.width >= mobileBreakpoint ? 355 : 294,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <Image
          radius="md"
          height={viewPortSize.width >= mobileBreakpoint ? 200 : 171}
          src={IMG_3991.src}
          alt="News"
        />
        <Text
          style={{
            textAlign: "left",

            fontWeight: "300",
            fontSize: 12,
            paddingTop: 10,
            paddingLeft: 5,
            fontStyle: "bold",
          }}
        >
          Nov 12 22
        </Text>
        <Text
          style={{
            textAlign: "left",

            fontWeight: "500",
            fontSize: 16,
            paddingTop: 10,
            paddingLeft: 5,
            fontStyle: "normal",
          }}
        >
          The success story of African Emerging Households
        </Text>
      </div>
    </Card>
  );
}

export default NewsCard;
