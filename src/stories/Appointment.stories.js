import { action } from "@storybook/addon-actions";

import "../index.scss";
import AppointmentComponent from "../components/Appointment";
import HeaderComponent from "../components/Appointment/Header";
import EmptyComponent from "../components/Appointment/Empty";
import ShowComponent from "../components/Appointment/Show";
import ConfirmComponent from "../components/Appointment/Confirm";

export default {
  title: 'Appointment',
  component: AppointmentComponent,
  parameters: {
    backgrounds: {
      values: [{ name: "white", value: "#fff" }]
    } 
  }
};

export const Appointment = () => {
  return <AppointmentComponent />
}

export const AppointmentWithTime = () => {
  return <AppointmentComponent time="12pm" />
}

export const Header = () => {
  return <HeaderComponent time="12pm" />
}

export const Empty = () => {
  return <EmptyComponent onAdd={action("onAdd")} />
}

const interviewer = {
  id: 1,
  name: "Sylvia Palmer",
  avatar: "https://i.imgur.com/LpaY82x.png"
};

export const Show = () => {
  return (
    <ShowComponent
      student="Lydia Miller-Jones"
      interviewer={interviewer}
      onEdit={action("onEdit")}
      onDelete={action("onDelete")}
    />
  )
}

export const Confirm = () => {
  return (
    <ConfirmComponent
      message="Delete the appointment?"
      onConfirm={action("onConfirm")}
      onCancel={action("onCancel")}
    />
  )
}