import React from "react";
import { palette } from "../../theme/palette";
import Costs from "./icons/costs";
import Delivery from "./icons/delivery";
import Flame from "./icons/flame";
import Fuel from "./icons/fuel";
import Health from "./icons/health";
import Info from "./icons/info";
import Inventory from "./icons/inventory";
import Location from "./icons/location";
import Minted from "./icons/minted";
import Registered from "./icons/registered";
import Sessions from "./icons/sessions";
import Time from "./icons/time";
import User from "./icons/user";

// Configure our tabs and tab content here
const tabsDist = [
  {
    title: "Inventory",
    id: "Inventory",
    icon: <Inventory style={{ paddingTop: 2, marginRight: -12 }} />,
    color: palette.fullBlue,
  },
  {
    title: "NFTs",
    id: "NFTs",
    icon: <Minted style={{ paddingTop: 2, marginRight: -12 }} />,
    color: palette.fullBlue,
  },
  {
    title: "Payments",
    id: "Payments",
    icon: <Costs style={{ paddingTop: 5, marginRight: -12 }} />,
    color: palette.fullBlue,
  },
  {
    title: "Billings",
    id: "Billings",
    icon: <Registered style={{ paddingTop: 5, marginRight: -12 }} />,
    color: palette.fullBlue,
  },
  {
    title: "Deliveries",
    id: "Deliveries",
    icon: <Delivery style={{ paddingTop: 5, marginRight: -7 }} />,
    color: palette.fullBlue,
  },
  {
    title: "Customers",
    id: "Customers",
    icon: <User style={{ paddingTop: 5, marginRight: -12 }} />,
    color: palette.fullBlue,
  },
  // {
  //   title: "Activity",
  //   id: "Activity",
  //   icon: <Flame style={{ paddingTop: 5, marginRight: -12 }} />,
  //   color: palette.fullBlue,
  // },
  // {
  //   title: "Issues",
  //   id: "Issues",
  //   icon: <Info style={{ paddingTop: 5, marginRight: -12 }} />,
  //   color: palette.fullBlue,
  // },
];

export default tabsDist;
