import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Box, Card, Flex, Grid, Image, Progress, Text } from "@mantine/core";

import { palette } from "@/theme/palette";
import ArrowLeftIcon from "@/assets/icons/arrow-left.svg";
import Copy from "@/components/Dashboard/CollectionDashboard/cards/AssetsCard/icons/copy";
import { requestBatches } from "@/requests/blocksync";

import CategoryBox from "./CategoryBox";
import { categories, properties } from "./MOCKS";

export default function Certificate() {
  const router = useRouter();

  useEffect(() => {
    requestBatches().then((batches) => console.log("🦇", batches));
  }, []);

  return (
    <Card radius={16} p={0}>
      <Flex
        direction="column"
        justify="center"
        gap={20}
        py="1rem"
        px="2rem"
        sx={{
          position: "relative",
          backgroundImage: `url(/images/cert-bg.png)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: 400,
          borderRadius: 16,
        }}
      >
        <Box
          sx={{ position: "absolute", top: 48, cursor: "pointer" }}
          onClick={() => router.back()}
        >
          <ArrowLeftIcon />
        </Box>
        <Flex direction="column" gap={10} justify="center">
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
            VERIFIED EMISSION REDUCTIONS
          </Text>

          <Box sx={{ position: "relative" }}>
            <Text
              fw={600}
              color={palette.darkestBlue}
              sx={{ fontSize: "13px" }}
              align="center"
            >
              CARBON/bafyb...j2hha
              <Copy
                fill={palette.fullBlue}
                style={{ position: "absolute", top: "2px", marginLeft: "1em" }}
              />
            </Text>
          </Box>
        </Flex>

        <Flex align="center" justify="center" gap={28}>
          <Image
            width={150}
            height={150}
            src="/images/carbon-logo-lg.svg"
            alt=""
          />

          <Flex direction="column">
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
              / 1,200 CARBON offset ( 1 CARBON = 1 kgCO₂)
            </Text>
          </Flex>
        </Flex>

        <Flex justify="center" gap={10}>
          <Flex direction="column" gap={4} justify="center" align="center">
            <Text
              color={palette.darkestBlue}
              sx={{ fontSize: 10 }}
              transform="uppercase"
            >
              Measurement
            </Text>

            <Flex
              justify="center"
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

          <Flex direction="column" gap={4} justify="center" align="center">
            <Text
              color={palette.darkestBlue}
              sx={{ fontSize: 10 }}
              transform="uppercase"
            >
              Reporter
            </Text>

            <Flex
              justify="center"
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

          <Flex direction="column" gap={4} justify="center" align="center">
            <Text
              color={palette.darkestBlue}
              sx={{ fontSize: 10 }}
              transform="uppercase"
            >
              Verifier
            </Text>

            <Flex
              justify="center"
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
          {Object.values(categories).map((category, index) => (
            <Grid.Col key={index} span={6}>
              <CategoryBox
                category={category}
                properties={Object.values(properties).filter(
                  (property) => property.category! === category.category
                )}
              />
            </Grid.Col>
          ))}
        </Grid>
      </Flex>
    </Card>
  );
}
//
