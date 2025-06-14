import { useContext } from "react";
import TimerContext from "../context/TimerContext";

const useTimer = () => {
  const context = useContext(TimerContext);

  if (!context) {
    throw new Error("Timer Context not found!");
  }

  return context;
};
export default useTimer;
