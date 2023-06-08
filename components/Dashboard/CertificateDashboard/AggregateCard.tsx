import Copy from "../CollectionDashboard/cards/AssetsCard/icons/copy";
import { palette, shadow } from "@/theme/palette";
import { Box, Card, Flex, Grid, Image, Progress, Text } from "@mantine/core";
import React from "react";
import ArrowLeftIcon from "@/assets/icons/arrow-left.svg";
import { usePathname, useRouter } from "next/navigation";
import Router from "next/router";
import {
  ICategoriesModel,
  ICategoryModel,
  IPropertiesModel,
  IPropertyModel,
} from ".";
import Link from "next/link";

const CategoryBox: React.FC<{
  category: ICategoryModel;
  properties: IPropertyModel[];
}> = ({ category, properties }) => {
  const pathname = usePathname();
  const hashId = window.location.hash;

  const handleClick = (key: string) => {
    if (hashId === `#${key}`) {
      Router.push({ pathname });
    } else {
      Router.push({ pathname, hash: key });
    }
  };

  return (
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
        <Image width={24} height={24} src={category.icon} alt="" />
        <Text
          fw={400}
          sx={{ fontSize: 13 }}
          color={palette.darkestBlue}
          transform="uppercase"
        >
          {category.category}
        </Text>
      </Flex>

      <Flex direction={"column"} gap={8}>
        {Object.values(properties).map((property, index) => {
          const { component, props, key, text, value, external } = property;
          return (
            <Flex key={index} justify="space-between" align={"center"}>
              <Text fw={400} sx={{ fontSize: 13 }} color={palette.darkestBlue}>
                {text || key}
              </Text>
              {hashId === `#${key}` ? (
                <Text
                  fw={400}
                  sx={{
                    fontSize: 13,
                    cursor: "pointer",
                    backgroundColor: palette.fullBlue,
                    borderRadius: 9999,
                    padding: "0 0.5rem",
                  }}
                  color={palette.White}
                  onClick={() => handleClick(key)}
                >
                  {value}
                </Text>
              ) : component && props ? (
                <Text
                  fw={400}
                  sx={{
                    fontSize: 13,
                    cursor: "pointer",
                  }}
                  color={palette.fullBlue}
                  onClick={() => handleClick(key)}
                >
                  {value}
                </Text>
              ) : external ? (
                <Link href={external} target={"_blank"}>
                  <Text
                    fw={400}
                    sx={{ fontSize: 13, cursor: "pointer" }}
                    color={palette.fullBlue}
                  >
                    {value}
                  </Text>
                </Link>
              ) : (
                <Text
                  fw={400}
                  sx={{ fontSize: 13, cursor: "pointer" }}
                  color={palette.darkestBlue}
                >
                  {value}
                </Text>
              )}
            </Flex>
          );
        })}
      </Flex>
    </Flex>
  );
};

const AggregateCard: React.FC<{
  categories: ICategoriesModel;
  properties: IPropertiesModel;
}> = ({ categories, properties }) => {
  const router = useRouter();
  return (
    <Card radius={16} style={{ padding: "0rem" }}>
      <Flex
        direction={"column"}
        justify="center"
        gap={20}
        sx={{
          position: "relative",
          backgroundImage: `url(/images/cert-bg.png)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: 400,
          padding: "1rem 2rem",
          borderRadius: 16,
        }}
      >
        <Flex
          sx={{ position: "absolute", top: 48, cursor: "pointer" }}
          onClick={() => router.push("/")}
        >
          <ArrowLeftIcon />
        </Flex>
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
            VERIFIED EMISSION REDUCTIONS
          </Text>

          <Flex
            gap={8}
            align={"center"}
            justify="center"
            sx={{ cursor: "pointer" }}
          >
            <Box sx={{ position: "relative" }}>
              <Text
                fw={600}
                color={palette.darkestBlue}
                sx={{ fontSize: "13px" }}
                align="center"
              >
                CARBON/bafyb...j2hha
              </Text>
              <Flex
                sx={{
                  position: "absolute",
                  right: -30,
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              >
                <Copy fill={palette.fullBlue} />
              </Flex>
            </Box>
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
              / 1,200 CARBON offset ( 1 CARBON = 1 kgCO₂)
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
};

export default AggregateCard;
