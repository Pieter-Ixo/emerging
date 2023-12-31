import { useState } from "react";
import dynamic from "next/dynamic";
import { Flex, Tabs } from "@mantine/core";

import { palette } from "@/theme/palette";

import PageBlock from "../PageBlock";
import { PerformanceTab } from "./PerformanceTabs";
import CookstoveUsageIcon from "../CollectionClimateImpactsCard/icons/CookstoveUsageIcon";
import CookstoveFuelIcon from "../CollectionClimateImpactsCard/icons/CookstoveFuelIcon";
import CookstoveCostsIcon from "../CollectionClimateImpactsCard/icons/CookstoveCostsIcon";
import CookstoveHealthIcon from "../CollectionClimateImpactsCard/icons/CookstoveHealthIcon";
import CookstoveLocationIcon from "../CollectionClimateImpactsCard/icons/CookstoveLocationIcon";
import CookstoveTimeIcon from "../CollectionClimateImpactsCard/icons/CookstoveTimeIcon";

const CollectionUsage = dynamic(() => import("./CollectionUsage"));
const CollectionFuel = dynamic(() => import("./CollectionFuel"));
const CollectionTime = dynamic(() => import("./CollectionTime"));
const CollectionCosts = dynamic(() => import("./CollectionCosts"));
const CollectionLocation = dynamic(() => import("./CollectionLocation"));

enum SECTIONS {
  usage = "usage",
  fuel = "fuel",
  time = "time",
  costs = "costs",
  location = "location",
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
        <Flex direction="row" justify="flex-start" gap="sm">
          <PerformanceTab
            // @ts-ignore
            name={SECTIONS.usage as string}
            activeBGColor={palette.accentActive}
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
            activeBGColor={palette.accentActive}
            Icon={<CookstoveFuelIcon isActive={activeTab === SECTIONS.fuel} />}
            onClick={() => setActiveTab(SECTIONS.fuel)}
            isActive={SECTIONS.fuel === activeTab}
          >
            Fuel
          </PerformanceTab>
          <PerformanceTab
            // @ts-ignore
            name={SECTIONS.time as string}
            activeBGColor={palette.accentActive}
            Icon={<CookstoveTimeIcon isActive={activeTab === SECTIONS.time} />}
            onClick={() => setActiveTab(SECTIONS.time)}
            isActive={SECTIONS.time === activeTab}
          >
            Time
          </PerformanceTab>
          <PerformanceTab
            // @ts-ignore
            name={SECTIONS.costs as string}
            activeBGColor={palette.accentActive}
            onClick={() => setActiveTab(SECTIONS.costs)}
            Icon={
              <CookstoveCostsIcon isActive={activeTab === SECTIONS.costs} />
            }
            isActive={SECTIONS.costs === activeTab}
          >
            Costs
          </PerformanceTab>
          <PerformanceTab
            Icon={<CookstoveHealthIcon isActive={false} />}
            disabled
          >
            Health
          </PerformanceTab>
          <PerformanceTab
            // @ts-ignore
            name={SECTIONS.location as string}
            activeBGColor={palette.accentActive}
            onClick={() => setActiveTab(SECTIONS.location)}
            Icon={
              <CookstoveLocationIcon
                isActive={activeTab === SECTIONS.location}
              />
            }
            isActive={SECTIONS.location === activeTab}
          >
            Location
          </PerformanceTab>
        </Flex>
      </Tabs>
      {SECTIONS.usage === activeTab && <CollectionUsage />}
      {SECTIONS.fuel === activeTab && <CollectionFuel />}
      {SECTIONS.time === activeTab && <CollectionTime />}
      {SECTIONS.costs === activeTab && <CollectionCosts />}
      {SECTIONS.location === activeTab && <CollectionLocation />}
    </PageBlock>
  );
}
