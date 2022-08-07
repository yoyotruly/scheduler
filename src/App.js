import DayList from "./components/DayList";
import Appointment from "./components/Appointment";
import useAppData from "./hooks/useAppData";

import {
  getAppointmentsForDay,
  getInterview,
  getInterviewersForDay,
} from "./helpers/selectors";

import "./App.scss";

function App() {
  const { state, setDay, bookInterview, cancelInterview } = useAppData();

  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const dailyInterviewers = getInterviewersForDay(state, state.day);

  const appointmentElements = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);

    return (
      <Appointment
        key={appointment.id}
        {...appointment}
        interview={interview}
        interviewers={dailyInterviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} value={state.day} onChange={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>

      <section className="schedule">{appointmentElements}</section>
    </main>
  );
}

export default App;
