import { Card, Text, Divider, Image, Grid, Group } from "@mantine/core";
import { useState } from "react";
import ArrowLeft from "./icons/arrowLeft";
import ArrowRight from "./icons/arrowRight";

function NewsCardFull() {
  const [rating, setRating] = useState(0.3);
  return (
    <Card shadow="sm" p="lg" radius="md" withBorder style={{ width: 1200, height:950 }}>
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
          <Group style={{ paddingLeft: 520 }}>
            
            <ArrowLeft />
          </Group>
        </Grid.Col>
      </Grid>
      <Divider my="sm" />
      <Grid style={{paddingBottom:20}}>
        <Grid.Col span={4}>
          <div style={{ width: 355 }}>
            <Image
              radius="md"
              src="https://images.unsplash.com/photo-1511216335778-7cb8f49fa7a3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
              alt="Random unsplash image"
            />
          </div>
        </Grid.Col>
        <Grid.Col span={8}>
          <Text
            style={{
              textAlign: "left",
              fontWeight: "bold",
              fontSize: 12,
              paddingBottom:6
            }}
          >
            Nov 12 22
          </Text>
          <Text
            style={{
              textAlign: "left",
              fontWeight: "normal",
              fontSize: 24,
              paddingBottom:15
            }}
          >
            The success story of African Emerging Households
          </Text>
          <Text
            style={{
              textAlign: "left",
              fontWeight: 300,
              fontSize: 16,
              lineHeight:"1.5"
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Semper eget duis at tellus at. Sapien pellentesque habitant morbi tristique senectus. Pellentesque habitant morbi tristique senectus et netus et. Placerat in egestas erat imperdiet sed....
          </Text>
        </Grid.Col>
      </Grid>
      <Grid style={{paddingBottom:20}}>
        <Grid.Col span={4}>
          <div style={{ width: 355 }}>
            <Image
              radius="md"
              src="https://images.unsplash.com/photo-1511216335778-7cb8f49fa7a3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
              alt="Random unsplash image"
            />
          </div>
        </Grid.Col>
        <Grid.Col span={8}>
          <Text
            style={{
              textAlign: "left",
              fontWeight: "bold",
              fontSize: 12,
              paddingBottom:6
            }}
          >
            Nov 12 22
          </Text>
          <Text
            style={{
              textAlign: "left",
              fontWeight: "normal",
              fontSize: 24,
              paddingBottom:15
            }}
          >
            The success story of African Emerging Households
          </Text>
          <Text
            style={{
              textAlign: "left",
              fontWeight: 300,
              fontSize: 16,
              lineHeight:"1.5"
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Semper eget duis at tellus at. Sapien pellentesque habitant morbi tristique senectus. Pellentesque habitant morbi tristique senectus et netus et. Placerat in egestas erat imperdiet sed....
          </Text>
        </Grid.Col>
      </Grid>
      <Grid style={{paddingBottom:20}}>
        <Grid.Col span={4}>
          <div style={{ width: 355 }}>
            <Image
              radius="md"
              src="https://images.unsplash.com/photo-1511216335778-7cb8f49fa7a3?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=720&q=80"
              alt="Random unsplash image"
            />
          </div>
        </Grid.Col>
        <Grid.Col span={8}>
          <Text
            style={{
              textAlign: "left",
              fontWeight: "bold",
              fontSize: 12,
              paddingBottom:6
            }}
          >
            Nov 12 22
          </Text>
          <Text
            style={{
              textAlign: "left",
              fontWeight: "normal",
              fontSize: 24,
              paddingBottom:15
            }}
          >
            The success story of African Emerging Households
          </Text>
          <Text
            style={{
              textAlign: "left",
              fontWeight: 300,
              fontSize: 16,
              lineHeight:"1.5"
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Semper eget duis at tellus at. Sapien pellentesque habitant morbi tristique senectus. Pellentesque habitant morbi tristique senectus et netus et. Placerat in egestas erat imperdiet sed....
          </Text>
        </Grid.Col>
      </Grid>

     
    </Card>
  );
}

export default NewsCardFull;
