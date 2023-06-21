import { palette, shadow } from "@/theme/palette";
import { Flex, Progress, Text } from "@mantine/core";
import React from "react";
import moment from "moment";

interface Props {
  image: string;
  icon: string;
  name: string;
  description: string;
  numOfAssets: number;
}

const OracleCard: React.FC<Props> = (props: Props) => {
  //

  console.log("OracleCard", { props });

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
                background: palette.darkerBlue,
                borderRadius: 6,
                padding: "2px 8px",
              }}
            >
              <Text
                color={palette.White}
                sx={{ fontFamily: "Roboto", fontSize: 12 }}
                fw={600}
              >
                Oracle
              </Text>
            </Flex>
            <Flex
              sx={{
                background: palette.greenFull,
                borderRadius: 6,
                padding: "2px 8px",
              }}
            >
              <Text
                color={palette.White}
                sx={{ fontFamily: "Roboto", fontSize: 12 }}
                fw={600}
              >
                Impact Tokens
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
              background: `url(${props.icon})`,
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
              lineHeight: "100%",
            }}
            lineClamp={2}
          >
            {props.name}
          </Text>
          <Text
            color="#828E94"
            fw={400}
            sx={{ fontFamily: "Roboto", fontSize: 12, lineHeight: "100%" }}
            lineClamp={2}
          >
            {props.description}
          </Text>
        </Flex>

        <Flex direction="column" gap={4} sx={{ height: 25 }} />

        <Flex>
          <Text
            color="#7D8498"
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
            <Text color="#01283B" sx={{ fontSize: 20 }} inherit>
              {props.numOfAssets.toLocaleString()}
            </Text>{" "}
            CARBON issued
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
            {moment().format("DD/MM/YYYY")}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default OracleCard;
