import { Card, Text, Divider, Grid, Flex } from "@mantine/core";
import Image from "next/image";

import ArrowRight from "./icons/arrowRight";

export default function CollectionNewsCard() {
  return (
    <Card radius={16} py="1rem" px="2rem" h="100%">
      <Grid>
        <Grid.Col span={6}>
          <Text ta="left" size={16} fw={400} transform="uppercase">
            News
          </Text>
        </Grid.Col>
        <Grid.Col span={6}>
          <Flex
            justify="flex-end"
            align="center"
            gap={8}
            sx={{ cursor: "pointer" }}
          >
            <Text ta="right" fw={400} size={16}>
              SEE ALL
            </Text>
            <ArrowRight pathFill="#000000" />
          </Flex>
        </Grid.Col>
      </Grid>
      <Divider mb="lg" color="#000000" />
      <Flex direction="column" gap={8}>
        <Image src="/IMG_3991.jpg" alt="" height={170} width={250} />
        <Text fw={500} size={12}>
          Nov 12 22
        </Text>
        <Text fw={300} size={16} fs="normal">
          The success story of African Emerging Households
        </Text>
      </Flex>
    </Card>
  );
}
