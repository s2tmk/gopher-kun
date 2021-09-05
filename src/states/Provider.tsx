import React, { createContext, useContext } from "react";
import useSticky from "./sticky/hooks";
import { StickyHooks } from "./sticky/types";

const StickyContext = createContext({} as StickyHooks);

export const useStickyContext = () => useContext(StickyContext);

export const ContextProvider: React.FC = ({ children }) => {
  const { state, dispatchers, isFetching, errorMessage } = useSticky();
  return (
    <StickyContext.Provider
      value={{ state, dispatchers, isFetching, errorMessage }}
    >
      {children}
    </StickyContext.Provider>
  );
};
