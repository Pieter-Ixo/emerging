import React from "react";
import { palette } from "../../theme/palette";
import Costs from "./icons/costs";
import Fuel from "./icons/fuel";
import Health from "./icons/health";
import Location from "./icons/location";
import Sessions from "./icons/sessions";
import Time from "./icons/time";

// Configure our tabs and tab content here
const tabs = [
  {
    title: "SESSIONS",
    id: "Sessions",
    icon: <Sessions />,
    color: palette.fullBlue,
  },
  {
    title: "FUEL",
    id: "Fuel",
    icon: <Fuel />,
    color: palette.fullBlue,
  },
  {
    title: "TIME",
    id: "Time",
    icon: <Time style={{ paddingTop: 5 }} />,
    color: palette.fullBlue,
  },
  {
    title: "COSTS",
    id: "Costs",
    icon: <Costs style={{ paddingTop: 5 }} />,
    color: palette.fullBlue,
  },
  {
    title: "HEALTH",
    id: "Health",
    icon: <Health style={{ paddingTop: 5 }} />,
    color: palette.fullBlue,
  },
  {
    title: "LOCATIONS",
    id: "Locations",
    icon: <Location style={{ paddingTop: 5 }} />,
    color: palette.fullBlue,
  },
];

export default tabs;
