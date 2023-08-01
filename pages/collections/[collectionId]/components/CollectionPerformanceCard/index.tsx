import { useState } from "react";
import { Flex, Tabs } from "@mantine/core";

import { palette } from "@/theme/palette";

import PageBlock from "../PageBlock";
import { PerformanceTab } from "./PerformanceTabs";
import CollectionUsage from "./CollectionUsage/intex";
import CollectionFuel from "./CollectionFuel/intex";
import CookstoveUsageIcon from "../CollectionClimateImpactsCard/icons/CookstoveUsageIcon";
import CookstoveFuelIcon from "../CollectionClimateImpactsCard/icons/CookstoveFuelIcon";

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
              <CookstoveUsageIcon
                strokeColor={
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
              <CookstoveFuelIcon
                strokeColor={
                  activeTab === SECTIONS.fuel ? palette.White : palette.Black
                }
              />
            }
            onClick={() => setActiveTab(SECTIONS.fuel)}
            isActive={SECTIONS.fuel === activeTab}
            disabled
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
