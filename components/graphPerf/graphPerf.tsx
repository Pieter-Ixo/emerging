import Map from "@/components/Map";
import {
  mobileBreakpoint,
  smallLaptopBreakpoint,
  tabletBreakpoint,
} from "@/constants/breakpoints";
import { faker } from "@faker-js/faker";
import {
  Button,
  Card,
  Center,
  Col,
  Divider,
  Grid,
  Group,
  Text
} from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import dayjs from "dayjs";
import {
  IChartApi,
  ISeriesApi,
  createChart
} from "lightweight-charts";
import { useEffect, useState } from "react";
import { palette } from "../../theme/palette";
import tabs from "../tabs/tabData";
import TabComponent from "../tabs/tabcomponent";
dayjs().format();

interface Props {
  sessions: any;
  fuel: any;
  stove: any;
  totalSessions?: number;
}

let data = {
  Sessions: {
    value: 312,
    text: "clean cooking sessions with renewable energy",
  },
  Fuel: {
    value: 360,
    text: "kg pellets bought",
  },
  Time: {
    value: 120,
    text: "hours saved on cooking time",
  },
  Costs: {
    value: 300,
    text: "saved on energy costs",
  },
  Health: {
    value: 0.14,
    text: "healthy life-years saved ",
  },
  Location: {
    value: 312,
    text: "clean cooking sessions with renewable energy",
  },
};

const timefilterButtons = [
  {
    id: 1,
    text: "1D",
    clicked: false,
  },
  {
    id: 2,
    text: "1W",
    clicked: false,
  },
  {
    id: 3,
    text: "1M",
    clicked: false,
  },
  {
    id: 4,
    text: "1Y",
    clicked: false,
  },
  {
    id: 5,
    text: "ALL",
    clicked: false,
  },
];

