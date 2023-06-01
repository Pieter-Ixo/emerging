import Copy from "@/components/emergingAssets/icons/copy";
import { palette, shadow } from "@/theme/palette";
import { Box, Card, Flex, Grid, Image, Progress, Text } from "@mantine/core";
import React from "react";

const data = [
  {
    type: "Impact Asset",
    icon: "/images/icon-assets.svg",
    properties: [
      {
        key: "identifier",
        value: "SupaMoto #15",
      },
      {
        key: "collection",
        value: "Zambia Collection",
      },
      {
        key: "denom",
        value: "SUPA",
      },
      {
        key: "creation date",
        value: "5 Apr 2023",
      },
      {
        key: "total CARBON produced",
        value: "1,235 CARBON",
      },
      {
        key: "total emissions avoided",
        value: "1,235 kgCO2",
      },
      {
        key: "owned by",
        value: "ixo12345...12345",
      },
      {
        key: "performance",
        value: "dashboard",
      },
    ],
  },
  {
    type: "Impact Claim",
    icon: "/images/icon-leaf-solid.svg",
    properties: [
      {
        key: "fuel type",
        value: "biomass",
      },
      {
        key: "fuel amount",
        value: "32 kg",
      },
      {
        key: "cooking time",
        value: "120 h 30 min",
      },
      {
        key: "conversion factor",
        value: "11.1",
      },
      {
        key: "period",
        value: "Apr 10 - May 10 2023",
      },
      {
        key: "emissions avoided",
        value: "1,000 kgCO2",
      },
      {
        key: "claim issuer",
        value: "EmergingDAO",
      },
      {
        key: "claim id",
        value: "12345",
      },
    ],
  },
  {
    type: "Clean Energy Device",
    icon: "/images/icon-cogs-solid.svg",
    properties: [
      {
        key: "type",
        value: "cookstove",
      },
      {
        key: "model",
        value: "Mimimoto",
      },
      {
        key: "fuel",
        value: "biomass",
      },
      {
        key: "manufacture date",
        value: "Jan 12 2023",
      },
      {
        key: "manufacture place",
        value: "South Africa",
      },
    ],
  },
  {
    type: "Project",
    icon: "/images/icon-projects.svg",
    properties: [
      {
        key: "name",
        value: "SupaMoto Zambia",
      },
      {
        key: "developer",
        value: "Emerging Cooking Solutions",
      },
      {
        key: "country",
        value: "Zambia",
      },
      {
        key: "impact producers",
        value: "1,500",
      },
      {
        key: "emissions avoided",
        value: "1,500,123 kgCO2",
      },
    ],
  },
  {
    type: "Impact Producer",
    icon: "/images/icon-user.svg",
    properties: [
      {
        key: "identifier",
        value: "abc1234",
      },
      {
        key: "country",
        value: "Zambia",
      },
      {
        key: "setting",
        value: "rural",
      },
      {
        key: "household",
        value: "4 members",
      },
      {
        key: "total cooking time",
        value: "541h 31min",
      },
    ],
  },
  {
    type: "Evaluator",
    icon: "/images/icon-chart-bar-solid.svg",
    properties: [
      {
        key: "oracle",
        value: "Carbon Oracle",
      },
      {
        key: "methodology",
        value: "Gold Standard",
      },
      {
        key: "model",
        value: "Carbon AI Model",
      },
      {
        key: "version",
        value: "1.03",
      },
      {
        key: "claims processed",
        value: "1,200,412",
      },
    ],
  },
];

interface Props {
  type: string;
  icon: string;
  properties: {
    key: string;
    value: string;
  }[];
}

const StatBox: React.FC<Props> = ({ type, icon, properties }) => (
  <Flex direction={"column"}>
    <Flex
      sx={{
        borderBottom: `1px solid ${palette.Black}`,
        paddingBottom: "8px",
        marginBottom: "8px",
      }}
      gap={8}
      align="center"
    >
      <Image width={24} height={24} src={icon} alt="" />
      <Text
        fw={400}
        sx={{ fontSize: 13 }}
        color={palette.darkestBlue}
        transform="uppercase"
      >
        {type}
      </Text>
    </Flex>

    <Flex direction={"column"} gap={8}>
      {properties.map((property, index) => (
        <Flex key={index} justify="space-between" align={"center"}>
          <Text fw={400} sx={{ fontSize: 13 }} color={palette.darkestBlue}>
            {property.key}
          </Text>
          <Text fw={400} sx={{ fontSize: 13 }} color={palette.darkestBlue}>
            {property.value}
          </Text>
        </Flex>
      ))}
    </Flex>
  </Flex>
);

