import { action } from "@storybook/addon-actions";

import "../index.scss";
import Appointment from "../components/Appointment";
import Header from "../components/Appointment/Header";
import Empty from "../components/Appointment/Empty";
import Show from "../components/Appointment/Show";

export default {
  title: 'Appointment',
  component: Appointment,
  parameters: {
    backgrounds: {
      values: [{ name: "white", value: "#fff" }]
    } 
  }
};

export const AppointmentDefault = () => {
  return <Appointment />
}

export const AppointmentWithTime = () => {
  return <Appointment time="12pm" />
}

export const AppointmentHeader = () => {
  return <Header time="12pm" />
}

export const AppointmentEmpty = () => {
  return <Empty onAdd={action("onAdd")} />
}

const interviewer = {
  id: 1,
  name: "Sylvia Palmer",
  avatar: "https://i.imgur.com/LpaY82x.png"
};

export const AppointmentShow = () => {
  return (
    <Show
      student="Lydia Miller-Jones"
      interviewer={interviewer}
      onEdit={action("onEdit")}
      onDelete={action("onDelete")}
    />
  )
}