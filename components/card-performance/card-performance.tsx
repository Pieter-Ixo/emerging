import { HTMLAttributes, useState } from "react";
import { Box, Flex, Tabs } from "@mantine/core";
import cls from "classnames";

import Pot from "@/assets/icons/pot.svg";
import SproutPill from "@/assets/icons/sprout-pill.svg";

import Card from "@/components/card/card";
import Info from "@/assets/icons/info.svg";
import { SECTIONS, STOVE } from "@/types/stove";

import styles from "./card-performance.module.scss";
import TabButton from "./TabButton";
import Barchart from "../chart/BarChart";
import SessionsChart from "../chart/SessionsChart";

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

        {activeTab === SECTIONS.sessions && (
          <Box>
            <div className={styles.details}>
              <p className={styles.amount}>{stove.sessions?.totalElements}</p>
              <p>cooking sessions with renewable energy</p>
            </div>

            {stove.sessions?.content && (
              <SessionsChart sessions={stove.sessions.content} />
            )}
          </Box>
        )}

        {activeTab === SECTIONS.fuel && (
          <Box pt="xs">
            <div className={styles.details}>
              <p className={styles.amount}>
                {stove.pellets?.totalPelletsAmount}
              </p>
              <p>kg pellets bought</p>
            </div>
            {stove.pellets?.content && (
              <Barchart pellets={stove.pellets.content} />
            )}
          </Box>
        )}
      </Tabs>
    </Card>
  );
}

export default PerformanceCard;
