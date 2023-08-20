import { useState } from "react";
import { Flex, Tabs } from "@mantine/core";

import { palette } from "@/theme/palette";

import PageBlock from "../PageBlock";
import { PerformanceTab } from "./PerformanceTabs";
import CollectionUsage from "./CollectionUsage";
import CollectionFuel from "./CollectionFuel";
import CookstoveUsageIcon from "../CollectionClimateImpactsCard/icons/CookstoveUsageIcon";
import CookstoveFuelIcon from "../CollectionClimateImpactsCard/icons/CookstoveFuelIcon";
import CookstoveCostsIcon from "../CollectionClimateImpactsCard/icons/CookstoveCostsIcon";
import CookstoveHealthIcon from "../CollectionClimateImpactsCard/icons/CookstoveHealthIcon";
import CookstoveLocationIcon from "../CollectionClimateImpactsCard/icons/CookstoveLocationIcon";
import CookstoveTimeIcon from "../CollectionClimateImpactsCard/icons/CookstoveTimeIcon";
import CollectionTime from "./CollectionTime";

enum SECTIONS {
  usage = "usage",
  fuel = "fuel",
  time = "time",
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
              <CookstoveUsageIcon isActive={SECTIONS.usage === activeTab} />
            }
            onClick={() => setActiveTab(SECTIONS.usage)}
            isActive={SECTIONS.usage === activeTab}
          >
            Usage
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
          >
            Fuel
          </PerformanceTab>
          <PerformanceTab
            // @ts-ignore
            name={SECTIONS.time as string}
            activeBGColor={palette.fullBlue}
            Icon={<CookstoveTimeIcon isActive={activeTab === SECTIONS.time} />}
            onClick={() => setActiveTab(SECTIONS.time)}
            isActive={SECTIONS.time === activeTab}
          >
            Time
          </PerformanceTab>
          <PerformanceTab
            Icon={<CookstoveCostsIcon isActive={false} />}
            disabled
          />
          <PerformanceTab
            Icon={<CookstoveHealthIcon isActive={false} />}
            disabled
          />
          <PerformanceTab
            Icon={<CookstoveLocationIcon isActive={false} />}
            disabled
          />
        </Flex>
      </Tabs>
      {SECTIONS.usage === activeTab && <CollectionUsage />}
      {SECTIONS.fuel === activeTab && <CollectionFuel />}
      {SECTIONS.time === activeTab && <CollectionTime />}
    </PageBlock>
  );
}
