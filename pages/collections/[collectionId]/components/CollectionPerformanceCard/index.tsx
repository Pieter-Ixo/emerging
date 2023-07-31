import { useState } from "react";
import { Flex, Tabs } from "@mantine/core";

import { palette } from "@/theme/palette";

import PageBlock from "../PageBlock";
import { PerformanceTab } from "./PerformanceTabs";
import CO2Saved from "../CollectionClimateImpactsCard/icons/CO2Saved";
import CollectionUsage from "./CollectionUsage/intex";
import CollectionFuel from "./CollectionFuel/intex";

enum SECTIONS {
  usage = "usage",
  fuel = "fuel",
}

export default function CollectionPerformanceCard() {
  const [activeTab, setActiveTab] = useState<SECTIONS>(SECTIONS.usage);

  return (
    <PageBlock title="COLLECTION PERFORMANCE">
      <Tabs
        variant="pills"
        value={activeTab}
        // @ts-ignore
        onTabChange={setActiveTab}
        color="transparent"
        width="100%"
      >
        <Flex direction="row" justify="flex-start" gap="xl">
          <PerformanceTab
            // @ts-ignore
            name={SECTIONS.usage as string}
            activeBGColor={palette.fullBlue}
            Icon={
              <CO2Saved
                fill={
                  activeTab === SECTIONS.usage ? palette.White : palette.Black
                }
              />
            }
            onClick={() => setActiveTab(SECTIONS.usage)}
            isActive={SECTIONS.usage === activeTab}
          >
            usage
          </PerformanceTab>
          <PerformanceTab
            // @ts-ignore
            name={SECTIONS.fuel as string}
            activeBGColor={palette.fullBlue}
            Icon={
              <CO2Saved
                fill={
                  activeTab === SECTIONS.fuel ? palette.White : palette.Black
                }
              />
            }
            onClick={() => setActiveTab(SECTIONS.fuel)}
            isActive={SECTIONS.fuel === activeTab}
          >
            fuel
          </PerformanceTab>
        </Flex>
      </Tabs>
      {SECTIONS.usage === activeTab && <CollectionUsage />}
      {SECTIONS.fuel === activeTab && <CollectionFuel />}
    </PageBlock>
  );
}
