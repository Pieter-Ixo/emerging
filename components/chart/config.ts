import {
  AreaStyleOptions,
  ChartOptions,
  DeepPartial,
  SeriesOptionsCommon,
} from "lightweight-charts";

export const lineChartConfig: DeepPartial<
  AreaStyleOptions & SeriesOptionsCommon
> = {
  lineColor: "#000",
  lineWidth: 3,
  topColor: "#ffff",
  bottomColor: "#fff1",
};

const defaultChartConfig: DeepPartial<ChartOptions> = {
  height: 150,
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
    tickMarkFormatter: (time: any) => `${time.day}/${time.month}`,
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
      width: 1,
      style: 1,
    },
    horzLine: {
      color: "#000",
      width: 1,
      style: 1,
    },
    mode: 1,
  },

  handleScale: false,
  localization: {
    priceFormatter: (price: any) => {
      if (price < 0) return "";
      return (price as number).toFixed(1);
    },
  },
};
export default defaultChartConfig;
