import { useState } from "react";
import { Box, Flex, Tabs, Text } from "@mantine/core";

import Pot from "@/assets/icons/pot.svg";
import SproutPill from "@/assets/icons/sprout-pill.svg";
import { SECTIONS, STOVE } from "@/types/stove";
import DeviceDashboardCard from "@/components/Presentational/DeviceDashboardCard";
import AssetFuelChart from "@/components/Presentational/Chart/Instances/AssetFuelChart";
import AssetSessionsChart from "@/components/Presentational/Chart/Instances/AssetSessionsChart";

import TabButton from "./components/TabButton";

type Props = { stove: STOVE };
function PerformanceCard({ stove }: Props) {
  const [activeTab, setActiveTab] = useState<SECTIONS>(SECTIONS.sessions);

  return (
    <DeviceDashboardCard title="MY SUPAMOTO PERFORMANCE">
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
            <Flex my={10} align="baseline">
              <Text size="2.5rem" mr={6} lh="2.7rem">
                {stove.sessions?.totalElements}
              </Text>
              <Text size="0.9rem">cooking sessions with renewable energy</Text>
            </Flex>

            {stove.sessions?.content && (
              <AssetSessionsChart sessions={stove.sessions.content} />
            )}
          </Box>
        )}

        {activeTab === SECTIONS.fuel && (
          <Box pt="xs">
            <Flex my={10} align="baseline">
              <Text size="2.5rem" mr={6} lh="2.7rem">
                {stove.pellets?.totalPelletsAmount}
              </Text>
              <Text size="0.9rem">kg pellets bought</Text>
            </Flex>
            {stove.pellets?.content && (
              <AssetFuelChart pellets={stove.pellets.content} />
            )}
          </Box>
        )}
      </Tabs>
    </DeviceDashboardCard>
  );
}

export default PerformanceCard;
