import { HTMLAttributes, useState } from "react";
import { Flex, Tabs } from "@mantine/core";
import cls from "classnames";

import Pot from "@/assets/icons/pot.svg";
import SproutPill from "@/assets/icons/sprout-pill.svg";

import Card from "@/components/card/card";
import Info from "@/assets/icons/info.svg";
import { SECTIONS, STOVE, STOVE_DATA_TYPES } from "@/types/stove";
import Chart from "@/components/chart/chart";

import styles from "./card-performance.module.scss";
import TabButton from "./TabButton";

type EventsCardProps = { stove: STOVE } & HTMLAttributes<HTMLDivElement>;

function PerformanceCard({ className, stove, ...other }: EventsCardProps) {
  const [activeTab, setActiveTab] = useState<SECTIONS>(SECTIONS.sessions);

  return (
    <Card className={cls(styles.performanceCard, className)} {...other}>
      <div className={styles.header}>
        <p>MY SUPAMOTO PERFORMANCE</p>
        <div className={styles.button}>
          <Info width={18} height={18} />
        </div>
      </div>

      <Tabs
        variant="pills"
        value={activeTab}
        // @ts-ignore
        onTabChange={setActiveTab}
        color="transparent"
        width="100%"
      >
        <Flex direction="row" justify="space-evenly">
          <TabButton
            name={SECTIONS.sessions}
            Icon={Pot}
            onClick={() => setActiveTab(SECTIONS.sessions)}
            isActive={SECTIONS.sessions === activeTab}
          />
          <TabButton
            name={SECTIONS.fuel}
            Icon={SproutPill}
            onClick={() => setActiveTab(SECTIONS.fuel)}
            isActive={SECTIONS.fuel === activeTab}
          />
        </Flex>

        <Tabs.Panel value={SECTIONS.sessions} pt="xs">
          <div className={styles.details}>
            <p className={styles.amount}>{stove.sessions?.totalElements}</p>
            <p>cooking sessions with renewable energy</p>
          </div>
          <Chart
            stove={stove}
            dataType={STOVE_DATA_TYPES.cooking_sessions}
            id={SECTIONS.sessions}
          />
        </Tabs.Panel>

        <Tabs.Panel value={SECTIONS.fuel} pt="xs">
          <div className={styles.details}>
            <p className={styles.amount}>{stove.pellets?.totalPelletsAmount}</p>
            <p>kg pellets bought</p>
          </div>
          <Chart
            stove={stove}
            dataType={STOVE_DATA_TYPES.pellets_purchased}
            id={SECTIONS.fuel}
          />
        </Tabs.Panel>
      </Tabs>
    </Card>
  );
}

export default PerformanceCard;
