import { createContext, useContext, useState } from "react";
import { States } from "../utils";

const GlobalStateContext = createContext();

export const useGlobalStateContext = () => useContext(GlobalStateContext);

export const GlobalStateProvider = ({ children }) => {
  const [activeState, setActiveState] = useState({
    state: States.WAITING_FOR_UPLOAD,
  });

  const handleGlobalStateChange = (globalState) => {
    setActiveState(globalState);
  };

  return (
    <GlobalStateContext.Provider
      value={{ activeState, handleGlobalStateChange }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};
