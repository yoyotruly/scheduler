import axios from "axios";
import { useEffect, useReducer } from "react";


export default function useAppData() {
  const ACTIONS = {
    SET_APP_DATA: "SET_APP_DATA",
    SET_DAY: "SET_DAY",
    SET_INTERVIEW: "SET_INTERVIEW"
  }

  const reducer = (state, action) => {
    switch(action.type) {
      case ACTIONS.SET_APP_DATA:
        return {
          ...state,
          days: action.days,
          appointments: action.appointments,
          interviewers: action.interviewers
        }
      
      case ACTIONS.SET_DAY:
        return { ...state, day: action.day }
  
      case ACTIONS.SET_INTERVIEW:
        const appointment = {
          ...state.appointments[action.id],
          interview: { ...action.interview }
        };
    
        const appointments = {
          ...state.appointments,
          [action.id]: appointment
        };

        const days = state.days.map(dayObj => {
          if (!dayObj.appointments.includes(action.id)) return dayObj

          const currentSpots = dayObj.appointments.reduce((acc, appointmentId) => {
            return acc + !state.appointments[appointmentId].interview
          }, 0)
          
          const spots = action.interview ? currentSpots - 1 : currentSpots + 1

          return { ...dayObj, spots }
        })

        return {
          ...state,
          appointments,
          days
        };
      
      default:
        throw new Error(
          `Tried to reduce with unsupported action type: ${action.type}`
        );
    }
  }

  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then((all) => dispatch({
      type: ACTIONS.SET_APP_DATA,
      days: all[0].data,
      appointments: all[1].data,
      interviewers: all[2].data
    }));
  }, [ACTIONS.SET_APP_DATA])

  const setDay = (day) => {
    dispatch({ type: ACTIONS.SET_DAY, day })
  }

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    return axios
    .put(`/api/appointments/${id}`, appointment)
    .then(() => dispatch({ type: ACTIONS.SET_INTERVIEW, id, interview }))
  }

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    return axios
    .delete(`/api/appointments/${id}`, appointment)
    .then(() => dispatch({ type: ACTIONS.SET_INTERVIEW, id, interview: null }))
  }

  return { state, setDay, bookInterview, cancelInterview }
}