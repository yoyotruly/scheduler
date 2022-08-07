import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = (nextMode, replace = false) => {
    setMode(nextMode);

    if (!replace) {
      setHistory((prevHistory) => [...prevHistory, nextMode]);
    }
  };

  const back = () => {
    if (history.length > 1) {
      setMode(history[history.length - 2]);
      setHistory((prevHistory) => [...prevHistory.slice(0, -1)]);
    }
  };

  return { mode, transition, back };
}
