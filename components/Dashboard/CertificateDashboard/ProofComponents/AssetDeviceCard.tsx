import { palette, shadow } from "@/theme/palette";
import { Flex, Progress, Text } from "@mantine/core";
import React from "react";
import moment from "moment";

interface Props {
  id: string;
  type: string;
  name: string;
  tokenName: string;
  decimals: number;
  description: string;
  image: string;
  properties: {
    denom: string;
    icon: string;
    maxSupply: string;
  };
}

const AssetDeviceCard: React.FC<Props> = (props: Props) => {
  //

  return (
    <Flex
      direction={"column"}
      sx={{
        boxShadow: shadow.default,
        width: 250,
        borderRadius: 8,
        overflow: "hidden",
      }}
    >
      <Flex
        justify={"center"}
        align="center"
        sx={{
          height: 150,
          backgroundImage: `url(${props.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      />

      <Flex direction={"column"} gap={8} sx={{ padding: "1rem" }}>
        <Flex align={"center"} justify="space-between">
          <Flex align={"center"} gap={4}>
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
            align={"center"}
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

        <Flex direction={"column"} gap={4} sx={{ minHeight: 60 }}>
          <Text
            color={"#01283B"}
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
            color={"#828E94"}
            fw={400}
            sx={{ fontFamily: "Roboto", fontSize: 12, lineHeight: "100%" }}
            lineClamp={2}
          >
            {props.description}
          </Text>
        </Flex>

        <Flex direction={"column"} gap={4}>
          <Progress
            sx={{ width: "100%" }}
            size={8}
            sections={[
              {
                value: 80,
                color: "#73B556",
              },
            ]}
          />
          <Text
            color={"#01283B"}
            fw={400}
            sx={{
              display: "flex",
              gap: 4,
              fontFamily: "Roboto",
              fontSize: 11,
              lineHeight: "13px",
            }}
          >
            <Text color={"#00D2FF"} fw={700} inherit>
              123 CARBON
            </Text>{" "}
            claimable /{" "}
            <Text fw={700} inherit>
              2145
            </Text>{" "}
            produced
          </Text>
        </Flex>

        <Flex>
          <Text
            color={"#7D8498"}
            fw={500}
            sx={{
              display: "flex",
              alignItems: "baseline",
              gap: 4,
              fontFamily: "Roboto",
              fontSize: 12,
              lineHeight: "14px",
            }}
          >
            <Text color={"#01283B"} sx={{ fontSize: 20 }} inherit>
              250
            </Text>{" "}
            of {Number(props.properties.maxSupply).toLocaleString()}
          </Text>
        </Flex>

        <Flex align={"center"} justify="space-between">
          <Text
            color={"#828E94"}
            fw={400}
            sx={{
              fontFamily: "Roboto",
              fontSize: 12,
              lineHeight: "14px",
            }}
          >
            {moment().format("DD/MM/YYYY")}
          </Text>
          <Text
            color={"#01283B"}
            fw={400}
            sx={{
              fontFamily: "Roboto",
              fontSize: 12,
              lineHeight: "14px",
            }}
          >
            $250.00
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default AssetDeviceCard;
