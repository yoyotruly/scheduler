export function getAppointmentsForDay(state, day) {
  const filteredDay = state.days.filter(dayObj => dayObj.name === day)

  if (!filteredDay.length) return [];
  
  return filteredDay[0].appointments.map(appointment => {
    return state.appointments[appointment]
  })
}

export function getInterview(state, interview) {
  if (!interview) return null
  
  return {
    ...interview,
    interviewer: state.interviewers[interview.interviewer]
  }
}