import { useState } from "react";
import { Flex, Tabs } from "@mantine/core";

import { palette } from "@/theme/palette";

import PageBlock from "../PageBlock";
import { PerformanceTab } from "./PerformanceTabs";
import CollectionUsage from "./CollectionUsage/intex";
import CollectionFuel from "./CollectionFuel/intex";
import CookstoveUsageIcon from "../CollectionClimateImpactsCard/icons/CookstoveUsageIcon";
import CookstoveFuelIcon from "../CollectionClimateImpactsCard/icons/CookstoveFuelIcon";
import CookstoveCostsIcon from "../CollectionClimateImpactsCard/icons/CookstoveCostsIcon";
import CookstoveHealthIcon from "../CollectionClimateImpactsCard/icons/CookstoveHealthIcon";
import CookstoveLocationIcon from "../CollectionClimateImpactsCard/icons/CookstoveLocationIcon";
import CookstoveTimeIcon from "../CollectionClimateImpactsCard/icons/CookstoveTimeIcon";

enum SECTIONS {
  usage = "usage",
  fuel = "fuel",
}

export default function CollectionPerformanceCard() {
  const [activeTab, setActiveTab] = useState<SECTIONS>(SECTIONS.fuel);

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
          >
            fuel
          </PerformanceTab>
          <PerformanceTab
            Icon={<CookstoveTimeIcon strokeColor={palette.Black} />}
            disabled
          />
          <PerformanceTab
            Icon={<CookstoveCostsIcon strokeColor={palette.Black} />}
            disabled
          />
          <PerformanceTab
            Icon={<CookstoveHealthIcon strokeColor={palette.Black} />}
            disabled
          />
          <PerformanceTab
            Icon={<CookstoveLocationIcon strokeColor={palette.Black} />}
            disabled
          />
        </Flex>
      </Tabs>
      {SECTIONS.usage === activeTab && <CollectionUsage />}
      {SECTIONS.fuel === activeTab && <CollectionFuel />}
    </PageBlock>
  );
}
