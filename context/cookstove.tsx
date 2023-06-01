import {
  createContext,
  useState,
  HTMLAttributes,
  useEffect,
  useContext,
  useMemo,
  useCallback,
} from "react";

import { STOVE, STOVE_PERIODS } from "types/stove";
import { datesFromPeriod } from "@/utils/supamoto";

export const CookstoveContext = createContext({
  stove: {} as STOVE,
  fetchStove: (id: number) => {},
  updateStove: (newStove: STOVE, override?: boolean) => {},
  fetchSessions: async (period: STOVE_PERIODS) => {},
  fetchPellets: async (period: STOVE_PERIODS) => {},
});

export const CookstoveProvider = ({
  children,
}: HTMLAttributes<HTMLDivElement>) => {
  const [stove, setStove] = useState<STOVE>({});

  // useEffect(() => {
  //   console.log("in context effect");
  //   if (stove.id) fetchStove(stove.id);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [stove.id]);

  const fetchStove = useCallback(async (id) => {
    if (!id) return;
    updateStove({ id, loading: true });
    try {
      const { endDateISOString, startDateISOString } = datesFromPeriod(
        STOVE_PERIODS.all
      );
      const [resSessions, resPellets] = await Promise.all([
        fetch(
          `/api/cookstove/cooking-sessions/${id}?startDate=${startDateISOString}&endDate=${endDateISOString}&getAllForPeriod=true`
        ),
        fetch(
          `/api/cookstove/pellets-purchases/${id}?startDate=${startDateISOString}&endDate=${endDateISOString}&getAllForPeriod=true`
        ),
      ]);
      const [dataSessions, dataPellets] = await Promise.all([
        resSessions.json(),
        resPellets.json(),
      ]);
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

  const fetchSessions = async (period: STOVE_PERIODS) => {
    // if (!stove.id || (stove.sessions?.periodsFetched && stove.sessions?.periodsFetched[period])) return;
    // updateStoveSessions({ loading: true });
    // try {
    // 	const { endDateISOString, startDateISOString } = datesFromPeriod(period);
    // 	const res = await fetch(`/api/cookstove/cooking-sessions/${stove.id}?startDate=${startDateISOString}&endDate=${endDateISOString}&getAllForPeriod=true`);
    // 	const data = await res.json();
    // 	if (res.status != 200) throw data.error;
    // 	updateStoveSessions(data.data);
    // } catch (error) {
    // 	console.error({ error });
    // }
    // updateStoveSessions({ loading: false });
  };

  const fetchPellets = async (period: STOVE_PERIODS) => {
    // if (!stove.id || (stove.pellets?.periodsFetched && stove.pellets?.periodsFetched[period])) return;
    // updateStovePellets({ loading: true });
    // try {
    // 	const { endDateISOString, startDateISOString } = datesFromPeriod(period);
    // 	const res = await fetch(`/api/cookstove/pellets-purchases/${stove.id}?startDate=${startDateISOString}&endDate=${endDateISOString}&getAllForPeriod=true`);
    // 	const data = await res.json();
    // 	if (res.status != 200) throw data.error;
    // 	updateStovePellets(data.data);
    // } catch (error) {
    // 	console.error({ error });
    // }
    // updateStovePellets({ loading: false });
  };

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

  const value = useMemo(
    () => ({ stove, fetchStove, updateStove, fetchSessions, fetchPellets }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [stove]
  );
  return (
    <CookstoveContext.Provider value={value}>
      {children}
    </CookstoveContext.Provider>
  );
};

export const useCookstove = () => {
  const context = useContext(CookstoveContext);
  if (context === undefined) {
    throw new Error("useCookstove must be used within a CookstoveProvider");
  }
  return context;
};
