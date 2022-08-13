export const ACTIONS = {
  SET_APP_DATA: "SET_APP_DATA",
  SET_DAY: "SET_DAY",
  SET_INTERVIEW: "SET_INTERVIEW",
};

export default function reducer(state, action) {
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
}
