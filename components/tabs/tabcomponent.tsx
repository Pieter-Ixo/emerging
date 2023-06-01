import React, { useState, useEffect } from "react";
import cn from "classnames";
//@ts-ignore
import { motion } from "framer-motion";
import { Grid, Space, Flex, Stack, Tooltip } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { tabletBreakpoint } from "@/constants/breakpoints";
import { palette } from "@/theme/palette";

const tabVariant = {
  active: {
    width: "50%",
    transition: {
      type: "tween",
      duration: 0.4,
    },
  },
  inactive: {
    width: "15%",
    transition: {
      type: "tween",
      duration: 0.4,
    },
  },
};

const tabTextVariant = {
  active: {
    opacity: 1,
    x: 0,
    display: "block",
    transition: {
      type: "tween",
      duration: 0.3,
      delay: 0.3,
    },
  },
  inactive: {
    opacity: 0,
    x: -30,
    transition: {
      type: "tween",
      duration: 0.3,
      delay: 0.1,
    },
    transitionEnd: { display: "none" },
  },
};

const TabComponent = ({ tabs, defaultIndex = 0, getTabId }) => {
  const [activeTabIndex, setActiveTabIndex] = useState(defaultIndex);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--active-color",
      tabs[activeTabIndex].color
    );
  }, [activeTabIndex, tabs]);

  const onTabClick = (index: any, id: string) => {
    setActiveTabIndex(index);
    getTabId(id);
  };
  const viewPortSize = useViewportSize();

  return (
    <div
      className="container"
      style={{ width: viewPortSize.width >= tabletBreakpoint ? "100%" : "80%" }}
    >
      <div className={"tabs-component"}>
        <ul
          className="tab-links"
          role="tablist"
          style={{
            marginLeft: 0,
            display: "flex",
            flexWrap: "wrap",
            maxWidth: 500,
            // width: 500,
          }}
        >
          {/* <Flex wrap="wrap" direction="row"> */}
          {tabs.map((tab: any, index: any) => (
            <motion.li
              key={tab.id}
              className={cn("tab", { active: activeTabIndex === index })}
              role="presentation"
              variants={tabVariant}
              animate={activeTabIndex === index ? "active" : "inactive"}
              style={{ flex: index == 5 ? 5 : 1 }}
            >
              <Tooltip label={tab.title} color={palette.fullBlue}>
                <a
                  href={`#${tab.id}`}
                  onClick={() => onTabClick(index, tab.id)}
                  style={{ height: 46, alignContent: "center" }}
                >
                  {tab.icon}
                  <motion.span
                    variants={tabTextVariant}
                    style={{
                      fontWeight: 500,
                      fontSize: 16,
                      margin: 0,
                    }}
                  >
                    {tab.title}
                  </motion.span>
                </a>
              </Tooltip>
            </motion.li>
          ))}
          {/* </Flex> */}
        </ul>
      </div>
    </div>
  );
};

export default TabComponent;
