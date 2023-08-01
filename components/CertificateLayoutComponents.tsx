import React, { PropsWithChildren } from "react";
import { useRouter } from "next/navigation";
import {
  Box,
  Flex,
  Text,
  Image,
  Progress,
  CopyButton,
  ImageProps,
} from "@mantine/core";

import { palette } from "@/theme/palette";
import ArrowLeftIcon from "@/assets/icons/arrow-left.svg";
import Copy from "@/components/Dashboard/CollectionDashboard/cards/AssetsCard/icons/copy";
import shortStr from "@/utils/shortStr";

// TODO: separate to components, make a folder
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
        textTransform: "uppercase",
      }}
    >
      {children}
    </Text>
  );
}

export function BatchIdentifier({
  name,
  index,
  isProgressComplete,
}: {
  name?: string;
  index?: string;
  isProgressComplete?: boolean;
}) {
  const indexTextColor = isProgressComplete ? palette.Black : palette.fullBlue;

  return (
    <CopyButton value={`${name}/${index}`}>
      {({ copied, copy }) => (
        <Text
          fw={600}
          color={indexTextColor}
          sx={{ fontSize: "13px", position: "relative", cursor: "pointer" }}
          align="center"
          onClick={(e) => {
            e.stopPropagation();
            copy();
          }}
        >
          {`${name}/${shortStr(index, 25, 10)}`}
          <Copy
            fill={copied ? palette.brightBlue : palette.fullBlue}
            style={{ position: "absolute", top: "2px", marginLeft: "1em" }}
          />
        </Text>
      )}
    </CopyButton>
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

export function AstroCarbonImage(props: ImageProps) {
  return (
    <Image
      width={150}
      height={150}
      src="/images/carbon-logo-lg.svg"
      alt=""
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    />
  );
}

// TODO: replace with BatchProgress
export function OffsetProgres({
  offset,
  progress,
}: {
  offset?: number;
  progress?: number;
}) {
  const offsetString = offset?.toLocaleString?.() ?? 0;
  const progressString = progress?.toLocaleString?.() ?? 0;
  const progresPercent = !offset || !progress ? 0 : (progress / offset) * 100;

  return (
    <Flex direction="column">
      <Flex gap={8} align="baseline">
        <Text
          color={palette.White}
          fw={600}
          sx={{ fontFamily: "Quicksand", fontSize: "48px" }}
        >
          {progressString}
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
        value={progresPercent}
        sections={[{ value: progresPercent, color: palette.fullBlue }]}
        sx={{ minWidth: 300 }}
      />

      <Text c={palette.White} fw={400} sx={{ fontSize: 13 }}>
        <Text span c={palette.fullBlue} inherit>
          {offsetString} CARBON
        </Text>{" "}
        / {progressString} CARBON offset ( 1 CARBON = 1 kgCO₂)
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
