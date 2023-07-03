/* eslint-disable import/prefer-default-export */
import process from "process";

import { ISupamoto, ISupamotoCookingSumary } from "@/types/supamoto";

const AuthHeader = process.env.NEXT_PUBLIC_SUPAMOTO_AUTH_HEADER;
const originEndpoint = "https://api.supamoto.app/api/v2/stoves";

export async function requestSupamoto(
  entityExternalId: string | null
): Promise<ISupamoto | undefined> {
  if (!entityExternalId) return undefined;

  const supamotoData: ISupamoto = {
    deviceId: 202200189,
    model: "MIMIMOTO",
    status: "ACTIVE",
    country: "ZM",
    latitude: -12.984828,
    longitude: 28.590544,
    certificateCid:
      "bafybeic6khwg5z3kyri5cxh7i3konie2bu3v7rr5lexjgtg5mt27zytkai",
    registrationDateTime: "2022-08-10T01:31:49",
    customer: {
      agreementPolicy: "NONE",
    },
  };
  return supamotoData;
}

export async function requestSupamotoCookingSummary(
  entityExternalId: string | null
): Promise<ISupamotoCookingSumary | undefined> {
  if (!entityExternalId) return undefined;
  const coockingSummary: ISupamotoCookingSumary = {
    content: [
      {
        timestamp: "2022-06",
        count: {
          avg: 0.0,
          total: 0,
        },
        duration: {
          avg: 0.0,
          total: 0,
        },
      },
      {
        timestamp: "2022-07",
        count: {
          avg: 0.0,
          total: 0,
        },
        duration: {
          avg: 0.0,
          total: 0,
        },
      },
      {
        timestamp: "2022-08",
        count: {
          avg: 33.34,
          total: 36,
        },
        duration: {
          avg: 120749.33,
          total: 126914,
        },
      },
      {
        timestamp: "2022-09",
        count: {
          avg: 123.99,
          total: 124,
        },
        duration: {
          avg: 401062.32,
          total: 405133,
        },
      },
      {
        timestamp: "2022-10",
        count: {
          avg: 132.67,
          total: 133,
        },
        duration: {
          avg: 476312.98,
          total: 479057,
        },
      },
      {
        timestamp: "2022-11",
        count: {
          avg: 78.98,
          total: 79,
        },
        duration: {
          avg: 283102.02,
          total: 283988,
        },
      },
      {
        timestamp: "2022-12",
        count: {
          avg: 94.0,
          total: 94,
        },
        duration: {
          avg: 358357.66,
          total: 359156,
        },
      },
      {
        timestamp: "2023-01",
        count: {
          avg: 85.02,
          total: 84,
        },
        duration: {
          avg: 344618.33,
          total: 338638,
        },
      },
      {
        timestamp: "2023-02",
        count: {
          avg: 70.68,
          total: 72,
        },
        duration: {
          avg: 299430.67,
          total: 305254,
        },
      },
      {
        timestamp: "2023-03",
        count: {
          avg: 96.98,
          total: 100,
        },
        duration: {
          avg: 421852.67,
          total: 431502,
        },
      },
      {
        timestamp: "2023-04",
        count: {
          avg: 79.98,
          total: 78,
        },
        duration: {
          avg: 335171.65,
          total: 328249,
        },
      },
      {
        timestamp: "2023-05",
        count: {
          avg: 107.32,
          total: 107,
        },
        duration: {
          avg: 432353.35,
          total: 430652,
        },
      },
      {
        timestamp: "2023-06",
        count: {
          avg: 52.0,
          total: 54,
        },
        duration: {
          avg: 220731.64,
          total: 228555,
        },
      },
    ],
  };
  return coockingSummary;
}
