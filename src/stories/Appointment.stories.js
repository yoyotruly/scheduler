import { action } from "@storybook/addon-actions";

import "../index.scss";
import AppointmentComponent from "../components/Appointment";
import HeaderComponent from "../components/Appointment/Header";
import EmptyComponent from "../components/Appointment/Empty";
import ShowComponent from "../components/Appointment/Show";
import ConfirmComponent from "../components/Appointment/Confirm";
import StatusComponent from "../components/Appointment/Status";
import ErrorComponent from "../components/Appointment/Error";
import FormComponent from "../components/Appointment/Form";

const interviewer = {
  id: 1,
  name: "Sylvia Palmer",
  avatar: "https://i.imgur.com/LpaY82x.png"
};

const interviewers = [
  { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },
  { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" },
  { id: 3, name: "Mildred Nazir", avatar: "https://i.imgur.com/T2WwVfS.png" },
  { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" },
  { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" }
];

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

export const AppointmentEmpty = () => {
  return (
    <>
      <AppointmentComponent id={1} time="4pm" />
      <AppointmentComponent time="5pm" />
    </>
  )
}

export const AppointmentBooked = () => {
  return (
    <>
      <AppointmentComponent
        id={1}
        time="4pm"
        interview={{ student: "Lydia Miller-Jones", interviewer }}
      />
      <AppointmentComponent
        time="5pm"
      />
    </>
  )
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

export const Status = () => {
  return (
    <StatusComponent
      message="Deleting..."
    />
  )
}

export const Error = () => {
  return (
    <ErrorComponent
      message="Could not delete appointment."
      onClose={action("onClose")}
    />
  )
}

export const Create = () => {
  return (
    <FormComponent
      interviewers={interviewers}
      onSave={action("onSave")}
      onCancel={action("onCancel")}
    />
  )
}

export const Edit = () => {
  return (
    <FormComponent
      student="Yoyo Yang"
      interviewer={3}
      interviewers={interviewers}
      onSave={action("onSave")}
      onCancel={action("onCancel")}
    />
  )
}