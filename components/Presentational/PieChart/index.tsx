import { useState } from "react";
import { PieChart as PieChartImport } from "react-minimal-pie-chart";
import cls from "classnames";
import { Box, Image } from "@mantine/core";

import Card from "@/components/Presentational/DELETE_THIS_card/card";
import styles from "./pie-chart.module.scss";

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

  return (
    <div className={styles.pie}>
      <div className={styles.pieChartContainer}>
        <Box
          bg="#ffffffa6"
          pos="absolute"
          top={0}
          w="100%"
          style={{ zIndex: 0, borderRadius: "50%" }}
        >
          <Image src="/images/carbon-logo-lg.svg" alt="" />
        </Box>
        <div className={styles.pieChart}>
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
        </div>

        <div
          className={styles.textContainer}
          style={{ color: activeSection?.color }}
        >
          <p className={styles.amount}>
            {(activeSection?.value ?? totalMinted).toLocaleString() === "0,1"
              ? "0"
              : (activeSection?.value ?? totalMinted).toLocaleString()}
          </p>
          <p className={styles.text}>
            {activeSection?.text ?? "CARBON PRODUCED"}
          </p>
        </div>
      </div>
      {/* TODO: use Mantine */}

      <div className={styles.labels}>
        {chartConfig.map((semi, i) => (
          <Card
            className={cls(styles.label, { [styles.selected]: active === i })}
            onClick={() => toggleActiveSemiCircle(i)}
            key={semi.title}
          >
            <div
              className={styles.circle}
              style={{ backgroundColor: semi.color }}
            />
            {semi.title}
          </Card>
        ))}
      </div>
    </div>
  );
}

export default PieChart;