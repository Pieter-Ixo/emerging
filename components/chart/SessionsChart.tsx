import React, { useEffect, useRef, useState } from "react";
import { createChart } from "lightweight-charts";

import { STOVE_PERIODS, STOVE_SESSIONS_CONTENT } from "@/types/stove";
import styles from "./chart.module.scss";
import defaultChartConfig, { lineChartConfig } from "./config";
import sessionsToChartData from "./sessionsToChartData";

export type CHART_DATA = { time: string; value: number }[];

export type ChartProps = {
  sessions: STOVE_SESSIONS_CONTENT[];
};

export default function SessionsChart({ sessions }: ChartProps) {
  const [data, setData] = useState<CHART_DATA>([]);
  const [period, setPeriod] = useState<STOVE_PERIODS>(STOVE_PERIODS.all);
  const chartContainerRef = useRef<HTMLDivElement>(null);

  const getData = async (period: STOVE_PERIODS) => {
    setData(sessionsToChartData(sessions, period));
  };

  useEffect(() => {
    if (!window) return () => {};

    // create chart canvas
    const chart = createChart(chartContainerRef.current || "", {
      width: chartContainerRef.current?.clientWidth,
      ...defaultChartConfig,
    });
    chart.timeScale().fitContent();

    // add graph series to the chart
    const newSeries = chart.addAreaSeries(lineChartConfig);
    newSeries?.setData(data);

    // manage chart size & resize
    const handleResize = () => {
      chart?.applyOptions({ width: chartContainerRef?.current?.clientWidth });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, [data]);

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
            type="button"
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  );
}
