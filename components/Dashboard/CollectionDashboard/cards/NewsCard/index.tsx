import { Card, Text, Divider, Group, Grid, Image } from "@mantine/core";
import ArrowRight from "./icons/arrowRight";

function NewsCard() {
  return (
    <Card
      shadow="sm"
      p="lg"
      radius={16}
      withBorder
      style={
        {
          // width: viewPortSize.width >= mobileBreakpoint ? 400 : 358,
          // height: 370,
        }
      }
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
          // width: viewPortSize.width >= mobileBreakpoint ? 355 : 294,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <Image
          radius="md"
          // height={viewPortSize.width >= mobileBreakpoint ? 200 : 171}
          height="100%"
          src={"IMG_3991.jpg"}
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
