import { palette, shadow } from "@/theme/palette";
import { Flex, Text } from "@mantine/core";
import React from "react";
import moment from "moment";

interface Props {
  name: string;
  description: string;
  image: string;
  assets: number;
  properties: {
    denom: string;
    icon: string;
    maxSupply: string;
  };
}

export default function CollectionCard(props: Props) {
  return (
    <Flex
      direction="column"
      sx={{
        boxShadow: shadow.default,
        width: 250,
        borderRadius: 8,
        overflow: "hidden",
      }}
    >
      <Flex
        justify="center"
        align="center"
        sx={{
          height: 150,
          backgroundImage: `url(${props.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      <Flex direction="column" gap={8} sx={{ padding: "1rem" }}>
        <Flex align="center" justify="space-between">
          <Flex align="center" gap={4}>
            <Flex
              sx={{
                background: palette.redDark,
                borderRadius: 6,
                padding: "2px 8px",
              }}
            >
              <Text
                color={palette.White}
                sx={{ fontFamily: "Roboto", fontSize: 12 }}
                fw={600}
              >
                Inventory
              </Text>
            </Flex>
            <Flex
              sx={{
                background: palette.orangeFull,
                borderRadius: 6,
                padding: "2px 8px",
              }}
            >
              <Text
                color={palette.White}
                sx={{ fontFamily: "Roboto", fontSize: 12 }}
                fw={600}
                transform="uppercase"
              >
                Carbon
              </Text>
            </Flex>
          </Flex>
          <Flex
            align="center"
            justify="center"
            sx={{
              width: 32,
              height: 32,
              borderRadius: "100%",
              background: `url(${props.properties.icon}), ${palette.Neutral100}`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          />
        </Flex>

        <Flex direction="column" gap={4} sx={{ minHeight: 60 }}>
          <Text
            color="#01283B"
            fw={700}
            sx={{
              fontFamily: "Roboto",
              fontSize: 20,
              lineHeight: "21px",
            }}
            lineClamp={2}
          >
            {props.name}
          </Text>
          <Text
            color="#828E94"
            fw={400}
            sx={{ fontFamily: "Roboto", fontSize: 12, lineHeight: "100%" }}
            // lineClamp={4}
          >
            {props.description}
          </Text>
        </Flex>

        <Flex direction="column" gap={4} sx={{ height: 25 }} />

        <Flex>
          <Text
            color="#01283B"
            fw={500}
            sx={{
              fontFamily: "Roboto",
              fontSize: 20,
              lineHeight: "21px",
            }}
          >
            {props.assets} assets
          </Text>
        </Flex>

        <Flex align="center" justify="space-between">
          <Text
            color="#828E94"
            fw={400}
            sx={{
              fontFamily: "Roboto",
              fontSize: 12,
              lineHeight: "14px",
            }}
          >
            {moment("2023-06-26").format("DD/MM/YYYY")}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}
