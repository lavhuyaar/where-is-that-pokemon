import { createContext, useEffect, useState, type ReactNode } from "react";

interface TimerContextValues {
  time: number;
  formattedTime: string;
  startTimer: VoidFunction;
  stopTimer: VoidFunction;
  resetTimer: VoidFunction;
}

const TimerContext = createContext<TimerContextValues | null>(null);

export const TimeContextProvider = ({ children }: { children: ReactNode }) => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId: number;
    if (isRunning) {
      // Setting time from 0 to 1 every 10 millisecond setInterval
      intervalId = setInterval(() => setTime(time + 1), 10);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, time]);

  const hours = Math.floor(time / 360000);
  const minutes = Math.floor((time % 360000) / 6000);
  const seconds = Math.floor((time % 6000) / 100);

  const startTimer = () => setIsRunning(true);
  const stopTimer = () => setIsRunning(false);
  const resetTimer = () => setTime(0);

  const formattedTime = `${hours}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

  return (
    <TimerContext.Provider
      value={{ time, formattedTime, startTimer, stopTimer, resetTimer }}
    >
      {children}
    </TimerContext.Provider>
  );
};

export default TimerContext;
