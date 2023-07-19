import { useState } from "react";
import { PieChart as PieChartImport } from "react-minimal-pie-chart";
import cls from "classnames";
import { Box, Image } from "@mantine/core";

import Card from "@/components/card/card";
import styles from "./pie-chart.module.scss";

type PieChartProps = {
  totalMinted: number;
  totalTokenAmount: number;
};

function PieChart({ totalMinted, totalTokenAmount }: PieChartProps) {
  const [active, setActive] = useState<number>(0);

  const chartCnfig = [
    {
      title: "Credits",
      value: totalTokenAmount,
      color: "#5FA8EB",
      text: "AVAILABLE CREDITS",
    },
    {
      title: "Credits Issued",
      value: totalMinted,
      color: "#2B94F5",
      text: "CARBON CREDITS",
    },
  ];

  const totalValue = totalTokenAmount + totalMinted;

  const activeSection = active !== null ? chartCnfig[active] : null;

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
            onClick={(_, i) => setActive(i)}
            data={chartCnfig}
            segmentsStyle={{ cursor: "pointer", zIndex: 1 }}
            rounded
            paddingAngle={10}
          />
        </div>

        <div
          className={styles.textContainer}
          style={{ color: activeSection?.color }}
        >
          <p className={styles.amount}>
            {(activeSection?.value ?? totalValue).toLocaleString()}
          </p>
          <p className={styles.text}>
            {activeSection?.text ?? "CARBON CREDITS"}
          </p>
        </div>
      </div>

      <div className={styles.labels}>
        {chartCnfig.map((d, i) => (
          <Card
            className={cls(styles.label, { [styles.selected]: active == i })}
            onClick={() => setActive(i)}
            key={d.title}
          >
            <div
              className={styles.circle}
              style={{ backgroundColor: d.color }}
            />
            {d.title}
          </Card>
        ))}
      </div>
    </div>
  );
}

export default PieChart;
