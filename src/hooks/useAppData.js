import axios from "axios";
import { useEffect, useState } from "react";

export default function useAppData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => {
    return setState(prevState => ({ ...prevState, day }))
  };

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers")
    ]).then((all) => {
      setState(prevState => {
        return {
          ...prevState,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data
        }
      })
    });
  }, [])

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    setState(prevState => ({
      ...prevState,
      appointments
    }))

    return axios.put(`/api/appointments/${id}`, appointment)
  }

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };

    setState(prevState => ({
      ...prevState,
      appointments
    }))

    return axios.delete(`/api/appointments/${id}`, appointment)
  }

  return { state, setDay, bookInterview, cancelInterview }
}