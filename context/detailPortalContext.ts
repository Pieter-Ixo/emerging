import { createContext, Dispatch, SetStateAction } from "react";

const DetailPortalContext = createContext<{
  key: null | string;
  setKey: Dispatch<SetStateAction<string | null>>;
}>({ key: null, setKey: () => {} });

export default DetailPortalContext;