function GraphPerf({ sessions, fuel, stove, totalSessions }: Props) {
  const [rating, setRating] = useState(0.3);
  const [chart, setChart] = useState<IChartApi>();
  const [lineSeries, setLineSeries] = useState<ISeriesApi<"Area">>();
  const [currentTab, setCurrentTab] = useState<Boolean>();
  const [healthSelected, setHealthSelected] = useState<Boolean>();
  const [tab, setTab] = useState<string>("Sessions");
  // const { height, width } = useWindowDimensions();
  const [timeFilterButtons, setTimeFilterButtons] = useState(timefilterButtons);

  const [SessionsData, setSessionsData] = useState(sessions);
  const [FuelData, setFuelData] = useState(fuel);
  const [TimeData, setTimeData] = useState([0]);
  const [CostsData, setCostsData] = useState([0]);
  const [HealthData, setHealthData] = useState([0]);

  useEffect(() => {
    setData();
    generateChart();
  }, []);

  useEffect(() => {
    setInitialData();
  }, [sessions, fuel, stove]);

  function getTotalPellets() {
    let total = 0;
    fuel.content?.map((data) => {
      total = total + data.pelletsAmount;
    });
    return total;
  }
  function getTotalCosts() {
    let total = 0;
    fuel.content?.map((data) => {
      total = total + data.pelletsAmount * 0.08;
    });
    return Math.round(total * 100) / 100;
  }
  function getTotalTime() {
    // check time calc
    let total = 0;
    sessions?.map((data) => {
      total = total + (data.duration.total / 60 / 60) * 0.4;
    });
    return Math.round(total);
  }

  function setInitialData() {
    let sessionsTotal: number;
    if (totalSessions) {
      sessionsTotal = totalSessions;
    } else {
      sessionsTotal = sessions ? sessions?.length : 0;
    }

    data = {
      Sessions: {
        value: sessionsTotal,
        text: "clean cooking sessions with renewable energy",
      },
      Fuel: {
        value: fuel ? getTotalPellets() : 0,
        text: "kg pellets bought",
      },
      Time: {
        value: sessions ? getTotalTime() : 0,
        text: "hours saved on cooking time",
      },
      Costs: {
        value: fuel ? getTotalCosts() : 0,
        text: "saved on energy costs",
      },
      Health: {
        value: 0.14,
        text: "healthy life-years saved ",
      },
      Location: {
        value: 312,
        text: "clean cooking sessions with renewable energy",
      },
    };

    if (tab === "Sessions") {
      addSessionData();
    } else if (tab === "Fuel") {
      addFuelData();
    } else if (tab === "Costs") {
      addCostData();
    } else if (tab === "Locations") {
      lineSeries?.applyOptions({});
      setCurrentTab(true);
    } else if (tab === "Health") {
      lineSeries?.applyOptions({});
      setHealthSelected(true);
    }
  }

  function setData() {
    //setting the default value of graph to new array
    //new array can read in the data from api in future
    let setSessions = [0];
    let setFeul = [0];
    let setTime = [0];
    let setCosts = [0];
    let setHealth = [0];

    for (let index = 0; index < 50; index++) {
      setSessions[index] = parseFloat(faker.random.numeric());
      setFeul[index] = parseFloat(faker.random.numeric());
      setTime[index] = parseFloat(faker.random.numeric());
      setCosts[index] = parseFloat(faker.random.numeric());
      setHealth[index] = parseFloat(faker.random.numeric());
    }

    //set the sessions data = to new array
    setSessionsData(setSessions);
    setCostsData(setCosts);
    setFuelData(setFeul);
    setTimeData(setTime);
    setHealthData(setHealth);
  }

  function filterGrafTime(index) {
    // 1. Make a shallow copy of the items
    let items = [...timeFilterButtons];
    // 2. Make a shallow copy of the item you want to mutate
    let item = { ...items[index] };
    // 3. Replace the property you're intested in
    let prevFilter = items.filter((i) => i.clicked == true);

    //checks if there is a previos filter
    if (prevFilter.length != 0) {
      let prev = items.indexOf(prevFilter[0]);
      items[prev].clicked = false;
      item.clicked = !item.clicked;
    } else {
      item.clicked = !item.clicked;
    }

    // 4. Put it back into our array. N.B. we are mutating the array here,
    //    but that's why we made a copy first
    items[index] = item;
    // 5. Set the state to our new copy
    setTimeFilterButtons(items);
  }

  const button = timeFilterButtons.map((Buttons, index) => (
    <Button
      variant="subtle"
      color="dark"
      size="xs"
      radius={"xs"}
      compact
      key={index}
      onClick={() => filterGrafTime(index)}
    >
      <Text style={{ color: Buttons.clicked ? "#2B94F5" : "black" }}>
        {Buttons.text}
      </Text>
    </Button>
  ));

  function getDateArray(startDate, endDate) {
    const dates: Array<any> = [];
    let currentDate: Date = startDate;
    const addDays = function (days) {
      //@ts-ignore
      const date = new Date(this.valueOf());
      date.setDate(date.getDate() + days);
      return date;
    };
    while (currentDate <= endDate) {
      dates.push(currentDate);
      currentDate = addDays.call(currentDate, 1);
    }
    return dates;
  }

  const generateChart = () => {
    const id = document.getElementById("graph");
    if (id && chart === undefined) {
      const tempC = createChart(id || "", {
        width: 800,
        height: 180,
        layout: {
          backgroundColor: "#FFFFFF",
          textColor: "#191919",
        },
        leftPriceScale: {
          visible: true,
          borderVisible: false,
          scaleMargins: { top: 0.6, bottom: 0.1 },
        },
        rightPriceScale: {
          visible: false,
        },
        timeScale: {
          visible: true,
          barSpacing: 10,
        },
        watermark: {
          color: "rgba(0, 0, 0, 0)",
        },
        grid: {
          vertLines: {
            visible: false,
          },
          horzLines: {
            visible: false,
          },
        },
      });
      setChart(tempC);
      const lineSeries = tempC?.addAreaSeries({
        topColor: palette.fullBlue,
        bottomColor: "white",
        lineColor: palette.fullBlue,
      });
      setLineSeries(lineSeries);

      //adding the tooltip
      // var toolTip = document.createElement('graph');
      // toolTip.className = 'floating-tooltip-2';
      // id?.appendChild(toolTip);

      // var toolTipWidth = 130;
      // var toolTipHeight = 100;
      // var toolTipMargin = 15;

      // //making the custom tooltip and its logic to apear
      // tempC.subscribeCrosshairMove((param) => {
      //   //no entry points for it to find then dont display it
      //   if(param.point === undefined || !param.time || param.point.x < 0 || param.point.x > id.clientWidth || param.point.y < 0 || param.point.y > id.clientHeight)
      //   {
      //     toolTip.style.display = 'none'
      //   }
      //   else
      //   {
      //     const dateStr = nextDate(param.time);
      //     toolTip.style.display = 'block';
      //     var price = Number(param.seriesPrices.get(lineSeries)) ;
      //     toolTip.innerHTML = '<div style="color: #009688">IXO</div><div style="font-size: 24px; margin: 4px 0px; color: #21384d">' + Math.round(100 * price) / 100 + '</div><div style="color: #21384d">' + dateStr + '</div>';
      //     var coordinate = lineSeries.priceToCoordinate(price);
      //     var shiftedCoordinate = param.point.x - 50;
      //     if (coordinate === null) {
      //       return;
      //     }
      //     shiftedCoordinate = Math.max(0, Math.min(id.clientWidth - toolTipWidth, shiftedCoordinate));
      //     var coordinateY = coordinate - toolTipHeight - toolTipMargin > 0 ? coordinate - toolTipHeight - toolTipMargin : Math.max(0, Math.min(id.clientHeight - toolTipHeight - toolTipMargin, coordinate + toolTipMargin));
      //     toolTip.style.left = shiftedCoordinate + 'px';
      //     toolTip.style.top = coordinateY + 'px';
      //   }
      // })
    }
  };
  const [loading, setLoading] = useState(false);

  const addSessionData = () => {
    const temp: any[] = [];

    sessions?.map((data) => {
      temp.push({
        time: dayjs(data.timestamp).format("YYYY-MM-DD"),
        value: data.duration.total / 60 / 60,
      });
    });

    lineSeries?.setData(temp);
    setLoading(!loading);
    return temp;
  };

  const addFuelData = () => {
    const tempFuel = fuel;
    tempFuel.content.sort(
      (a, b) =>
        // @ts-ignore
        new Date(a.dateTime) -
        // @ts-ignore
        new Date(b.dateTime)
    );
    data.Fuel = {
      value: tempFuel ? getTotalPellets() : 0,
      text: "kg pellets bought",
    };
    const temp: any[] = [];
    tempFuel?.content?.map((data) => {
      temp.push({
        time: dayjs(data.dateTime).format("YYYY-MM-DD"),
        value: data.pelletsAmount,
      });
    });

    lineSeries?.setData(temp);
    setLoading(!loading);
    return temp;
  };

  const addTimeData = () => {
    data.Fuel = {
      value: sessions ? getTotalTime() : 0,
      text: "hours saved on cooking",
    };
    const temp: any[] = [];
    sessions?.map((data) => {
      temp.push({
        time: dayjs(data.timestamp).format("YYYY-MM-DD"),
        value: (data.duration.total * 0.4) / 60 / 60,
      });
    });

    lineSeries?.setData(temp);
    setLoading(!loading);
    return temp;
  };

  const addCostData = () => {
    const tempFuel = fuel;
    tempFuel.content.sort(
      (a, b) =>
        // @ts-ignore
        new Date(a.dateTime) -
        // @ts-ignore
        new Date(b.dateTime)
    );

    data.Costs = {
      value: tempFuel ? getTotalCosts() : 0,
      text: "saved on energy costs",
    };
    const temp: any[] = [];

    tempFuel?.content?.map((data) => {
      temp.push({
        time: dayjs(data.dateTime).format("YYYY-MM-DD"),
        value: data.pelletsAmount * 0.08,
      });
    });

    lineSeries?.setData(temp);
    setLoading(!loading);
    return temp;
  };

  const handleTabChange = (id: string) => {
    setTab(id);
    if (!currentTab && !healthSelected) {
      generateChart();
    }
    switch (id) {
      case "Sessions":
        setCurrentTab(false);
        setHealthSelected(false);
        addSessionData();
        setLoading(!loading);
        break;
      case "Fuel":
        setCurrentTab(false);
        addFuelData();
        // lineSeries?.setData(SessionLineData);
        setLoading(!loading);
        setHealthSelected(false);
        break;
      case "Time":
        setCurrentTab(false);
        addTimeData();
        setLoading(!loading);
        setHealthSelected(false);
        break;
      case "Costs":
        setCurrentTab(false);
        addCostData();
        setLoading(!loading);
        setHealthSelected(false);
        break;
      case "Health":
        lineSeries?.applyOptions({});
        setCurrentTab(false);
        setHealthSelected(true);
        // No longer a graph
        setLoading(!loading);
        break;

      case "Locations":
        lineSeries?.applyOptions({});
        setTab(id);
        setCurrentTab(true);
        setHealthSelected(false);
        break;

      default:
        break;
    }
  };

  const viewPortSize = useViewportSize();

  return (
    <Card
      shadow="sm"
      radius={16}
      withBorder
      // h={459}
      style={{
        width:
          viewPortSize.width >= tabletBreakpoint
            ? viewPortSize.width * 0.447
            : 358,
        height: viewPortSize.width >= smallLaptopBreakpoint ? 459 : 523,
      }}
    >
      <Text
        style={{
          textAlign: "left",
          fontFamily: "RobotoCondensed",
          fontWeight: "500",
          fontSize: 16,
        }}
      >
        PERFORMANCE
      </Text>
      <Divider my="sm" />
      <TabComponent tabs={tabs} getTabId={handleTabChange} />
      {/* <Suspense fallback={<Loading />}> */}
      {!currentTab && !healthSelected && (
        <>
          <Grid>
            <Col span="content" pl={20}>
              <Text
                style={{
                  fontStyle: "normal",
                  fontSize: 56,
                  color: palette.fullBlue,
                }}
              >
                {
                  //@ts-ignore
                  data[tab].value
                }
              </Text>
            </Col>
            <Col span={6}>
              <Text
                style={{
                  fontStyle: "normal",
                  fontWeight: 300,
                  fontSize: 16,
                  color: palette.Black,
                  paddingTop: viewPortSize.width >= tabletBreakpoint ? 44 : 20,
                }}
              >
                {
                  //@ts-ignore
                  data[tab].text
                }
              </Text>
            </Col>
          </Grid>
        </>
      )}
      {healthSelected && (
        <>
          <Group
            w={viewPortSize.width >= mobileBreakpoint ? "800" : "250"}
            h={350}
            align="center"
          >
            <Text>Health</Text>
          </Group>
        </>
      )}
      {currentTab && (stove.latitude || stove[0]?.latitude) ? (
        <Map
          width={viewPortSize.width >= mobileBreakpoint ? "800" : "250"}
          height={350}
          // stove.latitude, stove.longitude
          center={[
            stove[0] ? stove[0].latitude : stove?.latitude,
            stove[0] ? stove[0].longitude : stove?.longitude,
          ]}
          zoom={3}
        >
          {({ TileLayer, Marker, Popup }) => (
            <>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png"
              />
              {stove[0] ? (
                <>
                  {stove.map((stv) => (
                    // eslint-disable-next-line react/jsx-key
                    <Marker position={[stv.latitude, stv.longitude]}>
                      {/* <Popup></Popup> */}
                    </Marker>
                  ))}
                </>
              ) : (
                <>
                  <Marker position={[stove?.latitude, stove?.longitude]}>
                    {/* <Popup></Popup> */}
                  </Marker>
                </>
              )}
            </>
          )}
        </Map>
      ) : (
        <></>
      )}

      <div id="graph" style={{ display: currentTab ? "none" : "block" }}></div>
      {!currentTab && !healthSelected ? (
        <Group
          style={{
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          {button}
        </Group>
      ) : (
        <>
          <Center h={"50%"}>
            <Text>Not found</Text>
          </Center>
        </>
      )}
      {/* </Suspense> */}
    </Card>
  );
}

export default GraphPerf;
