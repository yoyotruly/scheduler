import axios from "axios";
import { useEffect, useReducer } from "react";

import reducer, { ACTIONS } from "../reducers/app";

export default function useAppData() {
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
    error: null,
  });

  // fetch initial app data
  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ])
      .then((all) =>
        dispatch({
          type: ACTIONS.SET_APP_DATA,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data,
        })
      )
      .catch((error) =>
        dispatch({
          type: ACTIONS.SET_APP_DATA,
          error,
        })
      );
  }, []);

  // handle web socket connection for syncing appointment changes
  // useEffect(() => {
  //   const webSocket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);
  //   webSocket.onopen = () => {
  //     webSocket.onmessage = (event) => {
  //       const data = JSON.parse(event.data);
  //       if (data.type === "SET_INTERVIEW") {
  //         dispatch({ type: ACTIONS.SET_INTERVIEW, ...data });
  //       }
  //     };
  //   };
  //   return () => webSocket.close();
  // }, []);

  const setDay = (day) => {
    dispatch({ type: ACTIONS.SET_DAY, day });
  };

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };

    return axios
      .put(`/api/appointments/${id}`, appointment)
      .then(() => dispatch({ type: ACTIONS.SET_INTERVIEW, id, interview }));
  };

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    return axios
      .delete(`/api/appointments/${id}`, appointment)
      .then(() =>
        dispatch({ type: ACTIONS.SET_INTERVIEW, id, interview: null })
      );
  };

  return { state, setDay, bookInterview, cancelInterview };
}
