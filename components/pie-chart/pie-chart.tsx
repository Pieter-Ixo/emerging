import { PieChart as PieChartImport } from "react-minimal-pie-chart";
import cls from "classnames";
import Image from "next/image";

import circle from "@/assets/images/circle.png";
import { useState } from "react";
import Card from "@/components/card/card";
import styles from "./pie-chart.module.scss";

let data = [
  {
    title: "Claimable",
    value: 5160,
    color: "#5FA8EB",
    text: "AVAILABLE CREDITS",
  },
  {
    title: "Generated",
    value: 5160,
    color: "#2B94F5",
    text: "CARBON CREDITS",
  },
];

type PieChartProps = { totalMinted?: number };

function PieChart({ totalMinted }: PieChartProps) {
  const [active, setActive] = useState<number>(0);
  if (totalMinted)
    data = data.map((d) => ({
      ...d,
      value: totalMinted,
    }));

  const activeSection = active !== null ? data[active] : null;
  const totalValue = data.reduce((prev, curr) => ({
    value: prev.value + curr.value,
    text: "",
    title: "",
    color: "",
  }));

  return (
    <div className={styles.pie}>
      <div className={styles.pieChartContainer}>
        <div className={styles.pieChart}>
          <PieChartImport
            lineWidth={12}
            startAngle={270}
            animate
            onClick={(_, i) => setActive(i)}
            data={data}
            segmentsStyle={{ cursor: "pointer" }}
            rounded
            paddingAngle={10}
          />
        </div>

        <div className={styles.image}>
          <Image src={circle} alt="" />
        </div>

        <div
          className={styles.textContainer}
          style={{ color: activeSection?.color }}
        >
          <p className={styles.amount}>
            {(activeSection?.value ?? totalValue.value).toLocaleString()}
          </p>
          <p className={styles.text}>
            {activeSection?.text ?? "CARBON CREDITS"}
          </p>
        </div>
      </div>

      <div className={styles.labels}>
        {data.map((d, i) => (
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