const ProofCard: React.FC = () => {
  return (
    <Card
      shadow={shadow.default}
      radius={16}
      sx={{}}
      style={{ padding: "0rem" }}
    >
      <Flex
        direction={"column"}
        justify="center"
        gap={20}
        sx={{
          backgroundImage: `url(/images/cert-bg.png)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: 400,
          padding: "1rem 2rem",
          borderRadius: 16,
        }}
      >
        <Flex direction={"column"} gap={10} justify="center">
          <Text
            fw={700}
            color={palette.White}
            align="center"
            sx={{
              fontFamily: "Quicksand",
              fontSize: "18px",
              letterSpacing: "0.1rem",
            }}
          >
            VERIFIED EMISSION REDUCTION CERTIFICATE
          </Text>

          <Flex
            gap={8}
            align={"center"}
            justify="center"
            sx={{ cursor: "pointer" }}
          >
            <Text
              fw={600}
              color={palette.darkestBlue}
              sx={{ fontSize: "13px" }}
              align="center"
            >
              CARBON/bafyb...j2hha
            </Text>
            <Copy fill={palette.fullBlue} />
          </Flex>
        </Flex>

        <Flex align={"center"} justify="center" gap={28}>
          <Image
            width={150}
            height={150}
            src={"/images/carbon-logo-lg.svg"}
            alt=""
          />

          <Flex direction={"column"}>
            <Flex gap={8} align="baseline">
              <Text
                color={palette.White}
                fw={600}
                sx={{ fontFamily: "Quicksand", fontSize: "48px" }}
              >
                1,200
              </Text>

              <Text
                color={palette.White}
                fw={700}
                sx={{ fontFamily: "Quicksand", fontSize: "18px" }}
                transform="uppercase"
              >
                carbon
              </Text>
            </Flex>

            <Progress
              radius="xl"
              size={14}
              sections={[{ value: 40, color: palette.fullBlue }]}
              sx={{ minWidth: 300 }}
            />

            <Text c={palette.White} fw={400} sx={{ fontSize: 13 }}>
              <Text span c={palette.fullBlue} inherit>
                421 CARBON
              </Text>{" "}
              / 1,200 CARBON offset ( 1 CARBON = 1 kgCO2)
            </Text>
          </Flex>
        </Flex>

        <Flex justify={"center"} gap={10}>
          <Flex direction={"column"} gap={4} justify="center" align={"center"}>
            <Text
              color={palette.darkestBlue}
              sx={{ fontSize: 10 }}
              transform="uppercase"
            >
              Measurement
            </Text>

            <Flex
              justify={"center"}
              align="center"
              sx={{
                width: 150,
                height: 48,
                borderRadius: 10,
                background: "rgba(255, 255, 255, 0.3)",
              }}
            >
              <Text color={palette.darkestBlue} sx={{ fontSize: 13 }}>
                Verified Emission Reduction
              </Text>
            </Flex>
          </Flex>

          <Flex direction={"column"} gap={4} justify="center" align={"center"}>
            <Text
              color={palette.darkestBlue}
              sx={{ fontSize: 10 }}
              transform="uppercase"
            >
              Reporter
            </Text>

            <Flex
              justify={"center"}
              align="center"
              sx={{
                width: 150,
                height: 48,
                borderRadius: 10,
                background: "rgba(255, 255, 255, 0.3)",
              }}
            >
              <Text color={palette.darkestBlue} sx={{ fontSize: 13 }}>
                SupaMoto Zambia
              </Text>
            </Flex>
          </Flex>

          <Flex direction={"column"} gap={4} justify="center" align={"center"}>
            <Text
              color={palette.darkestBlue}
              sx={{ fontSize: 10 }}
              transform="uppercase"
            >
              Verifier
            </Text>

            <Flex
              justify={"center"}
              align="center"
              sx={{
                width: 150,
                height: 48,
                borderRadius: 10,
                background: "rgba(255, 255, 255, 0.3)",
              }}
            >
              <Text color={palette.darkestBlue} sx={{ fontSize: 13 }}>
                Carbon Oracle
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Flex>

      <Flex sx={{ padding: "1rem 2rem", width: "100%" }}>
        <Grid sx={{ width: "100%" }} gutter="lg">
          {data.map((item, index) => (
            <Grid.Col key={index} span={6}>
              <StatBox {...item} />
            </Grid.Col>
          ))}
        </Grid>
      </Flex>
    </Card>
  );
};

export default ProofCard;
