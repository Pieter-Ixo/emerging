import { useState } from "react";
import { PieChart as PieChartImport } from "react-minimal-pie-chart";
import {
  Box,
  Button,
  ColorSwatch,
  Flex,
  Image,
  MediaQuery,
  Text,
} from "@mantine/core";

import { palette } from "@/theme/palette";

type PieChartProps = {
  totalMinted?: number;
  totalTokenAmount?: number;
  totalOffset?: number;
  totalTransferred?: number;
};

function PieChart({
  totalMinted = 0,
  totalTokenAmount = 0,
  totalOffset = 0,
  totalTransferred = 0,
}: PieChartProps) {
  const [active, setActive] = useState<number | null>(null);

  const chartConfig = [
    {
      title: "To issue",
      value: 0,
      color: palette.lightBlue,
      text: "AVAILABLE CREDITS",
    },
    {
      title: "Available",
      value: totalTokenAmount,
      color: "#2B94F5",
      text: "CARBON CREDITS",
    },
    {
      title: "Offset",
      value: totalOffset,
      color: "#73B556",
      text: "CARBON CREDITS",
    },
    {
      title: "Transferred",
      value: totalTransferred,
      color: "#E79903",
      text: "CARBON CREDITS",
    },
  ];

  function toggleActiveSemiCircle(i: number) {
    if (chartConfig[i].value !== 0) {
      setActive(i);
    }
  }
  const activeSection = active !== null ? chartConfig[active] : null;

  return (
    <Flex align="center" my={20} mx={0}>
      <Box pos="relative" mr={15} sx={{ flex: 1 }}>
        <Box
          bg={palette.whiteTransparentSecondary}
          pos="absolute"
          top={0}
          w="100%"
          style={{ zIndex: 0, borderRadius: "50%" }}
        >
          <Image src="/images/carbon-logo-lg.svg" alt="" />
        </Box>
        <Box pos="relative" sx={{ zIndex: 5 }}>
          <PieChartImport
            lineWidth={12}
            startAngle={270}
            animate
            onClick={(_, i) => toggleActiveSemiCircle(i)}
            data={chartConfig.map((semi) =>
              semi.value === 0
                ? { ...semi, value: 0.1 }
                : { ...semi, value: semi.value }
            )}
            segmentsStyle={{
              cursor: "pointer",
              zIndex: 1,
              backgroundColor: "black",
            }}
            rounded
            paddingAngle={10}
          />
        </Box>

        <Flex
          direction="column"
          justify="center"
          pos="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          style={{ color: activeSection?.color }}
        >
          <MediaQuery
            smallerThan="xl"
            styles={{ fontSize: 20, lineHeight: "20px" }}
          >
            <Text size={28} mb={5} ta="center" lh="25px">
              {activeSection && activeSection?.value === 0
                ? "0"
                : (activeSection?.value ?? totalMinted).toLocaleString()}
            </Text>
          </MediaQuery>

          <MediaQuery smallerThan="xl" styles={{ fontSize: 8 }}>
            <Text size={13} ta="center" fw={500}>
              {activeSection?.text ?? "CARBON PRODUCED"}
            </Text>
          </MediaQuery>
        </Flex>
      </Box>
      <Flex
        direction="column"
        gap={8}
        sx={{
          flex: 1,
        }}
      >
        {chartConfig.map((semi, i) => (
          <Button
            variant="default"
            px="sm"
            display="flex"
            disabled={semi.value === 0}
            radius="lg"
            sx={{
              alignItems: "center",
            }}
            bg={
              active === i ? palette.White : palette.whiteTransparentSecondary
            }
            onClick={() => toggleActiveSemiCircle(i)}
            key={semi.title}
          >
            <ColorSwatch w={22} h={22} mr={8} color={semi.color} />
            <Text color="black" fw={300}>
              {semi.title}
            </Text>
          </Button>
        ))}
      </Flex>
    </Flex>
  );
}

export default PieChart;
