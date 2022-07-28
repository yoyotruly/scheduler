import axios from "axios";
import { useEffect, useReducer } from "react";

// case "countSpontsRemaining":
//   const currentDay = state.days.filter(dayObj => dayObj.name === state.day)[0]

//   const spots = currentDay.appointments.filter(id => !state.appointments[id].interview).length

//   const newDay = {...currentDay, spots}
//   const newDays = [...state.days]
  
//   return { ...state, days: [newDays] }


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

        return {
          ...state,
          appointments
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
    dispatch({ type: ACTIONS.SET_INTERVIEW, id, interview });

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    return axios.put(`/api/appointments/${id}`, appointment)
  }

  const cancelInterview = (id) => {
    dispatch({ type: ACTIONS.SET_INTERVIEW, id, interview:null });

    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    return axios.delete(`/api/appointments/${id}`, appointment)
  }

  return { state, setDay, bookInterview, cancelInterview }
}