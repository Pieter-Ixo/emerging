import { ElementType } from "react";
import Pot from "@/assets/icons/pot.svg";
import SproutPill from "@/assets/icons/sprout-pill.svg";
import HumanClock from "@/assets/icons/human-clock.svg";
import Coins from "@/assets/icons/coins.svg";
import HumanHeart from "@/assets/icons/human-heart.svg";
import { hoursSaved, lifeYearsSaved } from "@/utils/supamoto";
import { ChartDataItem } from "@/components/Presentational/Chart/types";

export type STOVE = {
  id?: string;
  data?: STOVE_DATA;
  sessions?: STOVE_SESSIONS;
  pellets?: STOVE_PELLETS;
  cookstove?: COOKSTOVE;
  sessionsSummary?: ChartDataItem[];
  fuelSummary?: ChartDataItem[];
  loading?: boolean;
};

export type MONTH_SESSIONS_TOTAL_MAP = Record<string, number>;
export type MONTH_FUEL_TOTAL_MAP = Record<
  string,
  { total?: number; dayMap: Record<string, number | undefined> }
>;
// MONTH_FUEL_TOTAL_MAP = {deviceId: {total, dayMap: { day: kg }}}

export type STOVE_DATA = {
  deviceId?: number;
  model?: string;
  status?: string;
  country?: string;
  registrationDateTime?: string;
};

export type STOVE_SESSIONS = {
  content?: STOVE_SESSIONS_CONTENT[];
  totalPages?: number;
  totalElements?: number;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  periodsFetched?: { [key in STOVE_PERIODS]: boolean };
  loading?: boolean;
};

export type STOVE_SESSIONS_CONTENT_SUMMARY = {
  timestamp: string; // "2022-07",
  count: {
    avg: number; // 86.68;
    total: number; // 83;
  };
  duration: {
    avg: number; // 348109.02;
    total: number; // 333828;
  };
};
export type STOVES_SESSIONS_SUMMARY = {
  content?: STOVE_SESSIONS_CONTENT_SUMMARY[];
};

export type STOVE_SESSIONS_CONTENT = {
  id?: number;
  duration?: number;
  startDateTime?: string;
  endDateTime?: string;
};

export type STOVE_PELLETS = {
  content?: STOVE_PELLETS_CONTENT[];
  totalPages?: number;
  totalElements?: number;
  totalPelletsAmount?: number;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  periodsFetched?: { [key in STOVE_PERIODS]: boolean };
  loading?: boolean;
};

export type STOVE_PELLETS_CONTENT = {
  id?: number;
  transactionId: string;
  amount: number;
  currency: string;
  pelletsAmount?: number;
  pelletsAmountUnits?: string;
  dateTime: string;
};

export enum STOVE_DATA_TYPES {
  cooking_sessions = "cooking_sessions",
  pellets_purchased = "pellets_purchased",
}

export enum STOVE_PERIODS {
  daily = "1D",
  weekly = "1W",
  monthly = "1M",
  yearly = "1Y",
  all = "ALL",
}

export enum SECTIONS {
  sessions = "sessions",
  fuel = "fuel",
  time = "time",
  costs = "costs",
  health = "health",
}

export enum PortfolioViewMods {
  listView = "listView",
  iconView = "iconView",
}

export type SECTION = {
  id: SECTIONS;
  description: string;
  Img: ElementType;
  dataType: STOVE_DATA_TYPES;
  dataFormatter?: (val: number) => number;
};

export const sections: { [key in SECTIONS]: SECTION } = {
  [SECTIONS.sessions]: {
    id: SECTIONS.sessions,
    Img: Pot,
    description: "cooking sessions with renewable energy",
    dataType: STOVE_DATA_TYPES.cooking_sessions,
  },
  [SECTIONS.fuel]: {
    id: SECTIONS.fuel,
    Img: SproutPill,
    description: "kg pellets bought",
    dataType: STOVE_DATA_TYPES.pellets_purchased,
  },
  [SECTIONS.time]: {
    id: SECTIONS.time,
    Img: HumanClock,
    description: "hours saved on cooking time",
    dataType: STOVE_DATA_TYPES.pellets_purchased,
    dataFormatter: (v) => hoursSaved(v),
  },
  [SECTIONS.costs]: {
    id: SECTIONS.costs,
    Img: Coins,
    description: "tbd",
    dataType: STOVE_DATA_TYPES.pellets_purchased,
  },
  [SECTIONS.health]: {
    id: SECTIONS.health,
    Img: HumanHeart,
    description: "healthy life-years saved",
    dataType: STOVE_DATA_TYPES.pellets_purchased,
    dataFormatter: (v) => lifeYearsSaved(v),
  },
};
export interface COOKSTOVE {
  deviceId: number;
  model: string;
  status: string;
  country: string;
  latitude: number;
  longitude: number;
  certificateCid: string;
  registrationDateTime: Date;
  customer: {
    agreementPolicy: string;
  };
}
