import { useState } from "react";
import { PieChart as PieChartImport } from "react-minimal-pie-chart";
import { Box, Button, ColorSwatch, Flex, Image, Text } from "@mantine/core";

import { palette } from "@/theme/palette";
import { useMediaQuery } from "@mantine/hooks";

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

  function toggleActiveSemiCircle(i: number) {
    return setActive(i);
  }

  const chartConfig = [
    {
      title: "To issue",
      value: 0 || 0.1,
      color: "#5FA8EB",
      text: "AVAILABLE CREDITS",
    },
    {
      title: "Available",
      value: totalTokenAmount || 0.1,
      color: "#2B94F5",
      text: "CARBON CREDITS",
    },
    {
      title: "Offset",
      value: totalOffset || 0.1,
      color: "#73B556",
      text: "CARBON CREDITS",
    },
    {
      title: "Transferred",
      value: totalTransferred || 0.1,
      color: "#E79903",
      text: "CARBON CREDITS",
    },
  ];

  const activeSection = active !== null ? chartConfig[active] : null;

  const isWideDesktopScreen = useMediaQuery("(min-width: 1440px)");

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
            data={chartConfig}
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
          <Text
            size={isWideDesktopScreen ? 50 : 24}
            mb={5}
            ta="center"
            lh={isWideDesktopScreen ? "2.7rem" : "1.3rem"}
          >
            {(activeSection?.value ?? totalMinted).toLocaleString() === "0,1"
              ? "0"
              : (activeSection?.value ?? totalMinted).toLocaleString()}
          </Text>
          <Text size={isWideDesktopScreen ? 16 : 12} ta="center" fw={500}>
            {activeSection?.text ?? "CARBON PRODUCED"}
          </Text>
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
