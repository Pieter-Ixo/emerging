import { Card, Text, Divider, Group, Grid, Image, Flex } from "@mantine/core";
import ArrowRight from "./icons/arrowRight";

function NewsCard() {
  return (
    <Card radius={16} style={{ padding: "1rem 2rem" }} h="100%">
      <Grid>
        <Grid.Col span={6}>
          <Text
            fw={400}
            style={{
              textAlign: "left",
              fontSize: 16,
            }}
            transform="uppercase"
          >
            News
          </Text>
        </Grid.Col>
        <Grid.Col span={6}>
          <Flex
            justify={"flex-end"}
            align="center"
            gap={8}
            sx={{ cursor: "pointer" }}
          >
            <Text
              style={{
                textAlign: "right",
                fontWeight: "400",
                fontSize: 16,
              }}
            >
              SEE ALL
            </Text>
            <ArrowRight pathFill="#000000" />
          </Flex>
        </Grid.Col>
      </Grid>
      <Divider mb="lg" color={"#000000"} />
      <Flex direction={"column"} gap={8}>
        <Image
          radius="md"
          // height={viewPortSize.width >= mobileBreakpoint ? 200 : 171}
          height="100%"
          src={"IMG_3991.jpg"}
          alt="News"
        />
        <Text
          style={{
            fontWeight: "500",
            fontSize: 12,
          }}
        >
          Nov 12 22
        </Text>
        <Text
          style={{
            fontWeight: "300",
            fontSize: 16,
            fontStyle: "normal",
          }}
        >
          The success story of African Emerging Households
        </Text>
      </Flex>
    </Card>
  );
}

export default NewsCard;
