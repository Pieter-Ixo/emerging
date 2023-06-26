import React, { PropsWithChildren } from "react";
import { useRouter } from "next/navigation";
import { Box, Flex, Text, Image, Progress } from "@mantine/core";

import { palette } from "@/theme/palette";
import ArrowLeftIcon from "@/assets/icons/arrow-left.svg";
import Copy from "@/components/Dashboard/CollectionDashboard/cards/AssetsCard/icons/copy";

export function ArrowLeft() {
  const router = useRouter();

  return (
    <Box
      sx={{ position: "absolute", top: 48, cursor: "pointer" }}
      onClick={() => router.back()}
    >
      <ArrowLeftIcon />
    </Box>
  );
}

export function CardTitle({ children }: PropsWithChildren) {
  return (
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
      {children}
    </Text>
  );
}

export function BatchIdentifier({ children }: PropsWithChildren) {
  return (
    <Text
      fw={600}
      color={palette.darkestBlue}
      sx={{ fontSize: "13px", position: "relative" }}
      align="center"
    >
      {children}
      <Copy
        fill={palette.fullBlue}
        style={{ position: "absolute", top: "2px", marginLeft: "1em" }}
      />
    </Text>
  );
}

export function CardContainer({ children }: PropsWithChildren) {
  return (
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
      {children}
    </Flex>
  );
}

export function AstroCarbonImage() {
  return (
    <Image width={150} height={150} src="/images/carbon-logo-lg.svg" alt="" />
  );
}

export function OffsetProgres({ max, value }: { max: number; value: number }) {
  const maxString = max.toLocaleString();
  const progresPercent = (value / max) * 100;

  return (
    <Flex direction="column">
      <Flex gap={8} align="baseline">
        <Text
          color={palette.White}
          fw={600}
          sx={{ fontFamily: "Quicksand", fontSize: "48px" }}
        >
          {maxString}
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
        sections={[{ value: progresPercent, color: palette.fullBlue }]}
        sx={{ minWidth: 300 }}
      />

      <Text c={palette.White} fw={400} sx={{ fontSize: 13 }}>
        <Text span c={palette.fullBlue} inherit>
          {value} CARBON
        </Text>{" "}
        / {maxString} CARBON offset ( 1 CARBON = 1 kgCO₂)
      </Text>
    </Flex>
  );
}

export function TagForSomethingIDunnoWhat({
  children,
  label,
}: PropsWithChildren & { label: string }) {
  return (
    <Flex direction="column" gap={4} justify="center" align="center">
      <Text
        color={palette.darkestBlue}
        sx={{ fontSize: 10 }}
        transform="uppercase"
      >
        {label}
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
          {children}
        </Text>
      </Flex>
    </Flex>
  );
}
