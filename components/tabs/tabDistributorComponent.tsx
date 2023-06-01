import React, { useState, useEffect } from "react";
import cn from "classnames";
//@ts-ignore
import { motion } from "framer-motion";
import tabsDist from "./tabData_Distributor";
import { useViewportSize } from "@mantine/hooks";

const tabVariant = {
  active: {
    width: "55%",
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

//@ts-ignore
const DistTabComponent = ({ tabsDist, defaultIndex = 0, getTabId }) => {
  const [activeTabIndex, setActiveTabIndex] = useState(defaultIndex);

  useEffect(() => {
    document.documentElement.style.setProperty(
      "--active-color",
      tabsDist[activeTabIndex].color
    );
  }, [activeTabIndex, tabsDist]);

  // Default to a tab based on the URL hash value
  useEffect(() => {
    const tabFromHash = tabsDist.findIndex(
      (tab: any) => `#${tab.id}` === window.location.hash
    );
    setActiveTabIndex(tabFromHash !== -1 ? tabFromHash : defaultIndex);
  }, [tabsDist, defaultIndex]);

  const onTabClick = (index: any, id: string) => {
    setActiveTabIndex(index);
    getTabId(id);
  };
  const viewPortSize = useViewportSize()

  return (
    <div className="container" style={{overflowX: viewPortSize.width <= 880 ? "scroll" : "hidden", width: (viewPortSize.width - 420) }}>
      <div className={"tabsDist-component"} >
        <ul className="tab-links" role="tablist" style={{marginLeft:0}}>
          {tabsDist.map((tab: any, index: any) => (
            <motion.li
              key={tab.id}
              className={cn("tab", { active: activeTabIndex === index })}
              role="presentation"
              variants={tabVariant}
              animate={activeTabIndex === index ? "active" : "inactive"}
            >
              <a href={`#${tab.id}`} onClick={() => onTabClick(index, tab.id)}>
                {tab.icon}
                <motion.span
                  variants={tabTextVariant}
                  style={{ fontWeight: 500, fontSize: 16 }}
                >
                  {tab.title}
                </motion.span>
              </a>
            </motion.li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DistTabComponent;
