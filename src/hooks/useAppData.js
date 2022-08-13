import axios from "axios";
import { useEffect, useReducer } from "react";

export default function useAppData() {
  const ACTIONS = {
    SET_APP_DATA: "SET_APP_DATA",
    SET_DAY: "SET_DAY",
    SET_INTERVIEW: "SET_INTERVIEW",
  };

  const reducer = (state, action) => {
    switch (action.type) {
      case ACTIONS.SET_APP_DATA:
        return {
          ...state,
          days: action.days,
          appointments: action.appointments,
          interviewers: action.interviewers,
        };

      case ACTIONS.SET_DAY:
        return { ...state, day: action.day };

      case ACTIONS.SET_INTERVIEW: {
        const appointment = {
          ...state.appointments[action.id],
          interview: action.interview ? { ...action.interview } : null,
        };

        const appointments = {
          ...state.appointments,
          [action.id]: appointment,
        };

        const days = state.days.map((dayObj) => {
          if (!dayObj.appointments.includes(action.id)) return dayObj;

          // find selected day's appointments and count the ones where interview is null
          const spots = dayObj.appointments.reduce((acc, appointmentId) => {
            // explicitly checking if (interview === null) to avoid edge cases
            // where interview may have other falsy values
            return acc + (appointments[appointmentId].interview === null);
          }, 0);

          return { ...dayObj, spots };
        });

        return {
          ...state,
          appointments,
          days,
        };
      }

      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
  };

  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
    error: null,
  });

  useEffect(() => {
    const webSocket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL);
    webSocket.onopen = () => {
      webSocket.onmessage = (event) => {
        const data = JSON.parse(event.data);

        if (data.type === "SET_INTERVIEW") {
          dispatch({ type: ACTIONS.SET_INTERVIEW, ...data });
        }
      };
    };

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
  }, [ACTIONS.SET_APP_DATA, ACTIONS.SET_INTERVIEW]);

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
