import {
  createContext,
  useState,
  HTMLAttributes,
  useContext,
  useCallback,
} from "react";

import { STOVE, STOVE_PERIODS } from "@/types/stove";
import { datesFromPeriod } from "@/utils/supamoto";

export const CookstoveContext = createContext({
  stove: {} as STOVE,
  fetchStove: (id: number | string) => {},
  updateStove: (newStove: STOVE, override?: boolean) => {},
  fetchSessions: async (period: STOVE_PERIODS) => {},
  fetchPellets: async (period: STOVE_PERIODS) => {},
});

export function CookstoveProvider({
  children,
}: HTMLAttributes<HTMLDivElement>) {
  const [stove, setStove] = useState<STOVE>({});

  const fetchStove = useCallback(async (id) => {
    if (!id) return;
    updateStove({ id, loading: true });
    try {
      const { endDateISOString, startDateISOString } = datesFromPeriod(
        STOVE_PERIODS.all
      );
      const [resSessions, resPellets, resCookstove] = await Promise.all([
        fetch(
          `/api/cookstove/cooking-sessions/${id}?startDate=${startDateISOString}&endDate=${endDateISOString}&getAllForPeriod=true`
        ),
        fetch(
          `/api/cookstove/pellets-purchases/${id}?startDate=${startDateISOString}&endDate=${endDateISOString}&getAllForPeriod=true`
        ),
        fetch(`/api/cookstove/${id}`),
      ]);
      const [dataSessions, dataPellets, cookstove] = await Promise.all([
        resSessions.json(),
        resPellets.json(),
        resCookstove.json(),
      ]);

      console.log("Store data dataSessions: ", dataSessions);
      console.log("Store data dataPallets: ", dataPellets);
      console.log("Store data cookstove: ", cookstove);

      setStove((prevState) => ({ ...prevState, cookstove: cookstove?.data }));

      if (resSessions.status !== 200) throw dataSessions.error;
      if (resPellets.status !== 200) throw dataPellets.error;
      updateStoveSessions({
        ...dataSessions.data,
        periodsFetched: {
          "1D": true,
          "1W": true,
          "1M": true,
          "1Y": true,
          ALL: true,
        },
      });
      updateStovePellets({
        ...dataPellets.data,
        periodsFetched: {
          "1D": true,
          "1W": true,
          "1M": true,
          "1Y": true,
          ALL: true,
        },
      });
    } catch (error) {
      console.error({ error });
    }
    updateStove({ loading: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchSessions = async (period: STOVE_PERIODS) => {};

  const fetchPellets = async (period: STOVE_PERIODS) => {};

  const updateStove = (newStove: {}, override: boolean = false) => {
    if (override) setStove(newStove);
    else setStove((currentStove) => ({ ...currentStove, ...newStove }));
  };

  const updateStoveData = (newStoveData: {}, override: boolean = false) => {
    if (override)
      setStove((currentStove) => ({ ...currentStove, data: newStoveData }));
    else
      setStove((currentStove) => ({
        ...currentStove,
        data: { ...currentStove.data, ...newStoveData },
      }));
  };

  const updateStoveSessions = (
    newStoveSessions: {},
    override: boolean = false
  ) => {
    if (override)
      setStove((currentStove) => ({
        ...currentStove,
        sessions: newStoveSessions,
      }));
    else
      setStove((currentStove) => ({
        ...currentStove,
        sessions: { ...currentStove.sessions, ...newStoveSessions },
      }));
  };

  const updateStovePellets = (
    newStovePellets: {},
    override: boolean = false
  ) => {
    if (override)
      setStove((currentStove) => ({
        ...currentStove,
        pellets: newStovePellets,
      }));
    else
      setStove((currentStove) => ({
        ...currentStove,
        pellets: { ...currentStove.pellets, ...newStovePellets },
      }));
  };

  const value = { stove, fetchStove, updateStove, fetchSessions, fetchPellets };

  return (
    <CookstoveContext.Provider value={value}>
      {children}
    </CookstoveContext.Provider>
  );
}

export const useCookstove = () => {
  const context = useContext(CookstoveContext);
  if (context === undefined) {
    throw new Error("useCookstove must be used within a CookstoveProvider");
  }
  return context;
};
