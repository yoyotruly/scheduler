export function getAppointmentsForDay(state, day) {
  const filteredDay = state.days.filter(dayObj => dayObj.name === day)

  if (!filteredDay.length) return [];
  
  return filteredDay[0].appointments.map(appointment => {
    return state.appointments[appointment]
  })
}