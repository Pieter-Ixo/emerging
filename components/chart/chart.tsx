// import { createChart, ColorType } from 'lightweight-charts';
const { createChart } = require("lightweight-charts");
import React, { useEffect, useRef, HTMLAttributes, useState } from "react";

import { STOVE_DATA_TYPES, STOVE_PERIODS } from "types/stove";
import { useCookstove } from "@/context/cookstove";
import styles from "./chart.module.scss";
import { formatPellets, formatSessions } from "@/utils/supamoto";

const options = {
  // width: 200,
  height: 150,
  alignLabels: true,
  timeScale: {
    rightOffset: 0,
    barSpacing: 40,
    fixLeftEdge: true,
    fixRightEdge: true,
    lockVisibleTimeRangeOnResize: true,
    rightBarStaysOnScroll: true,
    borderVisible: false,
    visible: true,
    timeVisible: false,
    secondsVisible: false,
    tickMarkFormatter: (time: any) => {
      return time.day + "/" + time.month;
    },
  },
  grid: {
    vertLines: {
      visible: false,
    },
    horzLines: {
      visible: false,
    },
  },
  layout: {
    backgroundColor: "#0000",
    textColor: "#000",
    fontSize: 9,
    fontFamily: "Roboto Condensed",
  },
  crosshair: {
    vertLine: {
      color: "#000",
      width: 0.5,
      style: 1,
    },
    horzLine: {
      color: "#000",
      width: 0.5,
      style: 1,
    },
    mode: 1,
  },
  priceScale: {
    position: "left",
    autoScale: true,
    borderVisible: false,
    scaleMargins: {
      top: 0.2,
      bottom: 0.05, // default 0.1
    },
    // drawTicks: false,
  },
  handleScale: false,
  localization: {
    priceFormatter: (price: any) => {
      if (price < 0) return "";
      return (price as number).toFixed(1);
    },
  },
};

export type CHART_DATA = { time: string; value: number }[];

export type ChartProps = {
  // id is to reload chart on section change
  id: string;
  lineColor?: string;
  dataType?: STOVE_DATA_TYPES;
  dataFormatter?: (val: number) => number;
} & HTMLAttributes<HTMLDivElement>;

const Chart = ({
  id,
  lineColor = "#000",
  dataFormatter,
  dataType = STOVE_DATA_TYPES.cooking_sessions,
}: ChartProps) => {
  const [data, setData] = useState<CHART_DATA>([]);
  const { stove, fetchSessions, fetchPellets } = useCookstove();
  const [period, setPeriod] = useState<STOVE_PERIODS>(STOVE_PERIODS.monthly);
  const chartContainerRef = useRef<HTMLDivElement>(null);

  const getData = async (p: STOVE_PERIODS) => {
    if (dataType === STOVE_DATA_TYPES.cooking_sessions) {
      await fetchSessions(p);
      setData(formatSessions(stove.sessions?.content ?? [], p, dataFormatter));
    } else {
      await fetchPellets(p);
      setData(formatPellets(stove.pellets?.content ?? [], p, dataFormatter));
    }
  };

  useEffect(() => {
    const chart = createChart(chartContainerRef.current || "", {
      width: chartContainerRef.current?.clientWidth,
      ...options,
    });

    const handleResize = () => {
      chart?.applyOptions({ width: chartContainerRef?.current?.clientWidth });
    };

    chart.timeScale().fitContent();

    const newSeries = chart.addAreaSeries({
      lineColor,
      lineWidth: 3,
      topColor: "#ffff",
      bottomColor: "#fff1",
    });
    // const newSeries = chart.addLineSeries({ color: lineColor, lineWidth: 3 });
    newSeries.setData(data);

    window && window.addEventListener("resize", handleResize);

    return () => {
      window && window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, [data, lineColor]);

  useEffect(() => {
    getData(period);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [period]);

  const handlePeriodChange = (
    event: React.MouseEvent<HTMLButtonElement>,
    period: STOVE_PERIODS
  ) => {
    event.stopPropagation();
    setPeriod(period);
  };

  return (
    <div className={styles.chartContainer}>
      <div ref={chartContainerRef} />
      {data.length < 1 ? <p className={styles.noData}>NO DATA</p> : null}
      <div className={styles.buttons}>
        {Object.values(STOVE_PERIODS).map((p) => (
          <button
            key={p}
            onClick={(e) => handlePeriodChange(e, p)}
            className={p === period ? styles.selected : undefined}
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Chart;
